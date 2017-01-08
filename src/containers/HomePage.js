import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostsForHomePageByTime } from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

// TODO getQueryStr from compute, and add or #hashtag about self search
class HomePage extends Component {
  componentDidMount() {
    // if(this.props.posts && this.props.posts.length === 0)
    this.handleFetchNewPosts(this.props.posts);
  }
  genQueryStr = () => {
    let queryStr = 'q=userId:(1,2,21) and replyTo:(null)&sort=createTime&order=desc&limit=5';
    return queryStr;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr);
  }
  handleFetchNewPosts = (posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr);
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(posts)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(posts)} />
      </div>
    )
  }
}

HomePage.propTypes = {
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsForHomePageByTime(state),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(HomePage);
