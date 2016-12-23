import { expect } from 'chai'
import postsActions from './postsActions'
test('#fetchOldPostsStart()', () => {
  let queryStr = 'userId:(1)&sort=createTime';
  let fetchOldPostsStart = postsActions.fetchOldPostsStart(queryStr)
  let expected = {
    type: 'FETCH_OLD_POSTS_START',
    payload: {queryStr}
  }
  console.log('fetchOldPostsStart: ', fetchOldPostsStart);
  expect(fetchOldPostsStart).to.deep.equal(expected);
});
test('#fetchPostsSuccess()', () => {
  let response = 'I am response';
  let fetchPostsSuccess = postsActions.fetchPostsSuccess(response)
  let expected = {
    type: 'FETCH_POSTS_SUCCESS',
    payload: {response}
  }
  console.log('fetchPostsSuccess : ', fetchPostsSuccess);
  expect(fetchPostsSuccess).to.deep.equal(expected);
});
