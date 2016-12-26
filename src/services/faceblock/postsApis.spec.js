import { expect } from 'chai'
import { fetchPosts } from './postsApis'

describe.skip('#fetchPosts()', () => {
  it('', () => {
    return fetchPosts('posts?q=userId:1)&sort=createTime&order=desc&limit=5')
    .then(response => {
      console.log('res', response);
    }).catch(error => {
      console.log('err', error);
    });
  });
});
