import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import postsActions from '../actions/postsActions'
import { getSelfId, getUserById } from '../selectors/usersSelectors'
import browserHistory from '../browserHistory'

class PostContainer extends Component {
  componentDidMount() {
  }
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
  }
  handlePostClick = (postId) => {
    browserHistory.push('/post/' + postId);
  }
  render() {
    let { post, selfId, author } = this.props;
    let handlePostClick = this.props.handlePostClick ? this.props.handlePostClick : () => this.handlePostClick(post.id);
    let handleDeletePost = this.props.handleDeletePost ? this.props.handleDeletePost : () => this.handleDeletePost(post);
    return (
      <div>
        <h1 hidden>I am PostContainer Page.</h1>
        <Post post={post} author={author}
          handlePostClick={handlePostClick}
          handleDeletePost={handleDeletePost}
          canDelete={post.userId === selfId}
        />
      </div>
    )
  }
}

PostContainer.propTypes = {
  post: React.PropTypes.object.isRequired,
  handlePostClick: React.PropTypes.func,
  handleDeletePost: React.PropTypes.func,
}

const mapStateToProps = (state, props) => {
  return {
    selfId: getSelfId(state),
    author: getUserById(state, props.post.userId),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  // fetchUserStart: usersActions.fetchUserStart,
})(PostContainer);
