import { fork } from 'redux-saga/effects'
// import { watchFetchOldPostsStart, watchFetchNewPostsStart, watchCreatePostStart, watchDeletePostStart } from './postsSagas'
import postsWatchers from './postsSagas'
import authenticationWatchers from './authenticationSagas'


export default function* root() {
  yield [
    ...Object.values(postsWatchers).map(postsWatcher => fork(postsWatcher)),
    ...Object.values(authenticationWatchers).map(authenticationWatcher => fork(authenticationWatcher)),
  ]
}
