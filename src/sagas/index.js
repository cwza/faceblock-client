import { fork } from 'redux-saga/effects'
// import { watchFetchOldPostsStart, watchFetchNewPostsStart, watchCreatePostStart, watchDeletePostStart } from './postsSagas'
import postsWatchers from './postsSagas'
import authenticationWatchers from './authenticationSagas'
import usersWatchers from './usersSagas'


export default function* root() {
  yield [
    ...Object.values(postsWatchers).map(postsWatcher => fork(postsWatcher)),
    ...Object.values(authenticationWatchers).map(authenticationWatcher => fork(authenticationWatcher)),
    ...Object.values(usersWatchers).map(usersWatcher => fork(usersWatcher)),
  ]
}
