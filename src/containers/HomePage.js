import React, { Component } from 'react'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import AddPostForm from '../components/AddPostForm'
import PostList from '../components/PostList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getSelfId, getSelfUser } from '../selectors/usersSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'
import * as utils from '../utils'
import { isEmpty } from 'lodash'

const componentName = 'HomePage';
class HomePage extends Component {
  componentDidMount() {
    if(isEmpty(this.props.posts))
      this.handleFetchNewPosts(this.props.posts, this.props.selfId, this.props.followingIds);
  }
  genQueryStr = (selfId, followingIds) => {
    let userName = utils.getMailUsername(this.props.selfUser.mail);
    let userIds = [selfId, ...followingIds];
    let q = encodeURIComponent(`userId:(${userIds.join(',')}) and replyTo:(null) or ${userName}`);
    let queryStr = `q=${q}&sort=createTime&order=desc&limit=5`;
    return queryStr;
  }
  handleAddPostSubmit = (values) => {
    this.props.createPostStart(values);
  }
  handleFetchOldPosts = (posts, selfId, followingIds) => {
    let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchOldPostsQueryStr, componentName + '_' + followingIds);
  }
  handleFetchNewPosts = (posts, selfId, followingIds) => {
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(selfId, followingIds), posts)
    this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + followingIds);
  }
  render() {
    let { posts, selfId, followingIds } = this.props;
    return (
      <div>
        <h1>I am Home Page.</h1>
        <AddPostForm onSubmit={this.handleAddPostSubmit} />
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(posts, selfId, followingIds)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(posts, selfId, followingIds)} />
      </div>
    )
  }
}

HomePage.propTypes = {
}

const mapStateToProps = (state, props) => {
  return {
    posts: getPostsByRequestId(state, componentName + '_' + getUserIdsByFollowerId(state)({followerId: getSelfId(state)})),
    selfId: getSelfId(state),
    selfUser: getSelfUser(state),
    followingIds: getUserIdsByFollowerId(state)({followerId: getSelfId(state)}),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(HomePage);
