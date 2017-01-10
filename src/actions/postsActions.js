import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_POSTS_START: (queryStr, requestId) => ({queryStr, requestId}),
  FETCH_POSTS_SUCCESS: (response, queryStr, requestId) => ({response, queryStr, requestId}),
  CREATE_POST_START: (post, requestId) => ({post, requestId}),
  CREATE_POST_SUCCESS: (response, requestId) => ({response, requestId}),
  DELETE_POST_START: (id, requestId) => ({id, requestId}),
  DELETE_POST_SUCCESS: (response, id, requestId) => ({response, id, requestId}),
  FETCH_POST_START: (postId, requestId) => ({postId, requestId}),
  FETCH_POST_SUCCESS: (response, requestId) => ({response, requestId}),
});

export default postsActions;
