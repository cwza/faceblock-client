import { take, put, call, fork, select } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import { getUserById } from '../selectors/usersSelectors'
import * as postsService from '../services/faceblock/postsApis'
import * as usersSelectors from '../selectors/usersSelectors'
import { isEmpty } from 'lodash'

function* callPostsApi(apiName, ...args) {
  try {
    let response = yield call(postsService[apiName], ...args);
    // fetch posts of authors
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
    yield put(postsActions[apiName + 'Success']({response}));
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

function* getFetchOldPostsQueryStr(queryStr, postsSelector, selectorParams) {
  let posts = yield select(postsSelector, selectorParams);
  if(posts.length === 0 || posts === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + posts[posts.length - 1].id;
}

function* getFetchNewPostsQueryStr(queryStr, postsSelector, selectorParams) {
  let posts = yield select(postsSelector, selectorParams);
  if(posts.length === 0 || posts === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + posts[0].id;
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchOldPostsStart() {
  // const requestChan = yield actionChannel(postsActions.fetchOldPostsStart().type);
  while(true) {
    let {payload} = yield take(postsActions.fetchOldPostsStart().type);
    // const {payload} = yield take(requestChan);
    let queryStr = yield* getFetchOldPostsQueryStr(payload.queryStr, payload.postsSelector, payload.selectorParams);
    yield fork(callPostsApi, 'fetchPosts', queryStr);
    // yield fork(fetchPosts, queryStr);
  }
}

function* watchFetchNewPostsStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchNewPostsStart().type);
    let queryStr = yield* getFetchNewPostsQueryStr(payload.queryStr, payload.postsSelector, payload.selectorParams);
    yield fork(callPostsApi, 'fetchPosts', queryStr);
  }
}

function* watchCreatePostStart() {
  while(true) {
    let {payload} = yield take(postsActions.createPostStart().type);
    let selfId = yield select(usersSelectors.getSelfId);
    yield fork(callPostsApi, 'createPost', {...payload, userId: selfId});
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
    yield fork(callPostsApi, 'fetchPost', payload);
  }
}

export default {
  watchFetchOldPostsStart, watchFetchNewPostsStart, watchCreatePostStart, watchDeletePostStart,
  watchFetchPostStart,
};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callPostsApi, getFetchOldPostsQueryStr, watchFetchOldPostsStart};
}
