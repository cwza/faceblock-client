import React, { Component } from 'react'
// import { Link } from 'react-router'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'

class PostDetailPage extends Component {
  constructor(props) {
    super(props);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }
  handleDeletePost(postId) {
    this.props.deletePostStart(postId);
    this.props.handleCloseModal();
  }
  render() {
    let { post } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <Post post={post} handleDeletePost={() => this.handleDeletePost(post.id)}/>
      </div>
    )
  }
}

PostDetailPage.propTypes = {
  post: React.PropTypes.object,
  handleCloseModal: React.PropTypes.func,
  deletePostStart: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart
})(PostDetailPage);
