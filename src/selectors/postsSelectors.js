import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { getOrder } from './requestInfoSelectors'

const getPostById = (state, postId) => {
  if(state.apis.faceblock.entities && state.apis.faceblock.entities.posts
    && state.apis.faceblock.entities.posts.items && state.apis.faceblock.entities.posts.items[postId])
    return state.apis.faceblock.entities.posts.items[postId];
  return {};
}

const getPostsObject = createSelector(
  [getFaceblockEntities],
  (entities={}) => {
    if(entities.posts) return entities.posts;
    return {};
  }
);

const getPostsItems = createSelector(
  [getPostsObject],
  (postsObject={}) => {
    if(postsObject.items) return postsObject.items;
    return {};
  }
);
const getAllPosts = createSelector(
  [getPostsItems],
  (postsItems={}) => Object.values(postsItems)
);

const getPostsByRequestId = createSelector(
  [getPostsItems, getOrder],
  (postsItems={}, order) => {
    let result = order.reduce((result, postId) => {
      if(postsItems[postId.toString()])
        result.push(postsItems[postId.toString()])
      return result;
    },[])
    console.log('result: ', result);
    return result;
  }
)

export {
  getAllPosts, getPostById,
  getPostsByRequestId
};
