import React, { Component } from 'react'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'

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
    let { error, faceblockToken } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        { !faceblockToken && <Link to="/authentication" activeClassName="active">Login</Link> }
        { faceblockToken && <button onClick={this.handleLogout}>Logout</button> }
        <ul role="navigation">
          <li><Link to="/" onlyActiveOnIndex={true} activeClassName="active">Home</Link></li>
          <li><Link to="/users" activeClassName="active">Users</Link></li>
          <li><Link to="/SearchUserPage" activeClassName="active">SearchUserPage</Link></li>
        </ul>
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
    faceblockToken: getAuthentication(state).item.faceblockToken
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
  routerPush: routerActions.push,
})(App);
