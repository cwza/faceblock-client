import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { memoize } from 'lodash'
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

const getPostsForCommentList = createSelector(
  [getAllPosts],
  (posts=[]) => memoize(
    ({postId}) => {
      console.log('props.postId: ', postId);
      let result = posts.filter(post => post.replyTo === postId)
        .slice(0).sort((a, b) => b.createTime - a.createTime || b.id - a.id);
      return result;
    }
  )
)

const getPostsByRequestId = createSelector(
  [getPostsItems, getOrder],
  (postsItems={}, order) => {
    let result = order.map(postId => {
      if(postsItems[postId.toString()])
        return postsItems[postId.toString()]
      return {}
    })
    return result;
  }
)

export {
  getAllPosts, getPostById, getIsFetching, getPostsForCommentList,
  getPostsByRequestId
};
