import { expect } from 'chai'
import postsActions from './postsActions'
test('#fetchPostsStart()', () => {
  let queryStr = 'userId:(1)&sort=createTime';
  let requestId = 'test'
  let fetchPostsStart = postsActions.fetchPostsStart(queryStr, requestId)
  let expected = {
    type: 'FETCH_POSTS_START',
    payload: {queryStr, requestId}
  }
  console.log('fetchPostsStart: ', fetchPostsStart);
  expect(fetchPostsStart).to.deep.equal(expected);
});
test('#fetchPostsSuccess()', () => {
  let response = 'I am response';
  let queryStr = 'userId:(1)&sort=createTime';
  let requestId = 'test'
  let fetchPostsSuccess = postsActions.fetchPostsSuccess(response, queryStr, requestId)
  let expected = {
    type: 'FETCH_POSTS_SUCCESS',
    payload: {response, queryStr, requestId}
  }
  console.log('fetchPostsSuccess : ', fetchPostsSuccess);
  expect(fetchPostsSuccess).to.deep.equal(expected);
});
