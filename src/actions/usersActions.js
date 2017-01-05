import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_OLD_USERS_START: (queryStr, usersSelector, selectorParams) => ({queryStr, usersSelector, selectorParams}),
  FETCH_NEW_USERS_START: (queryStr, usersSelector, selectorParams) => ({queryStr, usersSelector, selectorParams}),
  FETCH_USERS_SUCCESS: response => response,
  FETCH_USER_START: userId => userId,
  FETCH_USER_SUCCESS: response => response,
});

export default usersActions;
