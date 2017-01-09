import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import { getSelfId, getSelfUser, getIsFetching as getUsersIsFetching } from '../selectors/usersSelectors'
import { getIsFetching as getPostsIsFetching } from '../selectors/postsSelectors'
import SideBar from '../components/SideBar'
import Loading from '../components/Loading'
import usersActions from '../actions/usersActions'
import { isEmpty } from 'lodash'

class App extends Component {
  componentDidMount() {
    let { selfUser, selfId, fetchUserStart } = this.props;
    if(isEmpty(selfUser) && selfId)
      fetchUserStart(selfId);
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
    let { error, faceblockToken, selfId, usersIsFetching, postsIsFetching, selfUser } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <Loading usersIsFetching={usersIsFetching} postsIsFetching={postsIsFetching}/>
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
    usersIsFetching: getUsersIsFetching(state),
    postsIsFetching: getPostsIsFetching(state),
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
  routerPush: routerActions.push,
  fetchUserStart: usersActions.fetchUserStart,
})(App);
