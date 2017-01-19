import React, { Component } from 'react'
// import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import { Card, CardText, CardBlock, Button, Col, Row, CardImg } from 'reactstrap'

class User extends Component {
  renderUser = (user, handleUserClick, followRelation, handleFollowClick, isSelf) => {
    if(!isEmpty(user)) {
      return (
        <div>
          <Card>
            <Row>
              <Col md="2">
                <CardBlock>
                  <CardImg width="100%" src={user.picture} alt="user picture cap" />
                </CardBlock>
              </Col>
              <Col>
                <CardBlock>
                  {!isSelf && <div>
                    {isEmpty(followRelation) && <Button color="success" size="sm" onClick={handleFollowClick}>Follow</Button>}
                    {!isEmpty(followRelation) && <Button color="danger" size="sm" onClick={handleFollowClick}>UnFollow</Button>}
                  </div>}
                </CardBlock>
                <CardBlock onClick={handleUserClick} style={{cursor: 'pointer'}}>
                  <CardText>{user.mail}</CardText>
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
    let { user, handleUserClick, followRelation, handleFollowClick, isSelf } = this.props;
    return this.renderUser(user, handleUserClick, followRelation, handleFollowClick, isSelf);
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  followRelation: React.PropTypes.object,
  handleUserClick: React.PropTypes.func,
  handleFollowClick: React.PropTypes.func,
  isSelf: React.PropTypes.bool.isRequired,
}

export default User;
