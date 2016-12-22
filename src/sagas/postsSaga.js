import { take, put, call, fork, select } from 'redux-saga/effects'
import postsActions from '../actions/postsActions'

function* watchFetchOldPostsStart() {
  while(true) {
    let {queryStr} = yield take(postsActions.fetchOldPostsStart().type);
  }
}

export default function* root() {
  yield [
    fork(watchFetchOldPostsStart)
  ]
}
