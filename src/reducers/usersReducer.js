import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { userListSchema } from '../schemas/faceblockSchemas'
import usersActions from '../actions/usersActions'
import authenticationActions from '../actions/authenticationActions'

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
      if(action.payload.response.entities.users) {
        return mergeFetchedUsersToState(state, action.payload.response.entities.users)
      }
      return state;
    default:
      return state;
  }
}

const usersReducer = combineReducers({
  items: itemsReducer,
});


export default usersReducer;
// export {itemsReducer, isFetchingReducer}
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {itemsReducer};
}
