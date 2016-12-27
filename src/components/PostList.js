import React, { Component } from 'react'
import Post from '../components/Post'
import ReactModal from 'react-modal';
import PostDetailPage from '../containers/PostDetailPage'

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
  renderPostList(posts) {
    return posts.map((post, i) => {
      return (
        <div key={i} onClick={() => this.handleOpenModal(post)}>
          <Post post={post} />
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
        <PostDetailPage post={this.state.modalPost}/>
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

export default PostList;
