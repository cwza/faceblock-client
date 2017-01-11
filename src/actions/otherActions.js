import { createActions } from 'redux-actions';

const otherActions = createActions({
  SET_ERROR: error => error,
  RESET_ERROR: () => {},
  REMOVE_REQUEST_INFO: requestId => ({requestId}),
  RESET_FETCHING_STATUS: requestId => ({requestId}),
});

export default otherActions;
