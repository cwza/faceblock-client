import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { Alert } from 'reactstrap'

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
  onDismiss = () => {
    this.setState({ visible: false });
  }
  renderError = (error) => {
    if(!isEmpty(error))
      return (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          <h1 hidden>{error.code}</h1>
          <h1>error name: {error.name}</h1>
          <h1>error message: {error.message}</h1>
          <h1 hidden>{error.longMessage}</h1>
        </Alert>
      )
  }
  render() {
    let { error } = this.props;
    return this.renderError(error);
  }
}

Error.propTypes = {
  error: React.PropTypes.object,
}

export default Error;
