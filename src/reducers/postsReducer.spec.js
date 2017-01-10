import { expect } from 'chai'
let { itemsReducer } = require('./postsReducer').private
import postsActions from '../actions/postsActions'

let postsFromApi = [
  {id: 1, userId: 1, content: 'aa'},
  {id: 2, userId: 1, content: 'bb'},
];
let apiResponse = {
  response: {
    entities: {
      posts: postsFromApi
    }
  }
}
let oriState = {
  items: {
    2: {id: 2, userId: 1, content: 'aa'},
    3: {id: 3, userId: 1, content: 'cc'},
  },
};
describe('#itemsReducer()', () => {
  it('should return merged posts', () => {
    let expectedNewState = {
      1: {id: 1, userId: 1, content: 'aa'},
      2: {id: 2, userId: 1, content: 'bb'},
      3: {id: 3, userId: 1, content: 'cc'},
    };
    let newState = itemsReducer(oriState.items, postsActions.fetchPostsSuccess(apiResponse.response));
    console.log('newState: ', newState);
    expect(newState).to.deep.equal(expectedNewState);
  });
});
