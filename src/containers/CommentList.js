import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsForCommentList } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'

class CommentList extends Component {
  componentDidMount() {
    let { postId } = this.props;
    if(this.props.comments && this.props.comments.length === 0)
      this.props.fetchOldPostsStart(this.genQueryStr(), getPostsForCommentList, {postId});
  }
  genQueryStr = () => {
    return `q=replyTo:(${this.props.postId})&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    values.replyTo = this.props.postId;
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (postId) => {
    this.props.fetchOldPostsStart(this.genQueryStr(postId), getPostsForCommentList, {postId});
  }
  render() {
    let { comments, postId } = this.props;
    return (
      <div>
        <h1>I am CommentList.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={comments} handleFetchOldPosts={() => this.handleFetchOldPosts(postId)} />
      </div>
    )
  }
}

CommentList.propTypes = {
  postId: React.PropTypes.number,
};

const mapStateToProps = (state, props) => {
  return {
    comments: getPostsForCommentList(state, {postId: props.postId})
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  createPostStart: postsActions.createPostStart,
})(CommentList);
