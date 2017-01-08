import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getUsersForSearchUserPage } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import usersActions from '../actions/usersActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

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
      this.handleFetchNewUsers(value, this.props.users);
  }
  handleFetchOldUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchOldUsersQueryStr = getFetchOldQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchOldUsersQueryStr);
    }
  }
  handleFetchNewUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchNewUsersQueryStr);
    }
  }
  render() {
    let { searchKeyword, users } = this.props;
    return (
      <div>
        <h1>I am SearchUserPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        <UserList users={users}
          handleFetchOldUsers={() => this.handleFetchOldUsers(searchKeyword, users)}
          handleFetchNewUsers={() => this.handleFetchNewUsers(searchKeyword, users)} />
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
  fetchUsersStart: usersActions.fetchUsersStart,
})(SearchUserPage);
