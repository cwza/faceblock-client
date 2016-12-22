import { createActions } from 'redux-actions';

const postsActions = createActions({
  FETCH_OLD_POSTS_START: (queryStr) => ({queryStr}),
  FETCH_OLD_POSTS_SUCCESS: (response) => ({response}),
  FETCH_OLD_POSTS_ERROR: (error) => ({error}),
  FETCH_NEW_POSTS_START: (queryStr) => ({queryStr}),
  FETCH_NEW_POSTS_SUCCESS: (response) => ({response}),
  FETCH_NEW_POSTS_ERROR: (error) => ({error}),
});

export default postsActions;
