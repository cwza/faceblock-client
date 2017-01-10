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

const componentName = 'UserPostsPage';
class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    this.userRequestId = `${componentName}_${userId}_user`;
    this.postsRequestId = `${componentName}_${userId}_posts`;
    // if(isEmpty(user))
    this.props.fetchUserStart(userId, this.userRequestId);
  }
  componentDidUpdate() {
    let { posts, userFetchingStatus, postsFetchingStatus } = this.props;
    let { userId } = this.props.params;
    if(isEmpty(posts) && postsFetchingStatus === 0 && userFetchingStatus === 2) {
      this.handleFetchNewPosts(userId, posts)
    }
  }
  genQueryStr = (userId) => {
    let userName = utils.getMailUsername(this.props.user.mail);
    let q = encodeURIComponent(`userId:(${userId}) and replyTo:(null) or #${userName}`)
    return `q=${q}&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (userId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, this.postsRequestId);
  }
  handleFetchNewPosts = (userId, posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, this.postsRequestId);
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
  return {
    posts: getPostsByRequestId(state, `${componentName}_${userId}_posts`),
    selfId: getSelfId(state),
    user: getUserById(state, userId),
    userFetchingStatus: getFetchingStatus(state, `${componentName}_${userId}_user`),
    postsFetchingStatus: getFetchingStatus(state, `${componentName}_${userId}_posts`)
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
  fetchUserStart: usersActions.fetchUserStart,
})(UserPostsPage);
