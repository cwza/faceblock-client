import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostById, getIsFetching } from '../selectors/postsSelectors'
import { getSelfId } from '../selectors/usersSelectors'
import { routerActions } from 'react-router-redux'
import CommentList from './CommentList'

class PostDetailPage extends Component {
  handleDeletePost = (post) => {
    this.props.deletePostStart(post.id);
    if(!this.props.isFetching)
      this.props.routerBack();
  }
  render() {
    let { post, selfId } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <Post post={post}
          handleDeletePost={() => this.handleDeletePost(post)}
          canDelete={post.userId === selfId}
        />
        <CommentList postId={post.id}/>
      </div>
    )
  }
}

PostDetailPage.propTypes = {
};

const mapStateToProps = (state, props) => {
  return {
    post: getPostById(state, props.params.postId),
    isFetching: getIsFetching(state),
    selfId: getSelfId(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerBack: routerActions.goBack,
})(PostDetailPage);
