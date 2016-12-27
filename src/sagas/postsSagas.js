import { take, put, call, fork, select } from 'redux-saga/effects'
import postsActions from '../actions/postsActions'
import * as postsService from '../services/faceblock/postsApis'
import * as usersSelectors from '../selectors/usersSelectors'


function* fetchPosts(queryStr) {
  try {
    let response = yield call(postsService.fetchPosts, queryStr);
    yield put(postsActions.fetchPostsSuccess(response));
  } catch(error) {
    yield put(postsActions.fetchPostsError(error))
  }
}

function* createPost(data) {
  try {
    let response = yield call(postsService.createPost, data);
    yield put(postsActions.createPostSuccess(response));
  } catch(error) {
    yield put(postsActions.createPostError(error))
  }
}

function* getFetchOldPostsQueryStr(queryStr, postsSelector) {
  let posts = yield select(postsSelector);
  if(posts.length === 0 || posts === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + posts[posts.length - 1].id;
}

function* getFetchNewPostsQueryStr(queryStr, postsSelector) {
  let posts = yield select(postsSelector);
  if(posts.length === 0 || posts === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + posts[0].id;
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchOldPostsStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchOldPostsStart().type);
    let queryStr = yield* getFetchOldPostsQueryStr(payload.queryStr, payload.postsSelector);
    yield fork(fetchPosts, queryStr);
  }
}

function* watchFetchNewPostsStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchNewPostsStart().type);
    let queryStr = yield* getFetchNewPostsQueryStr(payload.queryStr, payload.postsSelector);
    yield fork(fetchPosts, queryStr);
  }
}

function* watchCreatePostStart() {
  while(true) {
    let {payload} = yield take(postsActions.createPostStart().type);
    let selfId = yield select(usersSelectors.getSelfId);
    yield fork(createPost, {...payload, userId: selfId});
  }
}

export {watchFetchOldPostsStart, watchFetchNewPostsStart, watchCreatePostStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {fetchPosts, getFetchOldPostsQueryStr, watchFetchOldPostsStart};
}
