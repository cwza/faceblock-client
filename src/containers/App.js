import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import { getSelfId, getSelfUser } from '../selectors/usersSelectors'
import SideBar from '../components/SideBar'
import usersActions from '../actions/usersActions'
import { isEmpty } from 'lodash'
import followRelationsActions from '../actions/followRelationsActions'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import { getUserIdsByFollowerId } from '../selectors/followRelationsSelectors'

const componentName = 'App';
class App extends Component {
  componentDidMount() {
    let { selfUser, selfId, fetchUserStart, followings, fetchFollowingsStatus } = this.props;
    if(isEmpty(selfUser) && selfId)
      fetchUserStart(selfId);
    if(isEmpty(followings) && selfId && fetchFollowingsStatus === 0)
      this.props.fetchFollowRelationsStart(`q=followerId:(${selfId})`, `${componentName}_followings`)
  }
  componentDidUpdate() {
    let { error } = this.props;
    if(error && error.name === 'AUTHENTICATION_ERROR') {
      this.handleLogout();
    }
  }
  handleLogout = () => {
    this.props.logout();
    this.props.routerPush('/');
    window.location.reload();
  }
  render() {
    let { error, faceblockToken, selfId, selfUser } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <SideBar selfId={selfId} faceblockToken={faceblockToken} handleLogout={this.handleLogout}/>
        {error && <Error error={error} />}
        {React.cloneElement(this.props.children, {selfUser})}
      </div>
    )
  }
}

App.propTypes = {
};

const mapStateToProps = (state) => {
  return {
    error: getError(state),
    faceblockToken: getAuthentication(state).item.faceblockToken,
    selfId: getSelfId(state),
    selfUser: getSelfUser(state),
    fetchFollowingsStatus: getFetchingStatus(state, `${componentName}_followings`),
    followings: getUserIdsByFollowerId(state)(getSelfId(state)),
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
  routerPush: routerActions.push,
  fetchUserStart: usersActions.fetchUserStart,
  fetchFollowRelationsStart: followRelationsActions.fetchFollowRelationsStart,
})(App);
