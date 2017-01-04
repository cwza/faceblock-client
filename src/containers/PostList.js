import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { routerActions } from 'react-router-redux'

class PostList extends Component {
  handleDeletePost = (postId) => {
    this.props.deletePostStart(postId);
  }
  handlePostClick = (postId) => {
    this.props.routerPush('/post/' + postId);
  }
  renderPostList = (posts) => {
    return posts.map((post, i) => {
      return (
        <div key={i} >
          <Post post={post} handlePostClick={() => this.handlePostClick(post.id)} handleDeletePost={() => this.handleDeletePost(post.id)} />
        </div>
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
  posts: React.PropTypes.array,
  handleFetchOldPosts: React.PropTypes.func,
  handleFetchNewPosts: React.PropTypes.func,
  deletePostStart: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerPush: routerActions.push
})(PostList);
