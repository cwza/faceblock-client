import React, { Component } from 'react'
import { Link } from 'react-router'

class SideBar extends Component {
  render() {
    let { selfId, faceblockToken, handleLogout } = this.props;
    return (
      <div>
        { !faceblockToken && <Link to="/authentication" activeClassName="active">Login</Link> }
        { faceblockToken && <button onClick={handleLogout}>Logout</button> }
        <ul role="navigation">
          <li><Link to="/" onlyActiveOnIndex={true} activeClassName="active">Home</Link></li>
          <li><Link to="/users" activeClassName="active">Users</Link></li>
          <li><Link to={`/UserPostsPage/${selfId}`} activeClassName="active">MyPage</Link></li>
          <li><Link to="/SearchUserPage" activeClassName="active">SearchUserPage</Link></li>
          <li><Link to="/SearchPostPage" activeClassName="active">SearchPostPage</Link></li>
        </ul>
      </div>
    )
  }
}

SideBar.propTypes = {
  selfId: React.PropTypes.number.isRequired,
  faceblockToken: React.PropTypes.string,
  handleLogout: React.PropTypes.func,
}

export default SideBar;
