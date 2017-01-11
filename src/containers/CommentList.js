import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { isEmpty } from 'lodash'
import otherActions from '../actions/otherActions'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'

const componentName = 'CommentList'
class CommentList extends Component {
  componentDidMount() {
    let { postId, comments } = this.props;
    this.fetchCommentsRequestId = `${componentName}_${postId}_fetchComments`;
    this.addCommentRequestId = `${componentName}_${postId}_addComment`;
    if(isEmpty(comments))
      this.handleFetchNewPosts(postId, comments);
  }
  componentDidUpdate() {
    let { postId, comments, addCommentStatus } = this.props;
    // iff add post success returned, then fetch new
    if(addCommentStatus === 2) {
      this.handleFetchNewPosts(postId, comments);
      this.props.resetFetchingStatus(this.addCommentRequestId);
    }
  }
  genQueryStr = () => {
    return `q=replyTo:(${this.props.postId})&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    values.replyTo = this.props.postId;
    this.props.createPostStart(values, this.addCommentRequestId);
  }
  handleFetchNewPosts = (postId, posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(postId), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, this.fetchCommentsRequestId);
  }
  handleFetchOldPosts = (postId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(postId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, this.fetchCommentsRequestId);
  }
  render() {
    let { comments, postId } = this.props;
    return (
      <div>
        <h1>I am CommentList.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={comments}
          handleFetchOldPosts={() => this.handleFetchOldPosts(postId, comments)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(postId, comments)} />
      </div>
    )
  }
}

CommentList.propTypes = {
  postId: React.PropTypes.number,
};

const mapStateToProps = (state, props) => {
  let { postId } = props;
  let fetchCommentsRequestId = `${componentName}_${postId}_fetchComments`;
  let addCommentRequestId = `${componentName}_${postId}_addComment`;
  return {
    comments: getPostsByRequestId(state, fetchCommentsRequestId),
    addCommentStatus: getFetchingStatus(state, addCommentRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
})(CommentList);
