// import { combineReducers } from 'redux'
// import postsReducer from './posts'
//
// const entities = combineReducers({
//   posts: postsReducer
// });
//
// const rootReducer = combineReducers({
//   entities,
// })
//
// export default rootReducer
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
