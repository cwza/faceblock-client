import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { userListSchema } from '../schemas/faceblockSchemas'
import usersActions from '../actions/usersActions'
import authenticationActions from '../actions/authenticationActions'
import otherActions from '../actions/otherActions'

const normalizeUsers = (users) => {
  return normalize(users, userListSchema).entities.users;
}

const mergeFetchedUsersToState = (state, users) => {
  return merge({}, state, normalizeUsers(users));
}

const itemsReducer = (state = {}, action) => {
  switch(action.type) {
    case usersActions.fetchUsersSuccess().type:
    case authenticationActions.loginSuccess().type:
    case usersActions.fetchUserSuccess().type:
      console.log('action: ', action);
      if(action.payload.response.entities.users) {
        return mergeFetchedUsersToState(state, action.payload.response.entities.users)
      }
      return state;
    default:
      return state;
  }
}

const isFetchingReducer = (state = false, action) => {
  switch(action.type) {
    case usersActions.fetchUsersStart().type:
    case authenticationActions.loginStart().type:
    case usersActions.fetchUserStart().type:
      return true;
    case authenticationActions.loginSuccess().type:
    case usersActions.fetchUsersSuccess().type:
    case usersActions.fetchUserSuccess().type:
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
