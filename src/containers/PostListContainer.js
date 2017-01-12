import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostList from '../components/PostList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import postsActions from '../actions/postsActions'
import Loading from '../components/Loading'

class PostListContainer extends Component {
  componentDidMount() {
    let { posts, fetchPostsStatus, queryStr, fetchPostsRequestId } = this.props;
    if(fetchPostsStatus === 0)
      this.handleFetchNewPosts(queryStr, posts, fetchPostsRequestId);
  }
  componentDidUpdate() {
    let { posts, fetchPostsStatus, queryStr, fetchPostsRequestId } = this.props;
    if(fetchPostsStatus === 0)
      this.handleFetchNewPosts(queryStr, posts, fetchPostsRequestId);
  }
  handleFetchOldPosts = (queryStr, posts, fetchPostsRequestId) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(queryStr, posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, fetchPostsRequestId);
  }
  handleFetchNewPosts = (queryStr, posts, fetchPostsRequestId) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(queryStr, posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, fetchPostsRequestId);
  }
  render() {
    let { posts, queryStr, fetchPostsRequestId, fetchPostsStatus } = this.props;
    return (
      <div>
        <h1 hidden>I am PostListContainer.</h1>
        {fetchPostsStatus === 1 && <Loading />}
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(queryStr, posts, fetchPostsRequestId)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(queryStr, posts, fetchPostsRequestId)} />
      </div>
    )
  }
}

PostListContainer.propTypes = {
  queryStr: React.PropTypes.string.isRequired,
  fetchPostsRequestId: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  let { fetchPostsRequestId } = props;
  return {
    posts: getPostsByRequestId(state, fetchPostsRequestId),
    fetchPostsStatus: getFetchingStatus(state, fetchPostsRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
})(PostListContainer);
