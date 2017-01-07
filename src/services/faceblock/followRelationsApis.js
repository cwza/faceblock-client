import { API_ROOT, callGet, callPost, callDelete } from './utilsApis'
import 'isomorphic-fetch'


const fetchFollowRelations = (queryStr) => {
  const fullUrl = API_ROOT + 'followRelations?' + queryStr;
  return callGet(fullUrl);
}

const createFollowRelation = (data) => {
  const fullUrl = API_ROOT + 'followRelations/';
  return callPost(fullUrl, data);
}

const deleteFollowRelation = (postId) => {
  const fullUrl = API_ROOT + 'followRelations/' + postId;
  return callDelete(fullUrl);
}

const fetchFollowRelation = (postId) => {
  const fullUrl = API_ROOT + 'followRelations/' + postId;
  return callGet(fullUrl)
}

export { fetchFollowRelations, createFollowRelation, deleteFollowRelation, fetchFollowRelation };
