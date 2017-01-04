import React, { Component } from 'react'

class Post extends Component {
  renderPost = (post) => {
    if(post) {
      return (
        <div>
          <button onClick={this.props.handleDeletePost}>Delete</button>
          <div onClick={this.props.handlePostClick}>
            <h1>{JSON.stringify(post, null, 2)}</h1>
          </div>
        </div>
      )
    }
    return (<div></div>)
  }
  render() {
    let { post } = this.props;
    return this.renderPost(post);
  }
}

Post.propTypes = {
  post: React.PropTypes.object,
  handlePostClick: React.PropTypes.func,
  handleDeletePost: React.PropTypes.func.isRequired,
}

export default Post;
