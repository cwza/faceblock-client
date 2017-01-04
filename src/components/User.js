import React, { Component } from 'react'
import { Link } from 'react-router'

class User extends Component {
  renderUser = (user, handleUserClick) => {
    if(user) {
      return (
        <div>
          <div onClick={handleUserClick}>
            <li><Link to={`/userPostsPage/${user.id}`} activeClassName="active">{JSON.stringify(user, null, 2)}</Link></li>
          </div>
        </div>
      )
    }
    return (<div></div>)
  }
  render() {
    let { user, handleUserClick } = this.props;
    return this.renderUser(user, handleUserClick);
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  handleUserClick: React.PropTypes.func,
}

export default User;
