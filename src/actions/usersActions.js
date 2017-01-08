import { createActions } from 'redux-actions';

const usersActions = createActions({
  FETCH_USERS_START: queryStr => queryStr,
  FETCH_USERS_SUCCESS: response => response,
  FETCH_USER_START: userId => userId,
  FETCH_USER_SUCCESS: response => response,
});

export default usersActions;
