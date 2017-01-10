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

const componentName = 'UserPostsPage';
class UserPostsPage extends Component {
  componentDidMount() {
    let { userId, posts } = this.props.params;
    // if(isEmpty(user))
    this.props.fetchUserStart(userId);
    if(isEmpty(posts))
      this.handleFetchNewPosts(userId, posts)
  }
  genQueryStr = (userId) => {
    let userName = utils.getMailUsername(this.props.user.mail);
    return `q=userId:(${userId}) and replyTo:(null) or #${userName}&sort=createTime&order=desc&limit=5`
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (userId, posts) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, componentName + '_' + userId);
  }
  handleFetchNewPosts = (userId, posts) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(userId), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + userId);
  }
  render() {
    let { posts, selfId, user } = this.props;
    let { userId } = this.props.params;
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
  return {
    posts: getPostsByRequestId(state, componentName + '_' + props.params.userId),
    selfId: getSelfId(state),
    user: getUserById(state, props.params.userId),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
  fetchUserStart: usersActions.fetchUserStart,
})(UserPostsPage);
