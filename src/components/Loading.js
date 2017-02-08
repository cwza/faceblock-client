import React, { Component } from 'react'
import loadingImg from '../images/ajax-loader.gif';

class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="rounded" src={loadingImg} alt="Loading" />
      </div>
    )
  }
}

Loading.propTypes = {
}

export default Loading;
