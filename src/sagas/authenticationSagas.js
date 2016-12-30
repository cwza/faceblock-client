import { take, put, call, fork } from 'redux-saga/effects'
import authenticationActions from '../actions/authenticationActions'
import otherActions from '../actions/otherActions'
import * as authenticationService from '../services/faceblock/authenticationApis'

function* callAuthenticationApi(apiName, ...args) {
  try {
    let response = yield call(authenticationService[apiName], ...args);
    yield put(authenticationActions[apiName + 'Success']({response}));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

///////////////////////////////////WATCHER////////////////////////////
function* watchLoginStart() {
  while(true) {
    let {payload} = yield take(authenticationActions.loginStart().type);
    yield fork(callAuthenticationApi, 'login', payload.socialSite, payload.socialToken);
  }
}

export default { watchLoginStart };
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {};
}
