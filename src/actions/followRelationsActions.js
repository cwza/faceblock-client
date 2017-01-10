import { createActions } from 'redux-actions';

const followRelationsActions = createActions({
  FETCH_FOLLOW_RELATIONS_START: (queryStr, requestId) => ({queryStr, requestId}),
  FETCH_FOLLOW_RELATIONS_SUCCESS: (response, queryStr, requestId) => ({response, queryStr, requestId}),
  CREATE_FOLLOW_RELATION_START: (followRelation, requestId) => ({followRelation, requestId}),
  CREATE_FOLLOW_RELATION_SUCCESS: (response, requestId) => ({response, requestId}),
  DELETE_FOLLOW_RELATION_START: (id, requestId) => ({id, requestId}),
  DELETE_FOLLOW_RELATION_SUCCESS: (response, id, requestId) => ({response, id, requestId}),
  FETCH_FOLLOW_RELATION_START: (userId, followerId, requestId) => ({userId, followerId, requestId}),
  FETCH_FOLLOW_RELATION_SUCCESS: (response, requestId) => ({response, requestId}),
});

export default followRelationsActions;
