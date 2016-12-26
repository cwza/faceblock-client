import React, { Component } from 'react'

class Post extends Component {
  render() {
    let { post } = this.props;
    return (
      <div>
        <h1>{JSON.stringify(post, null, 2)}</h1>
      </div>
    )
  }
}

export default Post;
