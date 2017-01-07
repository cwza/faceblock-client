import { API_ROOT, callGet } from './utilsApis'
import 'isomorphic-fetch'

const fetchUsers = (queryStr) => {
  const fullUrl = API_ROOT + 'users?' + queryStr;
  return callGet(fullUrl);
}

const fetchUser = (userId) => {
  const fullUrl = API_ROOT + 'users/' + userId;
  return callGet(fullUrl);
}

export { fetchUsers, fetchUser };
