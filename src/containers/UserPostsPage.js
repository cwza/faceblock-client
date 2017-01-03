import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostForm from '../components/AddPostForm'
import PostList from './PostList'
import { getPostsForUserPostsPage } from '../selectors/postsSelectors'
import postsActions from '../actions/postsActions'

class UserPostsPage extends Component {
  constructor(props) {
    super(props);
    this.genQueryStr = this.genQueryStr.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  genQueryStr(userId) {
    return `q=userId:(${userId}) and replyTo:(null)&sort=createTime&order=desc&limit=5`
  }
  handleSubmit(values) {
    this.props.createPostStart(values);
  }
  render() {
    let { posts, fetchOldPostsStart, fetchNewPostsStart } = this.props;
    let { userId } = this.props.params;
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
        <AddPostForm onSubmit={this.handleSubmit} />
        <PostList posts={posts}
          fetchOldPostsStart={() => fetchOldPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.props)}
          fetchNewPostsStart={() => fetchNewPostsStart(this.genQueryStr(userId), getPostsForUserPostsPage, this.props)} />
      </div>
    )
  }
}

UserPostsPage.propTypes = {
  posts: React.PropTypes.array,
  fetchOldPostsStart: React.PropTypes.func.isRequired,
  fetchNewPostsStart: React.PropTypes.func.isRequired,
  createPostStart: React.PropTypes.func.isRequired,
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
