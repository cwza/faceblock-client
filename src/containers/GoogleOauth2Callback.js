import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getParamsFromHash } from '../services/google/apis'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'
import Loading from '../components/Loading'

class GoogleOauth2Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {userInfo: {}};
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
  }
  componentDidMount() {
    this.params = getParamsFromHash(this.props.location.hash);
    this.props.loginStart('google', this.params.accessToken);
  }
  componentDidUpdate() {
    let { authentication } = this.props;
    if(authentication.item.faceblockToken && !authentication.isFetching)
      this.redirectToHomePage();
  }
  redirectToHomePage() {
    this.props.router.push('/');
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    authentication: getAuthentication(state),
  }
}

export default connect(mapStateToProps, {
  loginStart: authenticationActions.loginStart,
})(GoogleOauth2Callback);
