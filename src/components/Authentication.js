import React, { Component } from 'react'
import {getOauthLoginUrl} from '../services/google/apis'

const googleLoginUrl = getOauthLoginUrl();
class Authentication extends Component {
  render() {
    return (
      <div>
        <a href={googleLoginUrl}>Login With Google</a>
      </div>
    )
  }
}

Authentication.propTypes = {
}

export default Authentication;
