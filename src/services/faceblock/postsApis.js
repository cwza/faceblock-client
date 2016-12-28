import { camelizeKeys } from 'humps'
import { API_ROOT } from './utilsApis'
import 'isomorphic-fetch'

// const mockFetchPosts = (endpoint) => {
//   const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
//   return new Promise((resolve, reject) => {
//
//   });
// }

const fetchPosts = (queryStr) => {
  const fullUrl = API_ROOT + 'posts?' + queryStr;
  console.log('fetch posts url: ', fullUrl);
  return fetch(fullUrl)
    .then(response => {
      return response.json().then(json => ({json, response}));
    }).then(({json, response}) => {
      if(!response.ok) return Promise.reject(json.error);
      return {response: camelizeKeys(json)};
    })
}

const createPost = (data) => {
  const fullUrl = API_ROOT + 'posts/';
  console.log('create post url: ', fullUrl);
  console.log('create post data: ', data);
  return fetch(fullUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(response => {
    return response.json().then(json => ({json, response}));
  }).then(({json, response}) => {
    if(!response.ok) return Promise.reject(json.error);
    return {response: camelizeKeys(json)};
  })
}

const deletePost = (postId) => {
  const fullUrl = API_ROOT + 'posts/' + postId;
  console.log('delete post url: ', fullUrl);
  return fetch(fullUrl, {
    method: "DELETE",
    credentials: "same-origin"
  }).then(response => {
    if(!response.ok) return response.json();
  }).then(json => {
    if(json) return Promise.reject(json.error);
  });
}

export { fetchPosts, createPost, deletePost };
