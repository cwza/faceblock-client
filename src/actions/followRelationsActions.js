import { createActions } from 'redux-actions';

const followRelationsActions = createActions({
  FETCH_OLD_FOLLOW_RELATIONS_START: (queryStr, followRelationsSelector, selectorParams) => ({queryStr, followRelationsSelector, selectorParams}),
  FETCH_NEW_FOLLOW_RELATIONS_START: (queryStr, followRelationsSelector, selectorParams) => ({queryStr, followRelationsSelector, selectorParams}),
  FETCH_FOLLOW_RELATIONS_SUCCESS: response => response,
  CREATE_FOLLOW_RELATION_START: followRelation => followRelation,
  CREATE_FOLLOW_RELATION_SUCCESS: response => response,
  DELETE_FOLLOW_RELATION_START: id => id,
  DELETE_FOLLOW_RELATION_SUCCESS: response => response,
  FETCH_FOLLOW_RELATION_START: (userId, followerId) => ({userId, followerId}),
  FETCH_FOLLOW_RELATION_SUCCESS: response => response,
});

export default followRelationsActions;
