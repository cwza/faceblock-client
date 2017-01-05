import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import usersActions from '../actions/usersActions'
import { getPostById, getIsFetching as postsIsFetching } from '../selectors/postsSelectors'
import { getSelfId, getUserById } from '../selectors/usersSelectors'
import { routerActions } from 'react-router-redux'
import CommentList from './CommentList'
import { isEmpty } from 'lodash'

class PostDetailPage extends Component {
  componentDidMount() {
    let {post, fetchPostStart} = this.props;
    let { postId } = this.props.params;
    if(isEmpty(post))
      fetchPostStart(postId);
  }
  componentDidUpdate() {
    let {post, author, fetchUserStart, postsIsFetching} = this.props;
    if(isEmpty(author) && !isEmpty(post) && !postsIsFetching)
      fetchUserStart(post.userId);
  }
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
    if(!this.props.postsIsFetching)
      this.props.routerBack();
  }
  render() {
    let { post, selfId, author } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <Post post={post} author={author}
          handleDeletePost={() => this.handleDeletePost(post)}
          canDelete={post.userId === selfId}
        />
        {!isEmpty(post) && <CommentList postId={post.id}/>}
      </div>
    )
  }
}

PostDetailPage.propTypes = {
};

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.params.postId),
    author: getUserById(state, getPostById(state, props.params.postId).userId),
    postsIsFetching: postsIsFetching(state),
    selfId: getSelfId(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerBack: routerActions.goBack,
  fetchPostStart: postsActions.fetchPostStart,
  fetchUserStart: usersActions.fetchUserStart,
})(PostDetailPage);
