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
import { getFetchingStatus } from '../selectors/requestInfoSelectors'

const componentName = 'HomePage';
class HomePage extends Component {
  componentDidMount() {
  }
  componentDidUpdate() {
    let { posts, fetchFollowingsStatus, selfId, followingIds, fetchPostsStatus } = this.props
    console.log('posts: ', posts, ' fetchPostsStatus: ', fetchPostsStatus, ' fetchFollowingsStatus: ', fetchFollowingsStatus);
    if(isEmpty(posts) && fetchPostsStatus === 0 && fetchFollowingsStatus === 2)
      this.handleFetchNewPosts(posts, selfId, followingIds);
  }
  genQueryStr = (selfId, followingIds) => {
    let userName = utils.getMailUsername(this.props.selfUser.mail);
    let userIds = [selfId, ...followingIds];
    let q = encodeURIComponent(`userId:(${userIds.join(',')}) and replyTo:(null) or #${userName}`);
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
  let selfId = getSelfId(state);
  let followingIds = getUserIdsByFollowerId(state)({followerId: selfId});
  return {
    selfId,
    followingIds,
    posts: getPostsByRequestId(state, componentName + '_' + followingIds),
    selfUser: getSelfUser(state),
    fetchFollowingsStatus: getFetchingStatus(state, `Private_followings`),
    fetchPostsStatus: getFetchingStatus(state, componentName + '_' + followingIds),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  createPostStart: postsActions.createPostStart,
})(HomePage);
