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
  componentWillReceiveProps(newProps) {
    this.setState({ visible: true });
  }
  onDismiss = () => {
    this.setState({ visible: false });
  }
  renderError = (error) => {
    if(!isEmpty(error))
      return (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          <h6 hidden>{error.code}</h6>
          <h6>error name: {error.name}</h6>
          <h6>error message: {error.message}</h6>
          <h6 hidden>{error.longMessage}</h6>
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
