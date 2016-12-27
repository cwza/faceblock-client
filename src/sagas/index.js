import { fork } from 'redux-saga/effects'
import { watchFetchOldPostsStart, watchFetchNewPostsStart } from './postsSagas'

export default function* root() {
  yield [
    fork(watchFetchOldPostsStart),
    fork(watchFetchNewPostsStart)
  ]
}
