import React, { Component } from 'react'
import { Link } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
  }
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    let { selfId, faceblockToken, handleLogout } = this.props;
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand href="/">Faceblock</NavbarBrand>
          <Collapse className="navbar-toggleable-md" isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" onlyActiveOnIndex={true} activeClassName="active">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users" activeClassName="active">Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/UserPostsPage/${selfId}`} activeClassName="active">MyPage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/UserFollowingsPage/${selfId}`} activeClassName="active">MyFollowings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/UserFollowersPage/${selfId}`} activeClassName="active">MyFollowers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/SearchUserPage" activeClassName="active">SearchUserPage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/SearchPostPage" activeClassName="active">SearchPostPage</NavLink>
              </NavItem>
              <NavItem>
                { !faceblockToken && <NavLink tag={Link} to="/authentication" activeClassName="active">Login</NavLink> }
                { faceblockToken &&  <Button color="danger" onClick={handleLogout}>Logout</Button> }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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
