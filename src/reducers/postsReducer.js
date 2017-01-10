import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { normalize } from 'normalizr'
// import { handleActions } from 'redux-actions'
import { postListSchema } from '../schemas/faceblockSchemas'
import postsActions from '../actions/postsActions'
import * as utils from '../utils'

const normalizePosts = (posts) => {
  return normalize(posts, postListSchema).entities.posts;
}

const mergeFetchedPostsToState = (state, posts) => {
  return merge({}, state, normalizePosts(posts));
}

const itemsReducer = (state = {}, action) => {
  switch(action.type) {
    case postsActions.fetchPostsSuccess().type:
    case postsActions.createPostSuccess().type:
    case postsActions.fetchPostSuccess().type:
      console.log('action: ', action);
      if(action.payload.response.entities.posts) {
        return mergeFetchedPostsToState(state, action.payload.response.entities.posts)
      }
      return state;
    case postsActions.deletePostSuccess().type:
      return utils.deletePropertiesFromObject(state, [action.payload.id.toString()])
    default:
      return state;
  }
}

const postsReducer = combineReducers({
  items: itemsReducer,
});


export default postsReducer;
// export {itemsReducer, isFetchingReducer}
if(process.env.NODE_ENV !== 'production') {
  module.exports.private = {itemsReducer};
}
