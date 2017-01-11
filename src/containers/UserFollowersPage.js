import React, { Component } from 'react'
import { connect } from 'react-redux'
import followRelationsActions from '../actions/followRelationsActions'
import { getFollowersByFollowRelationsRequestId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

const componentName = 'UserFollowersPage';
class UserFollowersPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    let { users } = this.props;
    this.fetchFollowersRequestId = `${componentName}_${userId}_fetchFollowers`;
    this.handleFetchNewFollowRelations(userId, users);
  }
  genQueryStr = (userId) => {
    return `q=userId:(${userId})&sort=createTime&order=desc&limit=5`;
  }
  handleFetchOldFollowRelations = (userId, users) => {
    let fetchOldUsersQueryStr = getFetchOldQueryStr(this.genQueryStr(userId), users)
    this.props.fetchFollowRelationsStart(fetchOldUsersQueryStr, this.fetchFollowersRequestId);
  }
  handleFetchNewFollowRelations = (userId, users) => {
    let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(userId), users)
    this.props.fetchFollowRelationsStart(fetchNewUsersQueryStr, this.fetchFollowersRequestId);
  }
  render() {
    let { userId } = this.props.params;
    let { followers } = this.props;
    return (
      <div>
        <h1>I am UserFollowersPage</h1>
        <UserList users={this.props.followers}
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
  }
}

export default connect(mapStateToProps, {
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(UserFollowersPage);
