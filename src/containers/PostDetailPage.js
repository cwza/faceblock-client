import React, { Component } from 'react'
import PostContainer from './PostContainer'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
// import usersActions from '../actions/usersActions'
import { getPostById } from '../selectors/postsSelectors'
import CommentList from './CommentList'
import browserHistory from '../browserHistory'

class PostDetailPage extends Component {
  componentDidMount() {
    let { fetchPostStart } = this.props;
    let { postId } = this.props.params;
    // if(isEmpty(post))
    fetchPostStart(postId);
  }
  componentDidUpdate() {
  }
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
    browserHistory.goBack();
  }
  render() {
    let { post } = this.props;
    let { postId } = this.props.params;
    return (
      <div>
        <h1 hidden>I am PostDetailPage.</h1>
        <PostContainer post={post}
          handleDeletePost={() => this.handleDeletePost(post)}
          handlePostClick={() => {}}
        />
        {<CommentList postId={postId}/>}
      </div>
    )
  }
}

PostDetailPage.propTypes = {
};

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.params.postId),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  fetchPostStart: postsActions.fetchPostStart,
  // fetchUserStart: usersActions.fetchUserStart,
})(PostDetailPage);
