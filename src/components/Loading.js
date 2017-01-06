import React, { Component } from 'react'

class Loading extends Component {
  isFetching = () => {
    let {usersIsFetching, postsIsFetching, isFetching} = this.props;
    return usersIsFetching || postsIsFetching || isFetching;
  }
  render() {
    return (
      <div>
        {this.isFetching() && <h1>Now Loading....</h1>}
      </div>
    )
  }
}

Loading.propTypes = {
}

export default Loading;
