import { combineReducers } from 'redux'
import postsReducer from './postsReducer'
import { reducer as formReducer } from 'redux-form'
import errorReducer from './errorReducer'

const entitiesReducer = combineReducers({
  posts: postsReducer
});

const faceblockReducer = combineReducers({
  entities: entitiesReducer
});

const apisReducer = combineReducers({
  faceblock: faceblockReducer
});

const rootReducer = combineReducers({
  apis: apisReducer,
  form: formReducer,
  error: errorReducer,
});

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
