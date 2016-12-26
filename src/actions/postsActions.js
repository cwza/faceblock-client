import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_OLD_POSTS_START: (queryStr, postsSelector) => ({queryStr, postsSelector}),
  FETCH_NEW_POSTS_START: (queryStr, postsSelector) => ({queryStr, postsSelector}),
  FETCH_POSTS_SUCCESS: (response) => response,
  FETCH_POSTS_ERROR: (error) => error,
});

export default postsActions;
