import React, { Component } from 'react'
import Loading from '../components/Loading'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'
import followRelationsActions from '../actions/followRelationsActions'
import { getSelfId, getSelfUser } from '../selectors/usersSelectors'
import usersActions from '../actions/usersActions'

const componentName = 'Private';
class Private extends Component {
  componentDidMount() {
    let { selfUser, selfId, fetchUserStart, followings, fetchFollowingsStatus } = this.props;
    if(isEmpty(selfUser) && selfId)
      fetchUserStart(selfId);
    if(isEmpty(followings) && selfId && fetchFollowingsStatus === 0)
      this.props.fetchFollowRelationsStart(`q=followerId:(${selfId})`, `${componentName}_followings`)
    console.log('selfId: ', selfId);
  }
  render() {
    if(isEmpty(this.props.selfUser))
      return (<Loading />)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  let selfId = getSelfId(state);
  return {
    selfId,
    selfUser: getSelfUser(state),
    fetchFollowingsStatus: getFetchingStatus(state, `${componentName}_followings`),
    followings: getUserIdsByFollowerId(state)(selfId),
  }
}

export default connect(mapStateToProps, {
  fetchUserStart: usersActions.fetchUserStart,
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(Private);
