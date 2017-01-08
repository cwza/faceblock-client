import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsForCommentList } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

class CommentList extends Component {
  componentDidMount() {
    let { postId, comments } = this.props;
    // if(this.props.comments && this.props.comments.length === 0)
    this.handleFetchNewPosts(postId, comments);
  }
  genQueryStr = () => {
    return `q=replyTo:(${this.props.postId})&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    values.replyTo = this.props.postId;
    this.props.createPostStart(values);
  }
  handleFetchNewPosts = (postId, posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(postId), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr);
  }
  handleFetchOldPosts = (postId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(postId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr);
  }
  render() {
    let { comments, postId } = this.props;
    return (
      <div>
        <h1>I am CommentList.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={comments} handleFetchOldPosts={() => this.handleFetchOldPosts(postId, comments)} />
      </div>
    )
  }
}

CommentList.propTypes = {
  postId: React.PropTypes.number,
};

const mapStateToProps = (state, props) => {
  return {
    comments: getPostsForCommentList(state)({postId: props.postId})
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(CommentList);
