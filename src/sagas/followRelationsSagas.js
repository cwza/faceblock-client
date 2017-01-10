import { take, put, call, fork, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import followRelationsActions from '../actions/followRelationsActions'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import { getUserById } from '../selectors/usersSelectors'
import * as followRelationsService from '../services/faceblock/followRelationsApis'
import { isEmpty } from 'lodash'

function* callFollowRelationsApi(apiName, actionType, apiInfos=[], otherInfos=[]) {
  try {
    let response = yield call(followRelationsService[apiName], ...apiInfos);
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
    yield put(followRelationsActions[actionType + 'Success'](response, ...otherInfos));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchFollowRelationsStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchFollowRelationsStart().type);
    let apiInfos = [payload.queryStr];
    let otherInfos = [payload.queryStr, payload.requestId]
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', 'fetchFollowRelations', apiInfos, otherInfos);
  }
}

function* watchCreateFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.createFollowRelationStart().type);
    let apiInfos = [payload.followRelation];
    let otherInfos = [payload.requestId]
    yield fork(callFollowRelationsApi, 'createFollowRelation', 'createFollowRelation', apiInfos, otherInfos);
  }
}

function* watchDeleteFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.deleteFollowRelationStart().type);
    let apiInfos = [payload.id];
    let otherInfos = [payload.id, payload.requestId]
    yield fork(callFollowRelationsApi, 'deleteFollowRelation', 'deleteFollowRelation', apiInfos, otherInfos);
  }
}

function* watchFetchFollowRelationStart() {
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchFollowRelationStart().type);
    let queryStr = `q=userId:(${payload.userId}) and followerId:(${payload.followerId})`;
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', 'fetchFollowRelation', [queryStr]);
  }
}

export default {
  watchFetchFollowRelationsStart, watchCreateFollowRelationStart, watchDeleteFollowRelationStart,
  watchFetchFollowRelationStart,
};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callFollowRelationsApi, watchFetchFollowRelationsStart};
}
