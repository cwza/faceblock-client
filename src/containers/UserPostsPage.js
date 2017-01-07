import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsForUserPostsPage } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import { getSelfId } from '../selectors/usersSelectors'
import UserContainer from './UserContainer'
import { getUserById } from '../selectors/usersSelectors'
// import { isEmpty } from 'lodash'

class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    // if(this.props.posts && this.props.posts.length === 0)
    this.props.fetchNewPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, {userId});
    // if(isEmpty(user))
    this.props.fetchUserStart(userId);
  }
  genQueryStr = (userId) => {
    return `q=userId:(${userId}) and replyTo:(null)&sort=createTime&order=desc&limit=5`
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (userId) => {
    this.props.fetchOldPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, {userId});
  }
  handleFetchNewPosts = (userId) => {
    this.props.fetchNewPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, {userId});
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
          handleFetchOldPosts={() => this.handleFetchOldPosts(userId)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(userId)} />
      </div>
    )
  }
}

UserPostsPage.propTypes = {
  posts: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsForUserPostsPage(state, {userId: props.params.userId}),
    selfId: getSelfId(state),
    user: getUserById(state, props.params.userId),
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  fetchNewPostsStart: postsActions.fetchNewPostsStart,
  createPostStart: postsActions.createPostStart,
  fetchUserStart: usersActions.fetchUserStart,
})(UserPostsPage);
