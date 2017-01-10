import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_USERS_START: (queryStr, requestId) => ({queryStr, requestId}),
  FETCH_USERS_SUCCESS: (response, queryStr, requestId) => ({response, queryStr, requestId}),
  FETCH_USER_START: (userId, requestId) => ({userId, requestId}),
  FETCH_USER_SUCCESS: (response, requestId) => ({response, requestId}),
});

export default usersActions;
