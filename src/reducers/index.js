import { combineReducers } from 'redux'
import postsReducer from './postsReducer'
import usersReducer from './usersReducer'
import authenticationReducer from './authenticationReducer'
import { reducer as formReducer } from 'redux-form'
import errorReducer from './errorReducer'
import authenticationActions from '../actions/authenticationActions'
import followRelationsReducer from './followRelationsReducer'
import { routerReducer } from 'react-router-redux'
import requestInfoReducer from './requestInfoReducer'

const entitiesReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  followRelations: followRelationsReducer,
});

const faceblockReducer = combineReducers({
  entities: entitiesReducer,
  requestInfo: requestInfoReducer
});

const apisReducer = combineReducers({
  faceblock: faceblockReducer
});

const localStorageReducer = combineReducers({
  authentication: authenticationReducer
});

const appReducer = combineReducers({
  apis: apisReducer,
  form: formReducer,
  error: errorReducer,
  localStorage: localStorageReducer,
  routing: routerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === authenticationActions.logout().type) {
    state = {routing: state.routing};
  }
  return appReducer(state, action)
}

export default rootReducer;
// export default function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'INCREMENT_IF_ODD':
//       return (state % 2 !== 0) ? state + 1 : state
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// }
