import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import { getSelfId } from '../selectors/usersSelectors'
import UserContainer from './UserContainer'
import { getUserById } from '../selectors/usersSelectors'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import * as utils from '../utils'
import { isEmpty } from 'lodash'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import Loading from '../components/Loading'
import otherActions from '../actions/otherActions'

const componentName = 'UserPostsPage';
class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    this.fetchUserRequestId = `${componentName}_${userId}_fetchUser`;
    this.fetchPostsRequestId = `${componentName}_${userId}_fetchPosts`;
    this.addPostRequestId = `${componentName}_${userId}_addPosts`
    // if(isEmpty(user))
    this.props.fetchUserStart(userId, this.fetchUserRequestId);
  }
  componentDidUpdate() {
    let { posts, userFetchingStatus, postsFetchingStatus, addPostStatus } = this.props;
    let { userId } = this.props.params;
    // this is first fetch when page be loaded, but it should check if user is fetched or not
    // only fetch new posts when user is already be fetched
    if(isEmpty(posts) && postsFetchingStatus === 0 && userFetchingStatus === 2) {
      this.handleFetchNewPosts(userId, posts)
    }
    // iff add post success returned, then fetch new
    if(addPostStatus === 2) {
      this.handleFetchNewPosts(userId, posts);
      this.props.resetFetchingStatus(this.addPostRequestId);
    }
  }
  genQueryStr = (userId) => {
    let userName = utils.getMailUsername(this.props.user.mail);
    let q = encodeURIComponent(`userId:(${userId}) and replyTo:(null) or #${userName}`)
    return `q=${q}&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values, this.addPostRequestId);
  }
  handleFetchOldPosts = (userId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, this.fetchPostsRequestId);
  }
  handleFetchNewPosts = (userId, posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, this.fetchPostsRequestId);
  }
  render() {
    let { posts, selfId, user, userFetchingStatus } = this.props;
    let { userId } = this.props.params;
    if(isEmpty(user) && userFetchingStatus !== 2)
      return <Loading />
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
        <UserContainer user={user} handleUserClick={() => {}}/>
        {(selfId.toString() === userId) && <AddPostForm onSubmit={this.handleAddPostSubmit} />}
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(userId, posts)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(userId, posts)} />
      </div>
    )
  }
}

UserPostsPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let { userId } = props.params;
  let fetchUserRequestId = `${componentName}_${userId}_fetchUser`;
  let fetchPostsRequestId = `${componentName}_${userId}_fetchPosts`;
  let addPostRequestId = `${componentName}_${userId}_addPosts`
  return {
    posts: getPostsByRequestId(state, fetchPostsRequestId),
    selfId: getSelfId(state),
    user: getUserById(state, userId),
    userFetchingStatus: getFetchingStatus(state, fetchUserRequestId),
    postsFetchingStatus: getFetchingStatus(state, fetchPostsRequestId),
    addPostStatus: getFetchingStatus(state, addPostRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
  fetchUserStart: usersActions.fetchUserStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
})(UserPostsPage);
