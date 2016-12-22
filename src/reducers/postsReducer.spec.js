import { expect } from 'chai'
import postsReducer from './postsReducer'
import postsActions from '../actions/postsActions'

test('#postsReducer()', () => {
  let postsFromApi = [
    {id: 1, userId: 1, content: 'aa'},
    {id: 2, userId: 1, content: 'bb'},
  ];
  let oriState = {
    2: {id: 2, userId: 1, content: 'aa'},
    3: {id: 3, userId: 1, content: 'cc'},
  };
  let expectedNewState = {
    1: {id: 1, userId: 1, content: 'aa'},
    2: {id: 2, userId: 1, content: 'bb'},
    3: {id: 3, userId: 1, content: 'cc'},
  };
  let apiResponse = {
    entities: {
      posts: postsFromApi
    }
  }
  let newState = postsReducer(oriState, postsActions.fetchOldPostsSuccess(apiResponse));
  console.log('newState: ', newState);
  expect(newState).to.deep.equal(expectedNewState);
});
