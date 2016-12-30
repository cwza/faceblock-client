import { camelizeKeys } from 'humps'
import { API_ROOT } from './utilsApis'
import 'isomorphic-fetch'

const login = (socialSite, socialToken) => {
  const fullUrl = API_ROOT + 'login';
  console.log('login url: ', fullUrl);
  console.log('socialSite: ', socialSite);
  console.log('socialToken: ', socialToken);
  return fetch(fullUrl, {
    method: "POST",
    body: JSON.stringify({socialSite, socialToken}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(response => {
    return response.json().then(json => ({json, response}));
  }).then(({json, response}) => {
    if(!response.ok) return Promise.reject(json.error);
    return camelizeKeys(json);
  })
}

export { login };
