import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostById, getIsFetching } from '../selectors/postsSelectors'
import { routerActions } from 'react-router-redux'
import CommentList from './CommentList'

class PostDetailPage extends Component {
  handleDeletePost = (postId) => {
    this.props.deletePostStart(postId);
    if(!this.props.isFetching)
      this.props.routerBack();
  }
  render() {
    let { post } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <Post post={post} handleDeletePost={() => this.handleDeletePost(post.id)}/>
        <CommentList postId={post.id}/>
      </div>
    )
  }
}

PostDetailPage.propTypes = {
  post: React.PropTypes.object,
  handleCloseModal: React.PropTypes.func,
  deletePostStart: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  routerBack: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.params.postId),
    isFetching: getIsFetching(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerBack: routerActions.goBack,
})(PostDetailPage);
