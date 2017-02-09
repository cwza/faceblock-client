import React, { Component } from 'react'
import PostContainer from '../containers/PostContainer'
// import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import Waypoint from 'react-waypoint'
import Loading from './Loading'

class PostList extends Component {
  handlePostClick = (postId) => {
    this.props.routerPush('/post/' + postId);
  }
  renderPostList = (posts) => {
    return posts.map((post, i) => {
      return (
          <PostContainer key={i} post={post} />
      )
    });
  }
  renderWaypoint = (handleLoadMore) => {
    if(!handleLoadMore) return;
    const { fetchStatus } = this.props;
    return (
      <div>
        <Loading fetchStatus={fetchStatus} />
        <Waypoint key={1} onEnter={() => {
          if(fetchStatus === 1) return;
          handleLoadMore();
        }}/>
      </div>
    )
  }
  render() {
    let { posts, handleFetchNewPosts, handleFetchOldPosts} = this.props;
    return (
      <div>
        <h1 hidden>I am PostList Page.</h1>
        <Container>
          <Row>
            <Col>
              {this.renderWaypoint(handleFetchNewPosts)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderPostList(posts)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderWaypoint(handleFetchOldPosts)}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: React.PropTypes.array.isRequired,
  handleFetchOldPosts: React.PropTypes.func,
  handleFetchNewPosts: React.PropTypes.func,
  fetchStatus: React.PropTypes.number,
}

export default PostList;
