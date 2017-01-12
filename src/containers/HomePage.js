import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import AddPostForm from '../components/AddPostForm'
import { getSelfId, getSelfUser } from '../selectors/usersSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'
import * as utils from '../utils'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import UserContainer from './UserContainer'
import otherActions from '../actions/otherActions'
import PostListContainer from './PostListContainer'
import Loading from '../components/Loading'

const componentName = 'HomePage';
const addPostRequestId = `${componentName}_addPost`;
class HomePage extends Component {
  componentDidMount() {
  }
  componentDidUpdate() {
    let { addPostStatus, resetFetchingStatus, followingIds } = this.props
    // iff add post success returned, then fetch new
    if(addPostStatus === 2) {
      resetFetchingStatus(this.genFetchPostsRequestId(followingIds));
      resetFetchingStatus(addPostRequestId);
    }
  }
  genFetchPostsRequestId = (followingIds) => {
    return `${componentName}_fetchPosts_${followingIds}`;
  }
  genQueryStr = (selfId, followingIds) => {
    let userName = utils.getMailUsername(this.props.selfUser.mail);
    let userIds = [selfId, ...followingIds];
    let q = encodeURIComponent(`userId:(${userIds.join(',')}) and replyTo:(null) or #${userName}`);
    let queryStr = `q=${q}&sort=createTime&order=desc&limit=5`;
    return queryStr;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values, addPostRequestId);
  }
  renderPostListContainer = (fetchFollowingsStatus, selfId, followingIds) => {
    // only renderPostList while followings is already fetched
    if(fetchFollowingsStatus === 1)
      return <Loading />;
    if(fetchFollowingsStatus === 2) {
      return (
        <PostListContainer
          queryStr={this.genQueryStr(selfId, followingIds)}
          fetchPostsRequestId={this.genFetchPostsRequestId(followingIds)}/>
      )
    }
  }
  render() {
    let { selfId, followingIds, selfUser, fetchFollowingsStatus } = this.props;
    return (
      <div>
        <h1 hidden>I am Home Page.</h1>
        <UserContainer user={selfUser} handleUserClick={() => {}}/>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        {this.renderPostListContainer(fetchFollowingsStatus, selfId, followingIds)}
      </div>
    )
  }
}

HomePage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let selfId = getSelfId(state);
  let followingIds = getUserIdsByFollowerId(state)(selfId);
  return {
    selfId,
    followingIds,
    selfUser: getSelfUser(state),
    fetchFollowingsStatus: getFetchingStatus(state, `Private_followings`),
    addPostStatus: getFetchingStatus(state, addPostRequestId),
  }
}

export default connect(mapStateToProps, {
  createPostStart: postsActions.createPostStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
})(HomePage);
