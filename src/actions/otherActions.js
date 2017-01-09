import { createActions } from 'redux-actions';

const otherActions = createActions({
  SET_ERROR: error => error,
  RESET_ERROR: () => {},
  REMOVE_REQUEST_INFO: requestIdBegin => requestIdBegin,
});

export default otherActions;
