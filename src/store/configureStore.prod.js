import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, reduxRouterMiddleware),
      persistState('localStorage')
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
