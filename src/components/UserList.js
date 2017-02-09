import React, { Component } from 'react'
import UserContainer from '../containers/UserContainer'
// import { Button } from 'reactstrap'
import { Container, Row, Col } from 'reactstrap'
import Waypoint from 'react-waypoint'
import Loading from './Loading'

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
    let { users, handleFetchNewUsers, handleFetchOldUsers } = this.props;
    return (
      <div>
        <h1 hidden>I am UserList Page.</h1>
        <Container>
          <Row>
            <Col>
              {this.renderWaypoint(handleFetchNewUsers)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderUserList(users)}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderWaypoint(handleFetchOldUsers)}
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
  fetchStatus: React.PropTypes.number,
}

export default UserList;
