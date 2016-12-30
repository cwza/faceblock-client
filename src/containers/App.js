import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import {getOauthLoginUrl} from '../services/google/apis'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'

const googleLoginUrl = getOauthLoginUrl();
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.logout();
  }
  componentDidUpdate() {
    let { error } = this.props;
    if(error && error.name === 'AUTHENTICATION_ERROR') window.location = googleLoginUrl;
  }
  render() {
    let { error } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <a href={googleLoginUrl}>Login</a>
        <button onClick={this.handleLogout}>Logout</button>
        <ul role="navigation">
          <li><Link to="/" onlyActiveOnIndex={true} activeClassName="active">Home</Link></li>
          <li><Link to="/users" activeClassName="active">Users</Link></li>
        </ul>
        {error && <Error error={error} />}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: getError(state),
    authenticationItem: getAuthentication(state).item,
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
})(App);
