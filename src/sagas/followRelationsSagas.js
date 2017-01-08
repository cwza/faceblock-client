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

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchFollowRelationsStart() {
  // const requestChan = yield actionChannel(followRelationsActions.fetchOldFollowRelationsStart().type);
  while(true) {
    let {payload} = yield take(followRelationsActions.fetchFollowRelationsStart().type);
    // const {payload} = yield take(requestChan);
    yield fork(callFollowRelationsApi, 'fetchFollowRelations', payload);
    // yield fork(fetchFollowRelations, queryStr);
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
  watchFetchFollowRelationsStart, watchCreateFollowRelationStart, watchDeleteFollowRelationStart,
  watchFetchFollowRelationStart,
};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callFollowRelationsApi, watchFetchFollowRelationsStart};
}
