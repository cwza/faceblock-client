import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize, arrayOf } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { user as userSchema } from '../schemas/faceblockSchemas'
import usersActions from '../actions/usersActions'
import authenticationActions from '../actions/authenticationActions'
import otherActions from '../actions/otherActions'

const normalizeUsers = (users) => {
  return normalize(users, arrayOf(userSchema)).entities.users;
}

const mergeFetchedUsersToState = (state, users) => {
  return merge({}, state, normalizeUsers(users, userSchema));
}

const itemsReducer = (state = {}, action) => {
  switch(action.type) {
    case usersActions.fetchUsersSuccess().type:
    case authenticationActions.loginSuccess().type:
      if(action.payload.response.entities.users) {
        return mergeFetchedUsersToState(state, action.payload.response.entities.users)
      }
      return state;
    default:
      return state;
  }
}

const isFetchingReducer = (state = {}, action) => {
  switch(action.type) {
    case usersActions.fetchOldUsersStart().type:
    case usersActions.fetchNewUsersStart().type:
    case authenticationActions.loginStart().type:
      return true;
    case authenticationActions.loginSuccess().type:
    case usersActions.fetchUsersSuccess().type:
    case otherActions.setError().type:
      return false;
    default:
      return state;
  }
}

const usersReducer = combineReducers({
  items: itemsReducer,
  isFetching: isFetchingReducer
});


export default usersReducer;
// export {itemsReducer, isFetchingReducer}
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {itemsReducer, isFetchingReducer};
}
