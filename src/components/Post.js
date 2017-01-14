import React, { Component } from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import * as utils from '../utils'
import { Card, CardText, CardLink, CardBlock, Row, Col, Button, CardImg } from 'reactstrap'
import moment from 'moment'

class Post extends Component {
  renderPost = (post, handlePostClick, handleDeletePost, canDelete, author) => {
    if(!isEmpty(post)) {
      return (
        <div>
          <Card>
            <Row>
              <Col md="2">
                {!isEmpty(author) && <CardBlock>
                  <CardImg width="100%" src={author.picture} alt="user picture cap" />
                  <CardLink tag={Link} to={`/UserPostsPage/${author.id}`} activeClassName="active">{utils.getMailUsername(author.mail)}</CardLink>
                </CardBlock>}
              </Col>
              <Col>
                <CardBlock>
                  {canDelete && <Button color="danger" size="sm" onClick={handleDeletePost}>Delete</Button>}
                </CardBlock>
                <CardBlock onClick={handlePostClick}>
                  <CardText>{post.content}</CardText>
                  <Row>
                    <Col xs="3"><small className="text-muted">{moment(post.createTime).fromNow(true)}</small></Col>
                    <Col xs="3"><small className="text-muted">Comments Count: {post.commentCounts}</small></Col>
                  </Row>
                </CardBlock>
              </Col>
            </Row>
          </Card>
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
