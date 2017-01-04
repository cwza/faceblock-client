import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import postsActions from '../actions/postsActions'
import { routerActions } from 'react-router-redux'
import { getSelfId } from '../selectors/usersSelectors'

class PostContainer extends Component {
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
  }
  handlePostClick = (postId) => {
    this.props.routerPush('/post/' + postId);
  }
  render() {
    let { post, selfId } = this.props;
    return (
      <div>
        <h1>I am PostContainer Page.</h1>
        <Post post={post}
          handlePostClick={() => this.handlePostClick(post.id)}
          handleDeletePost={() => this.handleDeletePost(post)}
          canDelete={post.userId === selfId}
        />
      </div>
    )
  }
}

PostContainer.propTypes = {
  post: React.PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    selfId: getSelfId(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerPush: routerActions.push
})(PostContainer);
