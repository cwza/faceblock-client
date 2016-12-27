import React, { Component } from 'react'
import Post from '../components/Post'
import ReactModal from 'react-modal';
import PostDetailPage from './PostDetailPage'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.state = {
      showModal: false,
      modalPost: {},
    };
  }
  componentWillMount() {
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart();
  }
  handleOpenModal (modalPost) {
    this.setState({ showModal: true, modalPost });
  }
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  handleDeletePost(postId) {
    this.props.deletePostStart(postId);
  }
  renderPostList(posts) {
    return posts.map((post, i) => {
      return (
        <div key={i} >
          <Post post={post} onClick={() => this.handleOpenModal(post)} handleDeletePost={() => this.handleDeletePost(post.id)} />
        </div>
      )
    });
  }
  renderModal() {
    return (
      <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           onRequestClose={this.handleCloseModal}
      >
        <PostDetailPage post={this.state.modalPost} handleCloseModal={() => this.handleCloseModal()}/>
      </ReactModal>
    )
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am PostList Page.</h1>
        <button onClick={this.props.fetchNewPostsStart}>Load New</button>
        {this.renderPostList(posts)}
        {this.renderModal()}
        <button onClick={this.props.fetchOldPostsStart}>Load Old</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart
})(PostList);
