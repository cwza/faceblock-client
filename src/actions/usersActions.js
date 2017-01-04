import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_OLD_USERS_START: (queryStr, usersSelector, selectorParams) => ({queryStr, usersSelector, selectorParams}),
  FETCH_NEW_USERS_START: (queryStr, usersSelector, selectorParams) => ({queryStr, usersSelector, selectorParams}),
  FETCH_USER_START: id => id,
  FETCH_USERS_SUCCESS: response => response,
});

export default usersActions;
