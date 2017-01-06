import React, { Component } from 'react'
import PostContainer from './PostContainer'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
// import usersActions from '../actions/usersActions'
import { getPostById, getIsFetching as postsIsFetching } from '../selectors/postsSelectors'
import { routerActions } from 'react-router-redux'
import CommentList from './CommentList'
import { isEmpty } from 'lodash'

class PostDetailPage extends Component {
  componentDidMount() {
    let {post, fetchPostStart} = this.props;
    let { postId } = this.props.params;
    if(isEmpty(post))
      fetchPostStart(postId);
  }
  componentDidUpdate() {
  }
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
    if(!this.props.postsIsFetching)
      this.props.routerBack();
  }
  render() {
    let { post } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <PostContainer post={post}
          handleDeletePost={() => this.handleDeletePost(post)}
        />
        {!isEmpty(post) && <CommentList postId={post.id}/>}
      </div>
    )
  }
}

PostDetailPage.propTypes = {
};

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.params.postId),
    postsIsFetching: postsIsFetching(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerBack: routerActions.goBack,
  fetchPostStart: postsActions.fetchPostStart,
  // fetchUserStart: usersActions.fetchUserStart,
})(PostDetailPage);
