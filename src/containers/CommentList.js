import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from './PostList'
import { getPostsForCommentList } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.genQueryStr = this.genQueryStr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  genQueryStr() {
    return `q=replyTo:(${this.props.postId})&sort=createTime&order=desc&limit=5`;
  }
  handleSubmit(values) {
    values.replyTo = this.props.postId;
    this.props.createPostStart(values);
  }
  render() {
    let { comments, fetchOldPostsStart } = this.props;
    return (
      <div>
        <h1>I am CommentList.</h1>
        <AddPostForm onSubmit={this.handleSubmit} />
        <PostList posts={comments} fetchOldPostsStart={() => fetchOldPostsStart(this.genQueryStr(), getPostsForCommentList, this.props)} />
      </div>
    )
  }
}

CommentList.propTypes = {
  postId: React.PropTypes.number.isRequired,
  comments: React.PropTypes.array,
  fetchOldPostsStart: React.PropTypes.func.isRequired,
  createPostStart: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    comments: getPostsForCommentList(state, props)
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  createPostStart: postsActions.createPostStart,
})(CommentList);
