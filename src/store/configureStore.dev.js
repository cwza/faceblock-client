import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
// import DevTools from '../containers/DevTools'
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'


export default function configureStore(initialState) {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      }) : compose;
  const sagaMiddleware = createSagaMiddleware()
  const reduxRouterMiddleware = routerMiddleware(browserHistory)

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        reduxRouterMiddleware,
        createLogger(),
      ),
      persistState('localStorage'),
      // DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
