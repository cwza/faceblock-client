import { createHistory } from 'history'
import { useRouterHistory } from 'react-router'
import * as Constants from './Constants'

const browserHistory = useRouterHistory(createHistory)({
  basename: Constants.ROOT_PATH
});

export default browserHistory;
