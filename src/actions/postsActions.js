import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_OLD_POSTS_START: (queryStr, postsSelector) => ({queryStr, postsSelector}),
  FETCH_NEW_POSTS_START: (queryStr, postsSelector) => ({queryStr, postsSelector}),
  FETCH_POSTS_SUCCESS: response => response,
  CREATE_POST_START: post => post,
  CREATE_POST_SUCCESS: response => response,
});

export default postsActions;
