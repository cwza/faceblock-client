import { take, put, call, fork, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import followRelationsActions from '../actions/followRelationsActions'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import { getUserById } from '../selectors/usersSelectors'
import * as followRelationsService from '../services/faceblock/followRelationsApis'
import { isEmpty } from 'lodash'

function* callFollowRelationsApi(apiName, ...args) {
  try {
    let response = yield call(followRelationsService[apiName], ...args);
    // fetch users about followRelations
    if(apiName.startsWith('fetch')) {
      let followRelations = response.entities.followRelations;
      let fetchedUserIds = [];
      yield* followRelations.map(function *(followRelation) {
        let user = yield select(getUserById, followRelation.userId)
        let follower = yield select(getUserById, followRelation.followerId)
        if(isEmpty(user) && !fetchedUserIds.includes(followRelation.userId)) {
          yield put(usersActions.fetchUserStart(followRelation.userId));
          fetchedUserIds.push(followRelation.userId);
        }
        if(isEmpty(follower) && !fetchedUserIds.includes(followRelation.followerId)) {
          yield put(usersActions.fetchUserStart(followRelation.followerId));
          fetchedUserIds.push(followRelation.followerId);
        }
      });
    }
    yield put(followRelationsActions[apiName + 'Success']({response}));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

function* deleteFollowRelation(postId) {
  try {
    yield call(followRelationsService.deleteFollowRelation, postId);
    yield put(followRelationsActions.deleteFollowRelationSuccess(postId));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

function* getFetchOldFollowRelationsQueryStr(queryStr, followRelationsSelector, selectorParams) {
  let followRelations = yield select(followRelationsSelector, selectorParams);
  if(followRelations.length === 0 || followRelations === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + followRelations[followRelations.length - 1].id;
}

function* getFetchNewFollowRelationsQueryStr(queryStr, followRelationsSelector, selectorParams) {
  let followRelations = yield select(followRelationsSelector, selectorParams);
  if(followRelations.length === 0 || followRelations === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + followRelations[0].id;
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchOldFollowRelationsStart() {
  // const requestChan = yield actionChannel(followRelationsActions.fetchOldFollowRelationsStart().type);
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchOldFollowRelationsStart().type);
    // const {payload} = yield take(requestChan);
    let queryStr = yield* getFetchOldFollowRelationsQueryStr(payload.queryStr, payload.followRelationsSelector, payload.selectorParams);
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', queryStr);
    // yield fork(fetchFollowRelations, queryStr);
  }
}

function* watchFetchNewFollowRelationsStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchNewFollowRelationsStart().type);
    let queryStr = yield* getFetchNewFollowRelationsQueryStr(payload.queryStr, payload.followRelationsSelector, payload.selectorParams);
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', queryStr);
  }
}

function* watchCreateFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.createFollowRelationStart().type);
    yield fork(callFollowRelationsApi, 'createFollowRelation', payload);
  }
}

function* watchDeleteFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.deleteFollowRelationStart().type);
    yield fork(deleteFollowRelation, payload);
  }
}

function* watchFetchFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchFollowRelationStart().type);
    let queryStr = `q=userId:(${payload.userId}) and followerId:(${payload.followerId})`;
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', queryStr);
  }
}

export default {
  watchFetchOldFollowRelationsStart, watchFetchNewFollowRelationsStart, watchCreateFollowRelationStart, watchDeleteFollowRelationStart,
  watchFetchFollowRelationStart,
};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callFollowRelationsApi, getFetchOldFollowRelationsQueryStr, watchFetchOldFollowRelationsStart};
}
