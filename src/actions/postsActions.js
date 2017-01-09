import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_POSTS_START: (queryStr, requestId) => ({queryStr, requestId}),
  FETCH_POSTS_SUCCESS: (response, queryStr, requestId) => ({response, queryStr, requestId}),
  CREATE_POST_START: post => post,
  CREATE_POST_SUCCESS: response => ({response}),
  DELETE_POST_START: id => id,
  DELETE_POST_SUCCESS: response => ({response}),
  FETCH_POST_START: postId => postId,
  FETCH_POST_SUCCESS: response => ({response}),
});

export default postsActions;
