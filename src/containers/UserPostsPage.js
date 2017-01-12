import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import { getSelfId } from '../selectors/usersSelectors'
import UserContainer from './UserContainer'
import { getUserById } from '../selectors/usersSelectors'
import * as utils from '../utils'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import otherActions from '../actions/otherActions'
import PostListContainer from './PostListContainer'

const componentName = 'UserPostsPage';
class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    this.props.fetchUserStart(userId, this.genFetchUserRequestId(userId));
  }
  componentDidUpdate() {
    let { addPostStatus, resetFetchingStatus } = this.props;
    let { userId } = this.props.params;
    // iff add post success returned, then fetch new
    if(addPostStatus === 2) {
      resetFetchingStatus(this.genFetchPostsRequestId(userId));
      this.props.resetFetchingStatus(this.genAddPostRequestId(userId));
    }
  }
  genFetchUserRequestId = (userId) => {
    return `${componentName}_${userId}_fetchUser`;
  }
  genAddPostRequestId = (userId) => {
    return `${componentName}_${userId}_addPost`;
  }
  genFetchPostsRequestId = (userId) => {
    return `${componentName}_${userId}_fetchPosts`;
  }
  genQueryStr = (userId) => {
    let userName = utils.getMailUsername(this.props.user.mail);
    let q = encodeURIComponent(`userId:(${userId}) and replyTo:(null) or #${userName}`)
    return `q=${q}&sort=createTime&order=desc&limit=5`;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values, this.genAddPostRequestId(this.props.params.userId));
  }
  renderPostListContainer = (userId) => {
    return (
      <PostListContainer
        queryStr={this.genQueryStr(userId)}
        fetchPostsRequestId={this.genFetchPostsRequestId(userId)}/>
    )
  }
  render() {
    let { selfId, user } = this.props;
    let { userId } = this.props.params;
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
        <UserContainer user={user} handleUserClick={() => {}}/>
        {(selfId.toString() === userId) && <AddPostForm onSubmit={this.handleAddPostSubmit} />}
        {this.renderPostListContainer(userId)}
      </div>
    )
  }
}

UserPostsPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let { userId } = props.params;
  let fetchUserRequestId = `${componentName}_${userId}_fetchUser`;
  let addPostRequestId = `${componentName}_${userId}_addPost`
  return {
    selfId: getSelfId(state),
    user: getUserById(state, userId),
    fetchUserStatus: getFetchingStatus(state, fetchUserRequestId),
    addPostStatus: getFetchingStatus(state, addPostRequestId),
  }
}

export default connect(mapStateToProps, {
  createPostStart: postsActions.createPostStart,
  fetchUserStart: usersActions.fetchUserStart,
  resetFetchingStatus: otherActions.resetFetchingStatus,
})(UserPostsPage);
