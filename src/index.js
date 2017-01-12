import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import 'bootstrap/dist/css/bootstrap.css'

const defaultState = {
  localStorage: {userId: 1, faceblockToken: 'xxx'}
};

const store = configureStore(defaultState)
store.runSaga(rootSaga)

const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Root
    store={store}
    history={history}
    routes={routes} />,
  document.getElementById('root')
);
