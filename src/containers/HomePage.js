import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import * as postsSelectors from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'

let queryStr = 'q=userId:(1, 2)&sort=createTime&order=desc&limit=5';
// let queryParams = {userIds: [1], contentContains: '#cwz', sort: 'createTime', order: 'desc', limit: 5};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.props.createPostStart(values);
  }
  render() {
    let { posts, fetchOldPostsStart, fetchNewPostsStart } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleSubmit} />
        <PostList posts={posts} fetchOldPostsStart={fetchOldPostsStart} fetchNewPostsStart={fetchNewPostsStart} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: postsSelectors.getPostsForHomePageByTime(state),
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: () => postsActions.fetchOldPostsStart(queryStr, postsSelectors.getPostsForHomePageByTime),
  fetchNewPostsStart: () => postsActions.fetchNewPostsStart(queryStr, postsSelectors.getPostsForHomePageByTime),
  createPostStart: postsActions.createPostStart,
})(HomePage);
