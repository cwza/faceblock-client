import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import * as postsSelectors from '../selectors/postsSelectors'
// import Post from '../components/Post'

let queryStr = 'q=userId:(1, 2)&sort=createTime&order=desc&limit=5';
// let queryParams = {userIds: [1], contentContains: '#cwz', sort: 'createTime', order: 'desc', limit: 5};
class HomePage extends Component {
  componentDidMount() {
    if(this.props.posts && this.props.posts.length === 0)
      this.props.fetchOldPostsStart();
  }
  render() {
    let { posts } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <button onClick={this.props.fetchNewPostsStart}>Load New</button>
        {posts.map((post, i) => <h1 key={i}>{JSON.stringify(post, null, 2)}</h1>)}
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
})(HomePage);
