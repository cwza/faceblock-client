import { createActions } from 'redux-actions';

const otherActions = createActions({
  SET_ERROR: error => error,
  RESET_ERROR: () => {},
});

export default otherActions;
