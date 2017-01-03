import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { routerActions } from 'react-router-redux'

class PostList extends Component {
  constructor(props) {
    super(props);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.state = {
      showModal: false,
      modalPost: {},
    };
  }
  componentDidMount() {
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart();
  }
  handleDeletePost(postId) {
    this.props.deletePostStart(postId);
  }
  handlePostClick(postId) {
    this.props.routerPush('/post/' + postId);
  }
  renderPostList(posts) {
    return posts.map((post, i) => {
      return (
        <div key={i} >
          <Post post={post} handlePostClick={() => this.handlePostClick(post.id)} handleDeletePost={() => this.handleDeletePost(post.id)} />
        </div>
      )
    });
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am PostList Page.</h1>
        <button onClick={this.props.fetchNewPostsStart}>Load New</button>
        {this.renderPostList(posts)}
        <button onClick={this.props.fetchOldPostsStart}>Load Old</button>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: React.PropTypes.array,
  fetchOldPostsStart: React.PropTypes.func,
  fetchNewPostsStart: React.PropTypes.func,
  deletePostStart: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerPush: routerActions.push
})(PostList);
