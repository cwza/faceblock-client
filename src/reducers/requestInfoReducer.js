import usersActions from '../actions/usersActions'
import postsActions from '../actions/postsActions'
import otherActions from '../actions/otherActions'
import followRelationsActions from '../actions/followRelationsActions'
import { union } from 'lodash'
import * as utils from '../utils'

const getOrder = (state=[], queryStr, entities) => {
  let entityIds = entities.map(entity => entity.id);
  if(queryStr.includes('upperNearId')) {
    return union(entityIds, state);
  } else {
    return union(state, entityIds);
  }
}

const getRequestInfo = (state={}, queryStr, entities) => {
  return {
    ...state,
    order: getOrder(state.order, queryStr, entities),
  }
}

const removeRequestInfo = (state={}, requestIdBegin) => {
  let result = Object.keys(state).reduce((newState, requestId) => {
    if(requestId.startsWith(requestIdBegin))
      return utils.deletePropertiesFromObject(newState, requestId);
    return newState;
  }, state)
  console.log('result: ', result);
  return result;
}

const requestInfoReducer = (state={}, action) => {
  switch(action.type) {
    case usersActions.fetchUsersSuccess().type:
      return {
        ...state,
        [action.payload.requestId]: getRequestInfo(state[action.payload.requestId], action.payload.queryStr, action.payload.response.entities.users)
      };
    case postsActions.fetchPostsSuccess().type:
      return {
        ...state,
        [action.payload.requestId]: getRequestInfo(state[action.payload.requestId], action.payload.queryStr, action.payload.response.entities.posts)
      };
    case followRelationsActions.fetchFollowRelationsSuccess().type:
      return {
        ...state,
        [action.payload.requestId]: getRequestInfo(state[action.payload.requestId], action.payload.queryStr, action.payload.response.entities.followRelations)
      };
    case otherActions.removeRequestInfo().type:
      return removeRequestInfo(state, action.payload)
    default:
      return state;
  }
}

export default requestInfoReducer;
