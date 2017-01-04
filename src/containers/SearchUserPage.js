import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getUsersForSearchUserPage } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import usersActions from '../actions/usersActions'

class SearchUserPage extends Component {
  componentDidMount() {
  }
  genQueryStr = (searchKeyword) => {
    return `q=mail:(*${searchKeyword}*)&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
    let { searchKeyword } = this.props;
    this.props.fetchOldUsersStart(this.genQueryStr(searchKeyword), getUsersForSearchUserPage, 'KeywordSearch', 'searchKeyword');
  }
  handleFetchOldUsers = () => {
    let { searchKeyword } = this.props;
    this.props.fetchOldUsersStart(this.genQueryStr(searchKeyword), getUsersForSearchUserPage, 'KeywordSearch', 'searchKeyword');
  }
  handleFetchNewUsers = () => {
    let { searchKeyword } = this.props;
    this.props.fetchNewUsersStart(this.genQueryStr(searchKeyword), getUsersForSearchUserPage, 'KeywordSearch', 'searchKeyword');
  }
  render() {
    let { searchKeyword, users } = this.props;
    return (
      <div>
        <h1>I am SearchUserPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        <UserList users={users}
          handleFetchOldUsers={this.handleFetchOldUsers}
          handleFetchNewUsers={this.handleFetchNewUsers} />
      </div>
    )
  }
}

SearchUserPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  return {
    searchKeyword: getSearchKeyword(state, 'KeywordSearch', 'searchKeyword'),
    users: getUsersForSearchUserPage(state, 'KeywordSearch', 'searchKeyword'),
  }
}

export default connect(mapStateToProps, {
  fetchOldUsersStart: usersActions.fetchOldUsersStart,
  fetchNewUsersStart: usersActions.fetchNewUsersStart,
})(SearchUserPage);
