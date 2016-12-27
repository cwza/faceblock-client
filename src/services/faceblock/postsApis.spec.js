import { expect } from 'chai'
import { fetchPosts, createPost, deletePost } from './postsApis'

describe.skip('#fetchPosts()', () => {
  it('', () => {
    return fetchPosts('q=userId:1)&sort=createTime&order=desc&limit=5')
    .then(response => {
      console.log('res', response);
    }).catch(error => {
      console.log('err', error);
    });
  });
});

describe.skip('#createPost()', () => {
  it('', () => {
    let data = {userId: 'xx', content: 'new test post'};
    return createPost(data)
    .then(response => {
      console.log('res', response);
    }).catch(error => {
      console.log('err', error);
    });
  });
});

describe.skip('#deletePost()', () => {
  it('', () => {
    return deletePost(48)
    .then(response => {
      console.log('res', response);
    }).catch(error => {
      console.log('err', error);
    });
  });
});
