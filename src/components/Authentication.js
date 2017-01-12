import React, { Component } from 'react'
import {getOauthLoginUrl} from '../services/google/apis'
import { Button } from 'reactstrap';

const googleLoginUrl = getOauthLoginUrl();
class Authentication extends Component {
  googleClick = () => {
    window.location = googleLoginUrl;
  }
  render() {
    return (
      <div>
        <Button color="primary" onClick={this.googleClick}>Login With Google</Button>
      </div>
    )
  }
}

Authentication.propTypes = {
}

export default Authentication;
