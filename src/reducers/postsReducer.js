import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize, arrayOf } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { post as postSchema } from '../schemas/faceblockSchemas'
import postsActions from '../actions/postsActions'
import otherActions from '../actions/otherActions'
import * as utils from '../utils'

const normalizePosts = (posts) => {
  return normalize(posts, arrayOf(postSchema)).entities.posts;
}

const mergeFetchedPostsToState = (state, posts) => {
  return merge({}, state, normalizePosts(posts, postSchema));
}

const itemsReducer = (state = {}, action) => {
  switch(action.type) {
    case postsActions.fetchPostsSuccess().type:
    case postsActions.createPostSuccess().type:
    case postsActions.fetchPostSuccess().type:
      if(action.payload.response.entities.posts) {
        return mergeFetchedPostsToState(state, action.payload.response.entities.posts)
      }
      return state;
    case postsActions.deletePostSuccess().type:
      return utils.deletePropertiesFromObject(state, [action.payload.toString()])
    default:
      return state;
  }
}

const isFetchingReducer = (state = false, action) => {
  switch(action.type) {
    case postsActions.createPostStart().type:
    case postsActions.deletePostStart().type:
    case postsActions.fetchOldPostsStart().type:
    case postsActions.fetchNewPostsStart().type:
    case postsActions.fetchPostStart().type:
      return true;
    case postsActions.deletePostSuccess().type:
    case postsActions.createPostSuccess().type:
    case postsActions.fetchPostsSuccess().type:
    case postsActions.fetchPostSuccess().type:
    case otherActions.setError().type:
      return false;
    default:
      return state;
  }
}

const postsReducer = combineReducers({
  items: itemsReducer,
  isFetching: isFetchingReducer
});


export default postsReducer;
// export {itemsReducer, isFetchingReducer}
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {itemsReducer, isFetchingReducer};
}
