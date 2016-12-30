import { createActions } from 'redux-actions';

const authenticationActions = createActions({
  LOGIN_START: (socialSite, socialToken) => ({socialSite, socialToken}),
  LOGIN_SUCCESS: response => response,
  LOGOUT: () => {},
});

export default authenticationActions;
