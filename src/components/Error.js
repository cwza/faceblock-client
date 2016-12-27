import React, { Component } from 'react'

class Error extends Component {
  render() {
    let { error } = this.props;
    return (
      <div>
        <h1>{JSON.stringify(error, null, 2)}</h1>
      </div>
    )
  }
}

export default Error;
