import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getSelfId, getSelfUser } from '../selectors/usersSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'
import * as utils from '../utils'
import { isEmpty } from 'lodash'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import UserContainer from './UserContainer'
import otherActions from '../actions/otherActions'

const componentName = 'HomePage';
class HomePage extends Component {
  componentDidMount() {
    this.fetchPostsRequestId = `${componentName}_fetchPosts_`;
    this.addPostRequestId = `${componentName}_addPost`;
  }
  componentDidUpdate() {
    let { posts, fetchFollowingsStatus, selfId, followingIds, fetchPostsStatus,
      addPostStatus, resetFetchingStatus } = this.props
    // this is first fetch when page be loaded, but it should check if followings is fetched or not
    // only fetch new posts when followings is already be fetched
    if(isEmpty(posts) && fetchPostsStatus === 0 && fetchFollowingsStatus === 2)
      this.handleFetchNewPosts(posts, selfId, followingIds);
    // iff add post success returned, then fetch new
    if(addPostStatus === 2) {
      this.handleFetchNewPosts(posts, selfId, followingIds);
      resetFetchingStatus(this.addPostRequestId);
    }
  }
  genQueryStr = (selfId, followingIds) => {
    let userName = utils.getMailUsername(this.props.selfUser.mail);
    let userIds = [selfId, ...followingIds];
    let q = encodeURIComponent(`userId:(${userIds.join(',')}) and replyTo:(null) or #${userName}`);
    let queryStr = `q=${q}&sort=createTime&order=desc&limit=5`;
    return queryStr;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values, this.addPostRequestId);
  }
  handleFetchOldPosts = (posts, selfId, followingIds) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, this.fetchPostsRequestId + followingIds);
  }
  handleFetchNewPosts = (posts, selfId, followingIds) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, this.fetchPostsRequestId + followingIds);
  }
  render() {
    let { posts, selfId, followingIds, selfUser } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <UserContainer user={selfUser} handleUserClick={() => {}}/>
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
  let selfId = getSelfId(state);
  let followingIds = getUserIdsByFollowerId(state)(selfId);
  let fetchPostsRequestId = `${componentName}_fetchPosts_`;
  let addPostRequestId = `${componentName}_addPost`;
  return {
    selfId,
    followingIds,
    posts: getPostsByRequestId(state, fetchPostsRequestId + followingIds),
    selfUser: getSelfUser(state),
    fetchFollowingsStatus: getFetchingStatus(state, `Private_followings`),
    fetchPostsStatus: getFetchingStatus(state, fetchPostsRequestId + followingIds),
    addPostStatus: getFetchingStatus(state, addPostRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
})(HomePage);
