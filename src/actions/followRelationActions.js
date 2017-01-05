import { createActions } from 'redux-actions';

const followRelationActions = createActions({
  FETCH_OLD_FOLLOW_RELATIONS_START: (queryStr, followRelationSelector, selectorParams) => ({queryStr, followRelationSelector, selectorParams}),
  FETCH_NEW_FOLLOW_RELATIONS_START: (queryStr, followRelationSelector, selectorParams) => ({queryStr, followRelationSelector, selectorParams}),
  FETCH_FOLLOW_RELATIONS_SUCCESS: response => response,
  CREATE_FOLLOW_RELATION_START: followRelation => followRelation,
  CREATE_FOLLOW_RELATION_SUCCESS: response => response,
  DELETE_FOLLOW_RELATION_START: id => id,
  DELETE_FOLLOW_RELATION_SUCCESS: id => id,
  FETCH_FOLLOW_RELATION_START: followRelationId => followRelationId,
  FETCH_FOLLOW_RELATION_SUCCESS: response => response,
});

export default followRelationActions;
