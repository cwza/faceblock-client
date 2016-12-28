import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import {getOauthLoginUrl} from '../services/google/apis'

const googleLoginUrl = getOauthLoginUrl();
class App extends Component {
  render() {
    let { error } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <a href={googleLoginUrl}>Login</a>
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
  }
}

export default connect(mapStateToProps, {
})(App);
