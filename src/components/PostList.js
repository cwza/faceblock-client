import React, { Component } from 'react'
import PostContainer from '../containers/PostContainer'
import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'

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
  render() {
    let { posts, handleFetchNewPosts, handleFetchOldPosts } = this.props;
    return (
      <div>
        <h1 hidden>I am PostList Page.</h1>
        <Container>
          <Row>
            <Col>
              {handleFetchNewPosts && <Button className="btn-block" color="info" onClick={handleFetchNewPosts}>Load New</Button>}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderPostList(posts)}
            </Col>
          </Row>
          <Row>
            <Col>
              {handleFetchOldPosts && <Button className="btn-block" color="info" onClick={handleFetchOldPosts}>Load Old</Button>}
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
}

export default PostList;
