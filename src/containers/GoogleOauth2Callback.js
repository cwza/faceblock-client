import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getParamsFromHash } from '../services/google/apis'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import Loading from '../components/Loading'
import { getSelfId } from '../selectors/usersSelectors'
import browserHistory from '../browserHistory'

class GoogleOauth2Callback extends Component {
  componentDidMount() {
    this.params = getParamsFromHash(this.props.location.hash);
    this.props.loginStart('google', this.params.accessToken);
  }
  componentDidUpdate() {
    let { selfId } = this.props;
    if(selfId)
      this.redirectToHomePage();
  }
  redirectToHomePage = () => {
    browserHistory.push('/');
    // this.props.routerPush('/');
  }
  render() {
    return (
      <div>
        <Loading/>
      </div>
    )
  }
}
GoogleOauth2Callback.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    authentication: getAuthentication(state),
    selfId: getSelfId(state),
  }
}

export default connect(mapStateToProps, {
  loginStart: authenticationActions.loginStart,
})(GoogleOauth2Callback);
