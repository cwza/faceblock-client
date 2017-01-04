import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostsForHomePageByTime } from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from './PostList'

// TODO getQueryStr from compute, and add or #hashtag about self search
let queryStr = 'q=userId:(1,2,4) and replyTo:(null)&sort=createTime&order=desc&limit=5';
class HomePage extends Component {
  componentDidMount() {
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart(queryStr, getPostsForHomePageByTime, this.props);
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = () => {
    this.props.fetchOldPostsStart(queryStr, getPostsForHomePageByTime, this.props);
  }
  handleFetchNewPosts = () => {
    this.props.fetchNewPostsStart(queryStr, getPostsForHomePageByTime, this.props);
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={posts}
          handleFetchOldPosts={this.handleFetchOldPosts}
          handleFetchNewPosts={this.handleFetchNewPosts} />
      </div>
    )
  }
}

HomePage.propTypes = {
  posts: React.PropTypes.array,
  fetchOldPostsStart: React.PropTypes.func.isRequired,
  fetchNewPostsStart: React.PropTypes.func.isRequired,
  createPostStart: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsForHomePageByTime(state, props),
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  fetchNewPostsStart: postsActions.fetchNewPostsStart,
  createPostStart: postsActions.createPostStart,
})(HomePage);
