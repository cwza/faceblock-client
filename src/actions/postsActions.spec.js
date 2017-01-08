import { expect } from 'chai'
import postsActions from './postsActions'
test('#fetchPostsStart()', () => {
  let queryStr = 'userId:(1)&sort=createTime';
  let fetchPostsStart = postsActions.fetchPostsStart(queryStr)
  let expected = {
    type: 'FETCH_POSTS_START',
    payload: queryStr
  }
  console.log('fetchPostsStart: ', fetchPostsStart);
  expect(fetchPostsStart).to.deep.equal(expected);
});
test('#fetchPostsSuccess()', () => {
  let response = 'I am response';
  let fetchPostsSuccess = postsActions.fetchPostsSuccess(response)
  let expected = {
    type: 'FETCH_POSTS_SUCCESS',
    payload: response
  }
  console.log('fetchPostsSuccess : ', fetchPostsSuccess);
  expect(fetchPostsSuccess).to.deep.equal(expected);
});
