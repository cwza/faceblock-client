import { take, put, call, fork, select } from 'redux-saga/effects'
import postsActions from '../actions/postsActions'
import * as postsService from '../services/faceblock/postsApis'

function* fetchPosts(queryStr) {
  try {
    let response = yield call(postsService.fetchPosts, queryStr);
    yield put(postsActions.fetchPostsSuccess(response));
  } catch(error) {
    yield put(postsActions.fetchPostsError(error))
  }
}

function* getFetchOldPostsQueryStr(queryStr, postsSelector) {
  let posts = yield select(postsSelector);
  if(posts.length === 0 || posts === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + posts[posts.length - 1].id;
}

function* watchFetchOldPostsStart() {
  while(true) {
    let {payload} = yield take(postsActions.fetchOldPostsStart().type);
    let queryStr = yield* getFetchOldPostsQueryStr(payload.queryStr, payload.postsSelector);
    yield fork(fetchPosts, 'posts?' + queryStr);
  }
}

export {watchFetchOldPostsStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {fetchPosts, getFetchOldPostsQueryStr, watchFetchOldPostsStart};
}
