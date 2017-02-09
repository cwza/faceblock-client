import React, { Component } from 'react'
import loadingImg from '../images/ajax-loader.gif';

class Loading extends Component {
  render() {
    const { fetchStatus } = this.props;
    const style = {visibility: (fetchStatus === 1 || fetchStatus === undefined) ? 'visible' : 'hidden'}
    return (
      <div style={style} className="text-center">
        <img className="rounded" src={loadingImg} alt="Loading" />
      </div>
    )
  }
}

Loading.propTypes = {
  fetchStatus: React.PropTypes.number,
}

export default Loading;
