import { camelizeKeys } from 'humps'
import { API_ROOT, getReqHeaders } from './utilsApis'
import 'isomorphic-fetch'


const fetchFollowRelations = (queryStr) => {
  const fullUrl = API_ROOT + 'followRelations?' + queryStr;
  console.log('fetch followRelations url: ', fullUrl);
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

const createFollowRelation = (data) => {
  const fullUrl = API_ROOT + 'followRelations/';
  console.log('create followRelation url: ', fullUrl);
  console.log('create followRelation data: ', data);
  return fetch(fullUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: getReqHeaders(),
    credentials: "same-origin"
  }).then(response => {
    return response.json().then(json => ({json, response}));
  }).then(({json, response}) => {
    if(!response.ok) return Promise.reject(json.error);
    return camelizeKeys(json);
  })
}

const deleteFollowRelation = (postId) => {
  const fullUrl = API_ROOT + 'followRelations/' + postId;
  console.log('delete followRelation url: ', fullUrl);
  return fetch(fullUrl, {
    method: "DELETE",
    headers: getReqHeaders(),
    credentials: "same-origin"
  }).then(response => {
    if(!response.ok) return response.json();
  }).then(json => {
    if(json) return Promise.reject(json.error);
  });
}

const fetchFollowRelation = (postId) => {
  const fullUrl = API_ROOT + 'followRelations/' + postId;
  console.log('fetch followRelation url: ', fullUrl);
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

export { fetchFollowRelations, createFollowRelation, deleteFollowRelation, fetchFollowRelation };
