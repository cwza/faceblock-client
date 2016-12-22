import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import routes from './routes'
import Root from './containers/Root'
import configureStore from './store/configureStore'
// import rootSaga from './sagas'

// state = {
//   entities: {
//     posts: {
//       ...posts get from server
//       componentId: {
//         order: [],
//         loadOlderIsFetching: true,
//         displayTopId: 24
//       }
//     }
//   }
// }
const defaultState = {
};

const store = configureStore(defaultState)
// store.runSaga(rootSaga)

ReactDOM.render(
  <Root
    store={store}
    history={browserHistory}
    routes={routes} />,
  document.getElementById('root')
);
