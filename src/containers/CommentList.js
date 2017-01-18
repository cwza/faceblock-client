import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import postsActions from '../actions/postsActions'
import otherActions from '../actions/otherActions'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import PostListContainer from './PostListContainer'
import { reset as resetForm } from 'redux-form';

const componentName = 'CommentList'
class CommentList extends Component {
  componentDidMount() {
  }
  componentDidUpdate() {
    let { postId, addPostStatus, resetFetchingStatus } = this.props;
    // iff add post success returned, then fetch new
    if(addPostStatus === 2) {
      resetFetchingStatus(this.genFetchPostsRequestId(postId));
      this.props.resetFetchingStatus(this.genAddPostRequestId(postId));
    }
  }
  genAddPostRequestId = (postId) => {
    return `${componentName}_${postId}_addPost`;
  }
  genFetchPostsRequestId = (postId) => {
    return `${componentName}_${postId}_fetchPosts`;
  }
  genQueryStr = () => {
    return `q=replyTo:(${this.props.postId})&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    values.replyTo = this.props.postId;
    this.props.createPostStart(values, this.genAddPostRequestId(this.props.postId));
    this.props.resetForm('AddPost');
  }
  renderPostListContainer = (postId) => {
    return (
      <PostListContainer
        queryStr={this.genQueryStr(postId)}
        fetchPostsRequestId={this.genFetchPostsRequestId(postId)}/>
    )
  }
  render() {
    let { postId } = this.props;
    return (
      <div>
        <h1 hidden>I am CommentList.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        {this.renderPostListContainer(postId)}
      </div>
    )
  }
}

CommentList.propTypes = {
  postId: React.PropTypes.number,
};

const mapStateToProps = (state, props) => {
  let { postId } = props;
  let addPostRequestId = `${componentName}_${postId}_addPost`;
  return {
    addPostStatus: getFetchingStatus(state, addPostRequestId),
  }
}

export default connect(mapStateToProps, {
  createPostStart: postsActions.createPostStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
  resetForm: resetForm,
})(CommentList);
