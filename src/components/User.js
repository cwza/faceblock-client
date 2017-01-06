import React, { Component } from 'react'
// import { Link } from 'react-router'
import { isEmpty } from 'lodash'

class User extends Component {
  renderUser = (user, handleUserClick, followRelation, handleFollowClick, isSelf) => {
    if(!isEmpty(user)) {
      return (
        <div>
          <div hidden={isSelf}>
            {isEmpty(followRelation) && <button onClick={handleFollowClick}>Follow</button>}
            {!isEmpty(followRelation) && <button onClick={handleFollowClick}>UnFollow</button>}
          </div>
          <h2>followRelation: {JSON.stringify(followRelation, null, 2)}</h2>
          <div onClick={handleUserClick}>
            <h2>{JSON.stringify(user, null, 2)}</h2>
          </div>
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
