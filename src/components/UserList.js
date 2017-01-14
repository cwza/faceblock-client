import React, { Component } from 'react'
import UserContainer from '../containers/UserContainer'
import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'

class UserList extends Component {
  handleUserClick = (userId) => {
    this.props.routerPush('/UserUsersPage/' + userId);
  }
  renderUserList = (users) => {
    return users.map((user, i) => {
      return (
        <UserContainer key={i} user={user}/>
      )
    });
  }
  render() {
    let { users, handleFetchNewUsers, handleFetchOldUsers } = this.props;
    return (
      <div>
        <h1 hidden>I am UserList Page.</h1>
        <Container>
          <Row>
            <Col>
              {handleFetchNewUsers && <Button className="btn-block" color="info" onClick={handleFetchNewUsers}>Load New</Button>}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderUserList(users)}
            </Col>
          </Row>
          <Row>
            <Col>
              {handleFetchOldUsers && <Button className="btn-block" color="info" onClick={handleFetchOldUsers}>Load Old</Button>}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  handleFetchOldUsers: React.PropTypes.func,
  handleFetchNewUsers: React.PropTypes.func,
}

export default UserList;
