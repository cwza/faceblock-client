import { take, put, call, fork, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import { getUserById } from '../selectors/usersSelectors'
import * as postsService from '../services/faceblock/postsApis'
import * as usersSelectors from '../selectors/usersSelectors'
import { isEmpty } from 'lodash'

function* callPostsApi(apiName, actionType, apiInfos=[], otherInfos=[]) {
  try {
    let response = yield call(postsService[apiName], ...apiInfos);
    // fetch authors or posts
    if(apiName.startsWith('fetch')) {
      let posts = response.entities.posts;
      let fetchedUserIds = [];
      yield* posts.map(function *(post) {
        let user = yield select(getUserById, post.userId)
        if(isEmpty(user) && !fetchedUserIds.includes(post.userId)) {
          yield put(usersActions.fetchUserStart(post.userId));
          fetchedUserIds.push(post.userId);
        }
      });
    }
    yield put(postsActions[actionType + 'Success'](response, ...otherInfos));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

function* deletePost(postId) {
  try {
    yield call(postsService.deletePost, postId);
    yield put(postsActions.deletePostSuccess(postId));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchPostsStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchPostsStart().type);
    let apiInfos = [payload.queryStr];
    let otherInfos = [payload.queryStr, payload.requestId]
    yield fork(callPostsApi, 'fetchPosts', 'fetchPosts', apiInfos, otherInfos);
  }
}

function* watchCreatePostStart() {
  while(true) {
    let {payload} = yield take(postsActions.createPostStart().type);
    let selfId = yield select(usersSelectors.getSelfId);
    yield fork(callPostsApi, 'createPost', 'createPost', [{...payload, userId: selfId}]);
  }
}

function* watchDeletePostStart() {
  while(true) {
    let {payload} = yield take(postsActions.deletePostStart().type);
    yield fork(deletePost, payload);
  }
}

function* watchFetchPostStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchPostStart().type);
    yield fork(callPostsApi, 'fetchPost', 'fetchPost', [payload]);
  }
}

export default {
  watchCreatePostStart, watchDeletePostStart,
  watchFetchPostStart, watchFetchPostsStart
};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callPostsApi, watchFetchPostsStart};
}
