import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getParamsFromHash } from '../services/google/apis'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import Loading from '../components/Loading'
import { routerActions } from 'react-router-redux'

class GoogleOauth2Callback extends Component {
  componentDidMount() {
    this.params = getParamsFromHash(this.props.location.hash);
    this.props.loginStart('google', this.params.accessToken);
  }
  componentDidUpdate() {
    let { authentication } = this.props;
    if(authentication.item.faceblockToken && !authentication.isFetching)
      this.redirectToHomePage();
  }
  redirectToHomePage = () => {
    this.props.routerPush('/');
  }
  render() {
    let isFetching = this.props.authentication.isFetching;
    return (
      <div>
        <h1>{JSON.stringify(this.params, null, 2)}</h1>
        {isFetching && <Loading />}
      </div>
    )
  }
}
GoogleOauth2Callback.propTypes = {
  authentication: React.PropTypes.object,
  loginStart: React.PropTypes.func.isRequired,
  routerPush: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    authentication: getAuthentication(state),
  }
}

export default connect(mapStateToProps, {
  loginStart: authenticationActions.loginStart,
  routerPush: routerActions.push,
})(GoogleOauth2Callback);
