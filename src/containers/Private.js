import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getError } from '../selectors/utilsSelectors'
import {getOauthLoginUrl} from '../services/google/apis'
import authenticationActions from '../actions/authenticationActions'
import { getAuthentication } from '../selectors/utilsSelectors'

const googleLoginUrl = getOauthLoginUrl();
class Private extends Component {
  componentDidUpdate() {
    let { authenticationItem } = this.props;
    if(!authenticationItem || !authenticationItem.faceblockToken) {
      window.location = googleLoginUrl;
    }
  }
  render() {
    return (
      <div>
        <h1>I am Private Page.</h1>
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
})(Private);
