import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

const componentName = 'CommentList'
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
    this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + postId);
  }
  handleFetchOldPosts = (postId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(postId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, componentName + '_' + postId);
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
  return {
    comments: getPostsByRequestId(state, componentName + '_' + props.postId)
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(CommentList);
