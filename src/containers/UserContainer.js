import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from '../components/User'
import { routerActions } from 'react-router-redux'
import { getSelfId } from '../selectors/usersSelectors'
import { getFollowRelationByUserIdAndFollowerId } from '../selectors/followRelationsSelectors'
import { isEmpty } from 'lodash'
import followRelationsActions from '../actions/followRelationsActions'

class UserContainer extends Component {
  componentDidMount() {
  }
  handleUserClick = (userId) => {
    this.props.routerPush('/UserPostsPage/' + userId);
  }
  handleFollowClick = (userId, selfId, followRelation) => {
    if(!isEmpty(followRelation))
      this.props.deleteFollowRelationStart(followRelation.id);
    else {
      this.props.createFollowRelationStart({userId: userId, followerId: selfId});
    }
  }
  render() {
    let { user, followRelation, selfId } = this.props;
    let handleUserClick = this.props.handleUserClick ? this.props.handleUserClick : () => this.handleUserClick(user.id);
    return (
      <div>
        <h1>I am UserContainer Page.</h1>
        <User user={user}
          followRelation={followRelation}
          handleFollowClick={() => this.handleFollowClick(user.id, selfId, followRelation)}
          handleUserClick={handleUserClick}
          isSelf={selfId === user.id}
        />
      </div>
    )
  }
}

UserContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleUserClick: React.PropTypes.func,
}

const mapStateToProps = (state, props) => {
  return {
    selfId: getSelfId(state),
    followRelation: getFollowRelationByUserIdAndFollowerId(state)({userId: props.user.id, followerId: getSelfId(state)}),
  }
}

export default connect(mapStateToProps, {
  routerPush: routerActions.push,
  deleteFollowRelationStart: followRelationsActions.deleteFollowRelationStart,
  createFollowRelationStart: followRelationsActions.createFollowRelationStart,
})(UserContainer);
