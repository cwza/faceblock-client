import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getPostsForUserPostsPage } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'

class UserPostsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.propsf);
  }
  genQueryStr = (userId) => {
    return `q=userId:(${userId}) and replyTo:(null)&sort=createTime&order=desc&limit=5`
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = () => {
    let { userId } = this.props.params;
    this.props.fetchOldPostsStart(this.queryStr(userId), getPostsForUserPostsPage, this.props);
  }
  handleFetchNewPosts = () => {
    let { userId } = this.props.params;
    this.props.fetchNewPostsStart(this.queryStr(userId), getPostsForUserPostsPage, this.props);
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
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
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  fetchNewPostsStart: postsActions.fetchNewPostsStart,
  createPostStart: postsActions.createPostStart,
})(UserPostsPage);
