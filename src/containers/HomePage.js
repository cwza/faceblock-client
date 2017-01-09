import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getSelfId } from '../selectors/usersSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'

const componentName = 'HomePage';
class HomePage extends Component {
  componentDidMount() {
    // if(this.props.posts && this.props.posts.length === 0)
    this.handleFetchNewPosts(this.props.posts, this.props.selfId, this.props.followingIds);
  }
  genQueryStr = (selfId, followingIds) => {
    let userIds = [selfId, ...followingIds];
    let queryStr = `q=userId:(${userIds.join(',')}) and replyTo:(null)&sort=createTime&order=desc&limit=5`;
    return queryStr;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (posts, selfId, followingIds) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, componentName + '_' + followingIds);
  }
  handleFetchNewPosts = (posts, selfId, followingIds) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + followingIds);
  }
  render() {
    let { posts, selfId, followingIds } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(posts, selfId, followingIds)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(posts, selfId, followingIds)} />
      </div>
    )
  }
}

HomePage.propTypes = {
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsByRequestId(state, componentName + '_' + getUserIdsByFollowerId(state)({followerId: getSelfId(state)})),
    selfId: getSelfId(state),
    followingIds: getUserIdsByFollowerId(state)({followerId: getSelfId(state)}),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(HomePage);
