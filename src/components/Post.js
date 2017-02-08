import React, { Component } from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import * as utils from '../utils'
import { Card, CardText, CardLink, CardBlock, Row, Col, CardImg } from 'reactstrap'
import moment from 'moment-timezone'
import ConfirmModel from './ConfirmModel'

class Post extends Component {
  renderPost = (post, handlePostClick, handleDeletePost, canDelete, author) => {
    if(!isEmpty(post)) {
      return (
        <div>
          <Card>
            <Row>
              <Col md="2">
                {!isEmpty(author) && <CardBlock>
                  <CardLink tag={Link} to={`/UserPostsPage/${author.id}`} activeClassName="active">
                    <CardImg width="100%" src={author.picture} alt="user picture cap" />
                    {utils.getMailUsername(author.mail)}
                  </CardLink>
                </CardBlock>}
              </Col>
              <Col>
                <CardBlock>
                  {canDelete && <ConfirmModel onConfirm={this.props.handleDeletePost} body='Do you really want to Delete This Post?' confirmText='Apply' title='Delete Post' buttonLabel='Delete'/>}
                </CardBlock>
                <CardBlock onClick={handlePostClick} style={{cursor: 'pointer'}}>
                  <CardText>{post.content}</CardText>
                  <Row>
                    <Col xs="3"><small className="text-muted">{moment(post.createTime).fromNow()}</small></Col>
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
