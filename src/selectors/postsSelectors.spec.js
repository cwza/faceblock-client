import * as postsSelectors from './postsSelectors'
import {postsItems, usersItems} from '../mockDatas/data'

describe('#getPostsForHomePageByTime()', () => {
  it('', () => {
    let posts = { items: postsItems, isFetching: false };
    let users = { items: usersItems, isFetching: false };
    let state = {apis: {faceblock: {entities: {posts, users}}}};
    let result = postsSelectors.getPostsForHomePageByTime(state);
    console.log('result: ', result);
  });
});
