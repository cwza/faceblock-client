import * as utils from '../../utils'
import * as Constants from '../../Constants'
import 'isomorphic-fetch'
import { camelizeKeys } from 'humps'

const getOauthLoginUrl = () => {
  const API_ROOT = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const params = {
    scope: 'email profile',
    state: '/profile',
    redirect_uri: Constants.HOST + '/googleOauth2Callback',
    response_type: 'token',
    client_id: '1070623711198-sla74ke91d17j71gp13t7f7iuk627tfk.apps.googleusercontent.com'
  }
  const fullUrl = utils.createUrlByParams(API_ROOT, params);
  return fullUrl;
}

const getParamsFromHash = (hash) => {
  let params = {};
  let queryString = hash.substring(1);
  let regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return camelizeKeys(params);
}

const getUserInfo = (token) => {
  const API_ROOT = 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json';
  const fullUrl = API_ROOT + '&access_token=' + token;
  return fetch(fullUrl)
    .then(response => {
      return response.json().then(json => ({json, response}));
    }).then(({json, response}) => {
      if(!response.ok) return Promise.reject(json.error);
      return {response: camelizeKeys(json)};
    })
}

export {getOauthLoginUrl, getParamsFromHash, getUserInfo};
