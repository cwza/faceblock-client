import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getUsersForSearchUserPage } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import usersActions from '../actions/usersActions'

let selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
}
class SearchUserPage extends Component {
  componentDidMount() {
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=mail:(*${searchKeyword}*)&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
    if(value)
      this.props.fetchOldUsersStart(this.genQueryStr(value), getUsersForSearchUserPage, selectorParams);
  }
  handleFetchOldUsers = (searchKeyword) => {
    if(searchKeyword)
      this.props.fetchOldUsersStart(this.genQueryStr(searchKeyword), getUsersForSearchUserPage, selectorParams);
  }
  handleFetchNewUsers = (searchKeyword) => {
    if(searchKeyword)
      this.props.fetchNewUsersStart(this.genQueryStr(searchKeyword), getUsersForSearchUserPage, selectorParams);
  }
  render() {
    let { searchKeyword, users } = this.props;
    return (
      <div>
        <h1>I am SearchUserPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        <UserList users={users}
          handleFetchOldUsers={() => this.handleFetchOldUsers(searchKeyword)}
          handleFetchNewUsers={() => this.handleFetchNewUsers(searchKeyword)} />
      </div>
    )
  }
}

SearchUserPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  return {
    searchKeyword: getSearchKeyword(state, selectorParams),
    users: getUsersForSearchUserPage(state, selectorParams),
  }
}

export default connect(mapStateToProps, {
  fetchOldUsersStart: usersActions.fetchOldUsersStart,
  fetchNewUsersStart: usersActions.fetchNewUsersStart,
})(SearchUserPage);
