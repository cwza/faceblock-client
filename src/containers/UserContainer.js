import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from '../components/User'
import { getSelfId } from '../selectors/usersSelectors'
import { getFollowRelationByUserIdAndFollowerId } from '../selectors/followRelationsSelectors'
import { isEmpty } from 'lodash'
import followRelationsActions from '../actions/followRelationsActions'
import browserHistory from '../browserHistory'

class UserContainer extends Component {
  componentDidMount() {
  }
  handleUserClick = (userId) => {
    browserHistory.push('/UserPostsPage/' + userId);
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
        <h1 hidden>I am UserContainer Page.</h1>
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
  let selfId = getSelfId(state);
  return {
    selfId,
    followRelation: getFollowRelationByUserIdAndFollowerId(state)(props.user.id, selfId),
  }
}

export default connect(mapStateToProps, {
  deleteFollowRelationStart: followRelationsActions.deleteFollowRelationStart,
  createFollowRelationStart: followRelationsActions.createFollowRelationStart,
})(UserContainer);
