import React, { Component } from 'react'
// import { Link } from 'react-router'

class PostDetailPage extends Component {
  render() {
    let { post } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <h1>{JSON.stringify(post, null, 2)}</h1>
      </div>
    )
  }
}

export default PostDetailPage;
