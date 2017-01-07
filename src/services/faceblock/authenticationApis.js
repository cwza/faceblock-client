import { API_ROOT, callPost } from './utilsApis'
import 'isomorphic-fetch'

const login = (socialSite, socialToken) => {
  const fullUrl = API_ROOT + 'login';
  const data = {socialSite, socialToken};
  return callPost(fullUrl, data);
}

export { login };
