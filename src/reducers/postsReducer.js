import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize, arrayOf } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { post as postSchema } from '../schemas/faceblockSchemas'
import postsActions from '../actions/postsActions'

const normalizePosts = (posts) => {
  return normalize(posts, arrayOf(postSchema)).entities.posts;
}

const mergeFetchedPostsToState = (state, posts) => {
  return merge({}, state, normalizePosts(posts, postSchema));
}

const itemsReducer = (state = {}, action) => {
  if(action.payload.response.entities.posts)
    return mergeFetchedPostsToState(state, action.payload.response.entities.posts)
  return state;
}

const isFetchingReducer = (state = {}, action) => {
  switch(action.type) {
    case postsActions.fetchOldPostsStart().type:
    case postsActions.fetchNewPostsStart().type:
      return true;
    case postsActions.fetchPostsSuccess().type:
    case postsActions.fetchPostsError().type:
      return false;
    default:
      return state;
  }
}

const postsReducer = combineReducers({
  items: itemsReducer,
  isFetching: isFetchingReducer,
});


export default postsReducer;
if(process.env.NODE_ENV !== 'production') {
  module.exports = {itemsReducer, isFetchingReducer};
}
