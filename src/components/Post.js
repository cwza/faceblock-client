import React, { Component } from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'

class Post extends Component {
  renderPost = (post, handlePostClick, handleDeletePost, canDelete, author) => {
    if(!isEmpty(post)) {
      return (
        <div>
          {!isEmpty(author) && <Link to={`/UserPostsPage/${author.id}`} activeClassName="active">{author.mail}</Link>}
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
    let { post, handlePostClick, handleDeletePost, canDelete, author } = this.props;
    return this.renderPost(post, handlePostClick, handleDeletePost, canDelete, author);
  }
}

Post.propTypes = {
  post: React.PropTypes.object.isRequired,
  author: React.PropTypes.object.isRequired,
  handlePostClick: React.PropTypes.func,
  handleDeletePost: React.PropTypes.func,
  canDelete: React.PropTypes.bool.isRequired
}

export default Post;
