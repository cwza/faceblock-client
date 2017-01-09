import usersActions from '../actions/usersActions'
import { union } from 'lodash'

const getOrder = (state=[], queryStr, users) => {
  let userIds = users.map(user => user.id);
  if(queryStr.includes('upperNearId')) {
    return union(userIds, state);
  } else {
    return union(state, userIds);
  }
}

const getRequestInfo = (state={}, action) => {
  return {
    ...state,
    order: getOrder(state.order, action.payload.queryStr, action.payload.response.entities.users),
  }
}

const requestInfoReducer = (state={}, action) => {
  if(!action.payload || !action.payload.requestId)
    return state;
  let requestId = action.payload.requestId;
  switch(action.type) {
    case usersActions.fetchUsersSuccess().type:
      return {
        ...state,
        [requestId]: getRequestInfo(state[requestId], action)
      };
    default:
      return state;
  }
}

export default requestInfoReducer;
