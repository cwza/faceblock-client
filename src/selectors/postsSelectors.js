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

const getIsFetching = createSelector(
  [getPostsObject],
  (postsObject={}) => {
    if(postsObject.isFetching) return postsObject.isFetching;
    return false;
  }
)

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
    let result = order.map(postId => {
      if(postsItems[postId.toString()])
        return postsItems[postId.toString()]
      return {}
    })
    console.log('result: ', result);
    return result;
  }
)

export {
  getAllPosts, getPostById, getIsFetching,
  getPostsByRequestId
};
