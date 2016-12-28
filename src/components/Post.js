import React, { Component } from 'react'

class Post extends Component {
  render() {
    let { post } = this.props;
    return (
      <div>
        <button onClick={this.props.handleDeletePost}>Delete</button>
        <div onClick={this.props.onClick}>
          <h1>{JSON.stringify(post, null, 2)}</h1>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
  handleDeletePost: React.PropTypes.func.isRequired,
}

export default Post;
