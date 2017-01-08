import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { getFriendsIds, getSelfId } from './usersSelectors'
import { getSearchKeyword } from './formSelectors'
import { memoize } from 'lodash'

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

//TODO: if post.content contains hashtag about self name, they should be get too
const getPostsForHomePageByTime = createSelector(
  [getAllPosts, getFriendsIds, getSelfId],
  (posts=[], friendsIds=[], selfId={}) => {
    let userIds = [...friendsIds, selfId];
    let result = posts.filter(post => userIds.includes(post.userId))
      .filter(post => post.replyTo === null)
      .slice(0).sort((a, b) => b.createTime - a.createTime || b.id - a.id);
    // console.log('getPostsForHomePageByTime: ', result);
    return result;
  }
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

//TODO: if post.content contains hashtag about self name, they should be get too
const getPostsForUserPostsPage = createSelector(
  [getAllPosts],
  (posts=[]) => memoize (
    ({userId}) => {
      console.log('props.params.userId: ', userId);
      let result = posts.filter(post => post.userId.toString() === userId)
        .filter(post => post.replyTo === null)
        .slice(0).sort((a, b) => b.createTime - a.createTime || b.id - a.id);
      return result;
    }
  )
)

const getPostsForSearchPostPage = createSelector(
  [getAllPosts, getSearchKeyword],
  (posts=[], searchKeyword) => {
    console.log('searchKeyword: ', searchKeyword);
    let result = posts.filter(post => searchKeyword && post.content.includes(searchKeyword))
      .slice(0).sort((a, b) => b.createTime - a.createTime || b.id - a.id);
    return result;
  }
)

export {
  getPostsForHomePageByTime, getAllPosts, getPostById, getIsFetching, getPostsForCommentList,
  getPostsForUserPostsPage, getPostsForSearchPostPage
};
