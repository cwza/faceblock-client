import React, { Component } from 'react'
import { connect } from 'react-redux'
import followRelationsActions from '../actions/followRelationsActions'
import { getFollowingsByFollowerId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'

const componentName = 'UserFollowingsPage';
class UserFollowingsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    this.fetchFollowingsRequestId = `${componentName}_${userId}_fetchFollowings`;
    this.props.fetchFollowRelationsStart(`q=followerId:(${userId})`, this.fetchFollowingsRequestId);
  }
  render() {
    return (
      <div>
        <h1>I am UserFollowingsPage</h1>
        <UserList users={this.props.followings} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let userId = parseInt(props.params.userId, 10);
  return {
    followings: getFollowingsByFollowerId(state, userId)(userId),
  }
}

export default connect(mapStateToProps, {
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(UserFollowingsPage);
