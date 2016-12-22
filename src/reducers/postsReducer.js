import { merge } from 'lodash'
import { normalize, arrayOf } from 'normalizr';
import { handleActions } from 'redux-actions';
import { post as postSchema } from '../schemas/faceblockSchemas';

const normalizePosts = (posts) => {
  return normalize(posts, arrayOf(postSchema)).entities.posts;
}

const mergeFetchedPostsToState = (state, posts) => {
  return merge({}, state, normalizePosts(posts, postSchema));
}

const allPosts = (state, action) => {
  if(action.payload.response.entities.posts)
    return mergeFetchedPostsToState(state, action.payload.response.entities.posts);
  return state;
}

const postsReducer = handleActions({
  FETCH_OLD_POSTS_SUCCESS: (state, action) => allPosts(state, action),
}, {})

export default postsReducer;
