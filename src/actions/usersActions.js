import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_OLD_USERS_START: (queryStr, usersSelector, formName, fieldName) => ({queryStr, usersSelector, formName, fieldName}),
  FETCH_NEW_USERS_START: (queryStr, usersSelector, formName, fieldName) => ({queryStr, usersSelector, formName, fieldName}),
  FETCH_USER_START: id => id,
  FETCH_USERS_SUCCESS: response => response,
});

export default usersActions;
