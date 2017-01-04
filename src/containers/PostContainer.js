import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import postsActions from '../actions/postsActions'
import { routerActions } from 'react-router-redux'
import { getSelfUser } from '../selectors/usersSelectors'

class PostContainer extends Component {
  handleDeletePost = (post, selfUser) => {
    this.props.deletePostStart(post.id);
  }
  handlePostClick = (postId) => {
    this.props.routerPush('/post/' + postId);
  }
  render() {
    let { post, selfUser } = this.props;
    return (
      <div>
        <h1>I am PostContainer Page.</h1>
        <Post post={post}
          handlePostClick={() => this.handlePostClick(post.id)}
          handleDeletePost={() => this.handleDeletePost(post, selfUser)}
          canDelete={post.userId === selfUser.id}
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
    selfUser: getSelfUser(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerPush: routerActions.push
})(PostContainer);
