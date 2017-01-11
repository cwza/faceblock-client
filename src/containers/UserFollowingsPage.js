import React, { Component } from 'react'
import { connect } from 'react-redux'
import followRelationsActions from '../actions/followRelationsActions'
import { getFollowingsByFollowRelationsRequestId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'

const componentName = 'UserFollowingsPage';
class UserFollowingsPage extends Component {
  componentDidMount() {
    let { userId } = this.props.params;
    this.fetchFollowingsRequestId = `${componentName}_${userId}_fetchFollowings`;
    this.props.fetchFollowRelationsStart(`q=followerId:(${userId})`, this.fetchFollowingsRequestId);
    console.log('heyeheykljfsdlkdfA');
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
  let { userId } = props.params;
  let fetchFollowingsRequestId = `${componentName}_${userId}_fetchFollowings`;
  return {
    followings: getFollowingsByFollowRelationsRequestId(state, fetchFollowingsRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(UserFollowingsPage);
