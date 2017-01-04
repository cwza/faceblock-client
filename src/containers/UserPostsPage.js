import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsForUserPostsPage } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'
import { getSelfId } from '../selectors/usersSelectors'

class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.props);
  }
  genQueryStr = (userId) => {
    return `q=userId:(${userId}) and replyTo:(null)&sort=createTime&order=desc&limit=5`
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = () => {
    let { userId } = this.props.params;
    this.props.fetchOldPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.props);
  }
  handleFetchNewPosts = () => {
    let { userId } = this.props.params;
    this.props.fetchNewPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.props);
  }
  render() {
    let { posts, selfId } = this.props;
    let { userId } = this.props.params;
    console.log('selfId: ', selfId, ' userId: ', userId);
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
        {(selfId.toString() === userId) && <AddPostForm onSubmit={this.handleAddPostSubmit} />}
        <PostList posts={posts}
          handleFetchOldPosts={this.handleFetchOldPosts}
          handleFetchNewPosts={this.handleFetchNewPosts} />
      </div>
    )
  }
}

UserPostsPage.propTypes = {
  posts: React.PropTypes.array.isRequired,
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsForUserPostsPage(state, props),
    selfId: getSelfId(state),
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  fetchNewPostsStart: postsActions.fetchNewPostsStart,
  createPostStart: postsActions.createPostStart,
})(UserPostsPage);
