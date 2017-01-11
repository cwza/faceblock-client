import { take, put, call, fork, select } from 'redux-saga/effects'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import followRelationsActions from '../actions/followRelationsActions'
import * as usersService from '../services/faceblock/usersApis'
import { isEmpty, some } from 'lodash'
import { getSelfId } from '../selectors/usersSelectors'
import { getFollowRelationByUserIdAndFollowerId } from '../selectors/followRelationsSelectors'

function* callUsersApi(apiName, actionType, apiInfos=[], otherInfos=[]) {
  try {
    let response = yield call(usersService[apiName], ...apiInfos);
    // fetch followRelation about self and user
    if(apiName.startsWith('fetch')) {
      let users = response.entities.users;
      let selfId = yield select(getSelfId);
      let fetchedFollowRelations = [];
      yield* users.map(function *(user) {
        let followRelationWillBeFetched = {userId: selfId, followRelation: user.id};
        let followRelation = yield select((state, args) => getFollowRelationByUserIdAndFollowerId(state)(args), followRelationWillBeFetched)
        console.log('followRelation: ', followRelation, ' followRelationWillBeFetched: ', followRelationWillBeFetched);
        if(isEmpty(followRelation) && !some(fetchedFollowRelations, followRelationWillBeFetched)) {
          yield put(followRelationsActions.fetchFollowRelationStart(selfId, user.id));
          fetchedFollowRelations.push(followRelationWillBeFetched);
        }
        followRelationWillBeFetched = {userId: user.id, followRelation: selfId};
        followRelation = yield select((state, args) => getFollowRelationByUserIdAndFollowerId(state)(args), followRelationWillBeFetched)
        if(isEmpty(followRelation) && !some(fetchedFollowRelations, followRelationWillBeFetched)) {
          yield put(followRelationsActions.fetchFollowRelationStart(user.id, selfId));
          fetchedFollowRelations.push(followRelationWillBeFetched);
        }
      });
    }
    yield put(usersActions[actionType + 'Success'](response, ...otherInfos));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchUsersStart() {
  while(true) {
    let { payload } = yield take(usersActions.fetchUsersStart().type);
    let apiInfos = [payload.queryStr];
    let otherInfos = [payload.queryStr, payload.requestId]
    yield fork(callUsersApi, 'fetchUsers', 'fetchUsers', apiInfos, otherInfos);
  }
}

function* watchFetchUserStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchUserStart().type);
    let apiInfos = [payload.userId];
    let otherInfos = [payload.requestId]
    yield fork(callUsersApi, 'fetchUser', 'fetchUser', apiInfos, otherInfos);
  }
}

export default {watchFetchUsersStart, watchFetchUserStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callUsersApi, watchFetchUsersStart};
}
