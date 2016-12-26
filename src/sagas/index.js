import { fork } from 'redux-saga/effects'
import { watchFetchOldPostsStart } from './postsSagas'

export default function* root() {
  yield [
    fork(watchFetchOldPostsStart)
  ]
}
