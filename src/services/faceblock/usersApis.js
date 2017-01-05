import { camelizeKeys } from 'humps'
import { API_ROOT, getReqHeaders } from './utilsApis'
import 'isomorphic-fetch'

const fetchUsers = (queryStr) => {
  const fullUrl = API_ROOT + 'users?' + queryStr;
  console.log('fetch users url: ', fullUrl);
  return fetch(fullUrl, {
    method: "GET",
    headers: getReqHeaders(),
  }).then(response => {
    return response.json().then(json => ({json, response}));
  }).then(({json, response}) => {
    if(!response.ok) return Promise.reject(json.error);
    return camelizeKeys(json);
  })
}

const fetchUser = (userId) => {
  const fullUrl = API_ROOT + 'users/' + userId;
  console.log('fetch user url: ', fullUrl);
  return fetch(fullUrl, {
    method: "GET",
    headers: getReqHeaders(),
  }).then(response => {
    return response.json().then(json => ({json, response}));
  }).then(({json, response}) => {
    if(!response.ok) return Promise.reject(json.error);
    return camelizeKeys(json);
  })
}

export { fetchUsers, fetchUser };
