import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import postsActions from '../actions/postsActions'
import { getPostById, getIsFetching } from '../selectors/postsSelectors'
import { getSelfUser } from '../selectors/usersSelectors'
import { routerActions } from 'react-router-redux'
import CommentList from './CommentList'

class PostDetailPage extends Component {
  handleDeletePost = (post, selfUser) => {
    this.props.deletePostStart(post.id);
    if(!this.props.isFetching)
      this.props.routerBack();
  }
  render() {
    let { post, selfUser } = this.props;
    return (
      <div>
        <h1>I am PostDetailPage.</h1>
        <Post post={post}
          handleDeletePost={() => this.handleDeletePost(post, selfUser)}
          canDelete={post.userId === selfUser.id}
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
    selfUser: getSelfUser(state),
  }
}

export default connect(mapStateToProps, {
  deletePostStart: postsActions.deletePostStart,
  routerBack: routerActions.goBack,
})(PostDetailPage);
