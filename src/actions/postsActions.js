import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_OLD_POSTS_START: (queryStr, postsSelector, selectorParams) => ({queryStr, postsSelector, selectorParams}),
  FETCH_NEW_POSTS_START: (queryStr, postsSelector, selectorParams) => ({queryStr, postsSelector, selectorParams}),
  FETCH_POSTS_SUCCESS: response => response,
  CREATE_POST_START: post => post,
  CREATE_POST_SUCCESS: response => response,
  DELETE_POST_START: id => id,
  DELETE_POST_SUCCESS: id => id,
});

export default postsActions;
