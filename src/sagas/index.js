import { fork } from 'redux-saga/effects'
import { watchFetchOldPostsStart, watchFetchNewPostsStart, watchCreatePostStart } from './postsSagas'

export default function* root() {
  yield [
    fork(watchFetchOldPostsStart),
    fork(watchFetchNewPostsStart),
    fork(watchCreatePostStart),
  ]
}
