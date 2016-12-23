import { merge } from 'lodash'
import { normalize, arrayOf } from 'normalizr'
import { handleActions } from 'redux-actions'
import { post as postSchema } from '../schemas/faceblockSchemas'
import postsActions from '../actions/postsActions'

const normalizePosts = (posts) => {
  return normalize(posts, arrayOf(postSchema)).entities.posts;
}

const mergeFetchedPostsToState = (state = {}, posts) => {
  return merge({}, state, normalizePosts(posts, postSchema));
}

const allPosts = (state = {}, action) => {
  if(action.payload.response.entities.posts) {
    return {
      items: mergeFetchedPostsToState(state.items, action.payload.response.entities.posts),
      isFetching: false,
    };
  }
  return state;
}

const postsReducer = handleActions({
  [postsActions.fetchOldPostsSuccess().type]: (state, action) => allPosts(state, action),
}, {})


export default postsReducer;
