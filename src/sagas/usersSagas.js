import { take, put, call, fork, select } from 'redux-saga/effects'
import usersActions from '../actions/usersActions'
import otherActions from '../actions/otherActions'
import * as usersService from '../services/faceblock/usersApis'

function* callUsersApi(apiName, ...args) {
  try {
    let response = yield call(usersService[apiName], ...args);
    yield put(usersActions[apiName + 'Success']({response}));
  } catch(error) {
    yield put(otherActions.setError({error}))
  }
}

function* getFetchOldUsersQueryStr(queryStr, usersSelector, selectorParams) {
  let users = yield select(usersSelector, selectorParams);
  if(users.length === 0 || users === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + users[users.length - 1].id;
}

function* getFetchNewUsersQueryStr(queryStr, usersSelector, selectorParams) {
  let users = yield select(usersSelector, selectorParams);
  if(users.length === 0 || users === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + users[0].id;
}

///////////////////////////////////WATCHER////////////////////////////
function* watchFetchOldUsersStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchOldUsersStart().type);
    let queryStr = yield* getFetchOldUsersQueryStr(payload.queryStr, payload.usersSelector, payload.selectorParams);
    yield fork(callUsersApi, 'fetchUsers', queryStr);
    // yield fork(fetchUsers, queryStr);
  }
}

function* watchFetchNewUsersStart() {
  while(true) {
    let {payload} = yield take(usersActions.fetchNewUsersStart().type);
    let queryStr = yield* getFetchNewUsersQueryStr(payload.queryStr, payload.usersSelector, payload.selectorParams);
    yield fork(callUsersApi, 'fetchUsers',queryStr);
  }
}


export default {watchFetchOldUsersStart, watchFetchNewUsersStart};
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {callUsersApi, getFetchOldUsersQueryStr, watchFetchOldUsersStart};
}