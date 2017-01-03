import React, { Component } from 'react'
import { Link } from 'react-router'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import Error from '../components/Error'
import authenticationActions from '../actions/authenticationActions'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    this.props.logout();
    this.props.routerPush('/');
    window.location.reload();
  }
  componentDidUpdate() {
    let { error } = this.props;
    if(error && error.name === 'AUTHENTICATION_ERROR') {
      this.handleLogout();
    }
  }
  render() {
    let { error } = this.props;
    return (
      <div>
        <h1>I am App Page.</h1>
        <Link to="/authentication" activeClassName="active">Login</Link>
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

App.propTypes = {
  error: React.PropTypes.object,
  handleCloseModal: React.PropTypes.func,
  logout: React.PropTypes.func.isRequired,
  routerPush: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: getError(state),
  }
}

export default connect(mapStateToProps, {
  logout: authenticationActions.logout,
  routerPush: routerActions.push,
})(App);
