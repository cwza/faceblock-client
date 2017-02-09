import React, { Component } from 'react'
import { connect } from 'react-redux'
import followRelationsActions from '../actions/followRelationsActions'
import { getFollowersByFollowRelationsRequestId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'

const componentName = 'UserFollowersPage';
class UserFollowersPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    let { users } = this.props;
    this.handleFetchNewFollowRelations(userId, users);
  }
  genFetchFollowersRequestId = (userId) => {
    return `${componentName}_${userId}_fetchFollowers`;
  }
  genQueryStr = (userId) => {
    return `q=userId:(${userId})&sort=createTime&order=desc&limit=5`;
  }
  handleFetchOldFollowRelations = (userId, users) => {
    let fetchOldUsersQueryStr = getFetchOldQueryStr(this.genQueryStr(userId), users)
    this.props.fetchFollowRelationsStart(fetchOldUsersQueryStr, this.genFetchFollowersRequestId(userId));
  }
  handleFetchNewFollowRelations = (userId, users) => {
    let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(userId), users)
    this.props.fetchFollowRelationsStart(fetchNewUsersQueryStr, this.genFetchFollowersRequestId(userId));
  }
  render() {
    let { userId } = this.props.params;
    let { followers, fetchFollowersStatus } = this.props;
    return (
      <div>
        <h1 hidden>I am UserFollowersPage</h1>
        <UserList users={this.props.followers}
          fetchStatus={fetchFollowersStatus}
          handleFetchOldUsers={() => this.handleFetchOldFollowRelations(userId, followers)}
          handleFetchNewUsers={() => this.handleFetchNewFollowRelations(userId, followers)} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let { userId } = props.params;
  let fetchFollowersRequestId = `${componentName}_${userId}_fetchFollowers`;
  return {
    followers: getFollowersByFollowRelationsRequestId(state, fetchFollowersRequestId),
    fetchFollowersStatus: getFetchingStatus(state, fetchFollowersRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(UserFollowersPage);
