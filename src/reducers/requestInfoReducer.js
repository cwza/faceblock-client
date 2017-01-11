import otherActions from '../actions/otherActions'
import { union } from 'lodash'
import * as utils from '../utils'
import { camelize } from 'humps'

const getOrder = (state=[], action) => {
  if(!action.payload.queryStr || !action.type.endsWith('SUCCESS'))
    return state;
  let entities = action.payload.response.entities[camelize(action.type.match('FETCH_(.*)_SUCCESS')[1].toLowerCase())];
  let queryStr = action.payload.queryStr;
  let entityIds = entities.map(entity => entity.id);
  if(queryStr.includes('upperNearId')) {
    return union(entityIds, state);
  } else {
    return union(state, entityIds);
  }
}

const getFetchingStatus = (state=0, action) => {
  if(action.type.endsWith('START')) {
    return 1;
  } else if(action.type.endsWith('SUCCESS')) {
    return 2;
  } else if(action.type.endsWith('ERROR') || action.type === otherActions.resetFetchingStatus().type) {
    return 0;
  }
  return state;
}

const getRequestInfo = (state={}, action) => {
  return {
    ...state,
    order: getOrder(state.order, action),
    fetchingStatus: getFetchingStatus(state.fetchingStatus, action),
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
  if(!action.payload || !action.payload.requestId)
    return state;
  switch(action.type) {
    case otherActions.removeRequestInfo().type:
      return removeRequestInfo(state, action.payload.requestId)
    default:
      return {
        ...state,
        [action.payload.requestId]: getRequestInfo(state[action.payload.requestId], action)
      };
  }
}

export default requestInfoReducer;
