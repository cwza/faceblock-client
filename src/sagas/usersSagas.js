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

function* getFetchOldUsersQueryStr(queryStr, usersSelector, selectorParams) {
  let users = yield select(usersSelector, selectorParams);
  if(users.length === 0 || users === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + users[users.length - 1].id;
}

function* getFetchNewUsersQueryStr(queryStr, usersSelector, selectorParams) {
  let users = yield select(usersSelector, selectorParams);
  if(users.length === 0 || users === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + users[0].id;
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchOldUsersStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchOldUsersStart().type);
    let queryStr = yield* getFetchOldUsersQueryStr(payload.queryStr, payload.usersSelector, payload.selectorParams);
    yield fork(callUsersApi, 'fetchUsers', queryStr);
    // yield fork(fetchUsers, queryStr);
  }
}

function* watchFetchNewUsersStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchNewUsersStart().type);
    let queryStr = yield* getFetchNewUsersQueryStr(payload.queryStr, payload.usersSelector, payload.selectorParams);
    yield fork(callUsersApi, 'fetchUsers', queryStr);
  }
}

function* watchFetchUserStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchUserStart().type);
    yield fork(callUsersApi, 'fetchUser', payload);
  }
}

export default {watchFetchOldUsersStart, watchFetchNewUsersStart, watchFetchUserStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callUsersApi, getFetchOldUsersQueryStr, watchFetchOldUsersStart};
}
