import { expect } from 'chai'
import postsActions from './postsActions'
test('#fetchOldPostsStart()', () => {
  let queryStr = 'userId:(1)&sort=createTime';
  let loadOldPostsStart = postsActions.fetchOldPostsStart(queryStr)
  let expected = {
    type: 'FETCH_OLD_POSTS_START',
    payload: {queryStr}
  }
  console.log('loadOldPostsStart: ', loadOldPostsStart);
  expect(loadOldPostsStart).to.deep.equal(expected);
});
test('#fetchOldPostsSuccess()', () => {
  let response = 'I am response';
  let loadOldPostsSuccess = postsActions.fetchOldPostsSuccess(response)
  let expected = {
    type: 'FETCH_OLD_POSTS_SUCCESS',
    payload: {response}
  }
  console.log('loadOldPostsSuccess : ', loadOldPostsSuccess);
  expect(loadOldPostsSuccess).to.deep.equal(expected);
});
