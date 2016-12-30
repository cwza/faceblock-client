import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_OLD_USERS_START: (queryStr, usersSelector) => ({queryStr, usersSelector}),
  FETCH_NEW_USERS_START: (queryStr, usersSelector) => ({queryStr, usersSelector}),
  FETCH_USERS_SUCCESS: response => response,
});

export default usersActions;
