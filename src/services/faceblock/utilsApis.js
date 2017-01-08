import { camelizeKeys } from 'humps'

const API_ROOT = 'http://localhost:3001/'

const getFaceblockTokenFromLocalStorage = () => {
  let reduxLocalStorage = localStorage.getItem('redux');
  if(reduxLocalStorage)
    reduxLocalStorage = JSON.parse(reduxLocalStorage);
  if(reduxLocalStorage && reduxLocalStorage.localStorage && reduxLocalStorage.localStorage.authentication)
    return reduxLocalStorage.localStorage.authentication.item.faceblockToken;
  return '';
}

const getReqHeaders = () => {
  return {
    "Content-Type": "application/json",
    "faceblock_token": getFaceblockTokenFromLocalStorage(),
  };
}

const callGet = (fullUrl) => {
  console.log('fetch url: ', fullUrl);
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

const callPost = (fullUrl, data) => {
  console.log('create url: ', fullUrl);
  console.log('create data: ', data);
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

const callDelete = (fullUrl) => {
  console.log('delete url: ', fullUrl);
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

const getFetchOldQueryStr = (queryStr, entities) => {
  if(entities.length === 0 || entities === undefined)
    return queryStr;
  return queryStr + '&underNearId=' + entities[entities.length - 1].id;
}

const getFetchNewQueryStr = (queryStr, entities) => {
  if(entities.length === 0 || entities === undefined)
    return queryStr;
  return queryStr + '&upperNearId=' + entities[0].id;
}

export {API_ROOT, getReqHeaders, callGet, callPost, callDelete, getFetchOldQueryStr, getFetchNewQueryStr}
