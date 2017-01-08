import { take, put, call, fork, select } from 'redux-saga/effects'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import followRelationsActions from '../actions/followRelationsActions'
import * as usersService from '../services/faceblock/usersApis'
import { isEmpty, some } from 'lodash'
import { getSelfId } from '../selectors/usersSelectors'
import { getFollowRelationByUserIdAndFollowerId } from '../selectors/followRelationsSelectors'

function* callUsersApi(apiName, ...args) {
  try {
    let response = yield call(usersService[apiName], ...args);
    // fetch followRelation about self and user
    if(apiName.startsWith('fetch')) {
      let users = response.entities.users;
      let selfId = yield select(getSelfId);
      let fetchedFollowRelations = [];
      yield* users.map(function *(user) {
        let followRelationWillBeFetched = {userId: selfId, followRelation: user.id};
        let followRelation = yield select(getFollowRelationByUserIdAndFollowerId, followRelationWillBeFetched)
        if(isEmpty(followRelation) && !some(fetchedFollowRelations, followRelationWillBeFetched)) {
          yield put(followRelationsActions.fetchFollowRelationStart(selfId, user.id));
          fetchedFollowRelations.push(followRelationWillBeFetched);
        }
        followRelationWillBeFetched = {userId: user.id, followRelation: selfId};
        followRelation = yield select(getFollowRelationByUserIdAndFollowerId, followRelationWillBeFetched)
        if(isEmpty(followRelation) && !some(fetchedFollowRelations, followRelationWillBeFetched)) {
          yield put(followRelationsActions.fetchFollowRelationStart(user.id, selfId));
          fetchedFollowRelations.push(followRelationWillBeFetched);
        }
      });
    }
    yield put(usersActions[apiName + 'Success']({response}));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchUsersStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchUsersStart().type);
    yield fork(callUsersApi, 'fetchUsers', payload);
  }
}

function* watchFetchUserStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchUserStart().type);
    yield fork(callUsersApi, 'fetchUser', payload);
  }
}

export default {watchFetchUsersStart, watchFetchUserStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callUsersApi, watchFetchUsersStart};
}
