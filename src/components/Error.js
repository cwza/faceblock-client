import React, { Component } from 'react'

class Error extends Component {
  render() {
    let { error } = this.props;
    return (
      <div>
        <h1>{error.code}</h1>
        <h1>{error.name}</h1>
        <h1>{error.message}</h1>
        <h1>{error.longMessage}</h1>
      </div>
    )
  }
}

Error.propTypes = {
  error: React.PropTypes.object,
}

export default Error;
