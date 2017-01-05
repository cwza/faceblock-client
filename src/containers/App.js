import React, { Component } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import { getSelfId } from '../selectors/usersSelectors'
import SideBar from '../components/SideBar'

class App extends Component {
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
    let { error, faceblockToken, selfId } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <SideBar selfId={selfId} faceblockToken={faceblockToken} handleLogout={this.handleLogout}/>
        {error && <Error error={error} />}
        {this.props.children}
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
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
  routerPush: routerActions.push,
})(App);
