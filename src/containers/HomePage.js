import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import * as postsSelectors from '../selectors/postsSelectors'
import Post from '../components/Post'
import AddPostForm from '../components/AddPostForm'

let queryStr = 'q=userId:(1, 2)&sort=createTime&order=desc&limit=5';
// let queryParams = {userIds: [1], contentContains: '#cwz', sort: 'createTime', order: 'desc', limit: 5};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart();
  }
  handleSubmit(values) {
    // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    this.props.createPostStart(values);
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleSubmit}/>
        <button onClick={this.props.fetchNewPostsStart}>Load New</button>
        {posts.map((post, i) => <Post key={i} i={i} post={post} />)}
        <button onClick={this.props.fetchOldPostsStart}>Load Old</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: postsSelectors.getPostsForHomePageByTime(state),
  }
}

export default connect(mapStateToProps, {
  fetchOldPostsStart: () => postsActions.fetchOldPostsStart(queryStr, postsSelectors.getPostsForHomePageByTime),
  fetchNewPostsStart: () => postsActions.fetchNewPostsStart(queryStr, postsSelectors.getPostsForHomePageByTime),
  createPostStart: postsActions.createPostStart,
})(HomePage);
