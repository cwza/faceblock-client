import { API_ROOT, callGet, callPost, callDelete } from './utilsApis'
import 'isomorphic-fetch'
import Promise from 'bluebird'


const fetchCommentsCount = (postId) => {
  const fullUrl = API_ROOT + 'posts/' + postId + '/comments/count';
  return callGet(fullUrl);
}

const fetchPosts = (queryStr) => {
  const fullUrl = API_ROOT + 'posts?' + queryStr;
  return callGet(fullUrl)
    // get Post comments Count
    .then(response => {
    let posts = response.entities.posts;
    return Promise.reduce(posts, (newPosts, post) => {
      return fetchCommentsCount(post.id).then(json => {
        newPosts.push({...post, commentCounts: json.count});
        return newPosts;
      })
    }, [])
    .then(newPosts => {
      response.entities.posts = newPosts;
      return response;
    })
  })
}

const createPost = (data) => {
  const fullUrl = API_ROOT + 'posts/';
  return callPost(fullUrl, data)
    .then(response => {
      let posts = response.entities.posts;
      response.entities.posts = posts.map(post => ({...post, commentCounts: 0}))
      return response;
    });
}

const deletePost = (postId) => {
  const fullUrl = API_ROOT + 'posts/' + postId;
  return callDelete(fullUrl, postId);
}

const fetchPost = (postId) => {
  const fullUrl = API_ROOT + 'posts/' + postId;
  return callGet(fullUrl)
    .then(response => {
    let posts = response.entities.posts;
    return Promise.reduce(posts, (newPosts, post) => {
      return fetchCommentsCount(post.id).then(json => {
        newPosts.push({...post, commentCounts: json.count});
        return newPosts;
      })
    }, [])
    .then(newPosts => {
      response.entities.posts = newPosts;
      return response;
    })
  })
}


export { fetchPosts, createPost, deletePost, fetchPost, fetchCommentsCount };
