import React, { Component } from 'react'
import {getParamsFromHash, getUserInfo} from '../services/google/apis'

class GoogleOauth2Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {userInfo: {}};
    this.handleGetUserInfo = this.handleGetUserInfo.bind(this);
    this.params = getParamsFromHash(this.props.location.hash);
  }
  componentDidMount() {
  }
  handleGetUserInfo() {
    getUserInfo(this.params.accessToken).then(response => {
      this.setState({userInfo: response.response});
    })
  }
  render() {
    return (
      <div>
        <h1>{JSON.stringify(this.params, null, 2)}</h1>
      </div>
    )
  }
}

GoogleOauth2Callback.propTypes = {
}

export default GoogleOauth2Callback;
