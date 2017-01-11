import React, { Component } from 'react'
import { connect } from 'react-redux'
import followRelationsActions from '../actions/followRelationsActions'

const componentName = 'UserFollowingsPage';
class UserFollowingsPage extends Component {
  componentDidMount() {
    // this.fetchFollowingsRequestId = `${componentName}_fetchFollowings`;
    // this.props.fetchFollowRelationsStart(`q=followerId:(${this.props.params.userId})`, this.fetchFollowingsRequestId);
  }
  render() {
    return (
      <div>
        <h1>I am UserFollowingsPage</h1>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
  }
}

export default connect(mapStateToProps, {
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(UserFollowingsPage);
