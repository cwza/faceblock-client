import { combineReducers } from 'redux'
import { merge } from 'lodash'
import authenticationActions from '../actions/authenticationActions'
import otherActions from '../actions/otherActions'

const itemReducer = (state={}, action) => {
  switch(action.type) {
    case authenticationActions.loginSuccess().type:
      if(action.payload.response.authentication) {
        return merge({}, state, action.payload.response.authentication);
      }
      return state;
    case authenticationActions.logout().type:
      return {};
    default:
      return state;
  }
}

const isFetchingReducer = (state = false, action) => {
  switch(action.type) {
    case authenticationActions.loginStart().type:
      return true;
    case authenticationActions.loginSuccess().type:
    case otherActions.setError().type:
    case authenticationActions.logout().type:
      return false;
    default:
      return state;
  }
}

const authentiactionReducer = combineReducers({
  item: itemReducer,
  isFetching: isFetchingReducer,
})

// const authentiactionReducer = (state=initState, action) => {
//   switch(action.type) {
//     case authenticationActions.loginStart().type:
//       return {...state, isFetching: true};
//     case authenticationActions.loginSuccess().type:
//       let userId = action.payload.response.authentication.userId;
//       let faceblockToken = action.payload.response.authentication.faceblockToken;
//       return {userId, faceblockToken, isFetching: false};
//     case otherActions.setError().type:
//       return initState;
//     default:
//       return state;
//   }
// }


export default authentiactionReducer;
