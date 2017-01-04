import React, { Component } from 'react'

class Post extends Component {
  renderPost = (post, handlePostClick, handleDeletePost, canDelete) => {
    if(post) {
      return (
        <div>
          {canDelete && <button onClick={handleDeletePost}>Delete</button>}
          <div onClick={handlePostClick}>
            <h1>{JSON.stringify(post, null, 2)}</h1>
          </div>
        </div>
      )
    }
    return (<div></div>)
  }
  render() {
    let { post, handlePostClick, handleDeletePost, canDelete } = this.props;
    return this.renderPost(post, handlePostClick, handleDeletePost, canDelete);
  }
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  handlePostClick: React.PropTypes.func,
  handleDeletePost: React.PropTypes.func,
  canDelete: React.PropTypes.bool.isRequired
}

export default Post;
