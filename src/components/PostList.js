import React, { Component } from 'react'
import PostContainer from '../containers/PostContainer'

class PostList extends Component {
  handlePostClick = (postId) => {
    this.props.routerPush('/post/' + postId);
  }
  renderPostList = (posts) => {
    return posts.map((post, i) => {
      return (
          <PostContainer key={i} post={post} />
      )
    });
  }
  render() {
    let { posts, handleFetchNewPosts, handleFetchOldPosts } = this.props;
    return (
      <div>
        <h1>I am PostList Page.</h1>
        {handleFetchNewPosts && <button onClick={handleFetchNewPosts}>Load New</button>}
        {this.renderPostList(posts)}
        {handleFetchOldPosts && <button onClick={handleFetchOldPosts}>Load Old</button>}
      </div>
    )
  }
}

PostList.propTypes = {
  posts: React.PropTypes.array.isRequired,
  handleFetchOldPosts: React.PropTypes.func,
  handleFetchNewPosts: React.PropTypes.func,
}

export default PostList;
