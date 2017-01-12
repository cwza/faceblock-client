import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../components/UserList'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import { getUsersByRequestId } from '../selectors/usersSelectors'
import { getFetchingStatus } from '../selectors/requestInfoSelectors'
import usersActions from '../actions/usersActions'
import Loading from '../components/Loading'

class UserListContainer extends Component {
  componentDidMount() {
    let { users, fetchUsersStatus, queryStr, fetchUsersRequestId } = this.props;
    if(fetchUsersStatus === 0)
      this.handleFetchNewUsers(queryStr, users, fetchUsersRequestId);
  }
  componentDidUpdate() {
    let { users, fetchUsersStatus, queryStr, fetchUsersRequestId } = this.props;
    if(fetchUsersStatus === 0)
      this.handleFetchNewUsers(queryStr, users, fetchUsersRequestId);
  }
  handleFetchOldUsers = (queryStr, users, fetchUsersRequestId) => {
    let fetchOldUsersQueryStr = getFetchOldQueryStr(queryStr, users)
    this.props.fetchUsersStart(fetchOldUsersQueryStr, fetchUsersRequestId);
  }
  handleFetchNewUsers = (queryStr, users, fetchUsersRequestId) => {
    let fetchNewUsersQueryStr = getFetchNewQueryStr(queryStr, users)
    this.props.fetchUsersStart(fetchNewUsersQueryStr, fetchUsersRequestId);
  }
  render() {
    let { users, queryStr, fetchUsersRequestId, fetchUsersStatus } = this.props;
    return (
      <div>
        <h1>I am UserListContainer.</h1>
        {fetchUsersStatus === 1 && <Loading />}
        <UserList users={users}
          handleFetchOldUsers={() => this.handleFetchOldUsers(queryStr, users, fetchUsersRequestId)}
          handleFetchNewUsers={() => this.handleFetchNewUsers(queryStr, users, fetchUsersRequestId)} />
      </div>
    )
  }
}

UserListContainer.propTypes = {
  queryStr: React.PropTypes.string.isRequired,
  fetchUsersRequestId: React.PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  let { fetchUsersRequestId } = props;
  return {
    users: getUsersByRequestId(state, fetchUsersRequestId),
    fetchUsersStatus: getFetchingStatus(state, fetchUsersRequestId),
  }
}

export default connect(mapStateToProps, {
  fetchUsersStart: usersActions.fetchUsersStart,
})(UserListContainer);
