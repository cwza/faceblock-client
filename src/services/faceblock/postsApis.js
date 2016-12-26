import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { API_ROOT } from './utilsApis'

// const mockFetchPosts = (endpoint) => {
//   const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
//   return new Promise((resolve, reject) => {
//
//   });
// }

const fetchPosts = (endpoint) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log('fetch posts url: ', fullUrl);
  return fetch(fullUrl)
    .then(response => {
      return response.json().then(json => ({json, response}));
    }).then(({json, response}) => {
      if(!response.ok) return Promise.reject(json);
      return {response: camelizeKeys(json)}
    })
}

export { fetchPosts };
