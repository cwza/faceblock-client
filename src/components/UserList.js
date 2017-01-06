import React, { Component } from 'react'
import UserContainer from '../containers/UserContainer'

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
        <h1>I am UserList Page.</h1>
        {handleFetchNewUsers && <button onClick={handleFetchNewUsers}>Load New</button>}
        {this.renderUserList(users)}
        {handleFetchOldUsers && <button onClick={handleFetchOldUsers}>Load Old</button>}
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
