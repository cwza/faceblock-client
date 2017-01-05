import React, { Component } from 'react'
import { isEmpty } from 'lodash'

class Error extends Component {
  renderError = (error) => {
    if(!isEmpty(error))
      return (
        <div>
          <h1>{error.code}</h1>
          <h1>{error.name}</h1>
          <h1>{error.message}</h1>
          <h1>{error.longMessage}</h1>
        </div>
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
