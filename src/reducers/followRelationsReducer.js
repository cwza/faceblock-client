import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { followRelationListSchema } from '../schemas/faceblockSchemas'
import followRelationsActions from '../actions/followRelationsActions'
import otherActions from '../actions/otherActions'
import * as utils from '../utils'

const normalizeFollowRelations = (followRelations) => {
  return normalize(followRelations, followRelationListSchema).entities.followRelations;
}

const mergeFetchedFollowRelationsToState = (state, followRelations) => {
  return merge({}, state, normalizeFollowRelations(followRelations));
}

const itemsReducer = (state = {}, action) => {
  switch(action.type) {
    case followRelationsActions.fetchFollowRelationsSuccess().type:
    case followRelationsActions.createFollowRelationSuccess().type:
    case followRelationsActions.fetchFollowRelationSuccess().type:
      if(action.payload.response.entities.followRelations) {
        return mergeFetchedFollowRelationsToState(state, action.payload.response.entities.followRelations)
      }
      return state;
    case followRelationsActions.deleteFollowRelationSuccess().type:
      return utils.deletePropertiesFromObject(state, [action.payload.toString()])
    default:
      return state;
  }
}

const isFetchingReducer = (state = false, action) => {
  switch(action.type) {
    case followRelationsActions.createFollowRelationStart().type:
    case followRelationsActions.deleteFollowRelationStart().type:
    case followRelationsActions.fetchFollowRelationsStart().type:
    case followRelationsActions.fetchFollowRelationStart().type:
      return true;
    case followRelationsActions.deleteFollowRelationSuccess().type:
    case followRelationsActions.createFollowRelationSuccess().type:
    case followRelationsActions.fetchFollowRelationsSuccess().type:
    case followRelationsActions.fetchFollowRelationSuccess().type:
    case otherActions.setError().type:
      return false;
    default:
      return state;
  }
}

const followRelationsReducer = combineReducers({
  items: itemsReducer,
  isFetching: isFetchingReducer
});


export default followRelationsReducer;
// export {itemsReducer, isFetchingReducer}
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {itemsReducer, isFetchingReducer};
}
