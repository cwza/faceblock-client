import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getUsersByRequestId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import usersActions from '../actions/usersActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import otherActions from '../actions/otherActions'

const selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
}
const componentName = 'SearchUserPage';
class SearchUserPage extends Component {
  componentDidMount() {
  }
  componentWillUnmount() {
    this.props.removeRequestInfo(componentName);
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=${searchKeyword}&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
    if(value) {
      let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(value), this.props.usersSelector(componentName + '_' + value))
      this.props.fetchUsersStart(fetchNewUsersQueryStr, componentName + '_' + value);
    }
  }
  handleFetchOldUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchOldUsersQueryStr = getFetchOldQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchOldUsersQueryStr, componentName + '_' + searchKeyword);
    }
  }
  handleFetchNewUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchNewUsersQueryStr, componentName + '_' + searchKeyword);
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
    users: getUsersByRequestId(state, componentName + '_' + getSearchKeyword(state, selectorParams)),
    usersSelector: (arg) => getUsersByRequestId(state, ...arg),
  }
}

export default connect(mapStateToProps, {
  fetchUsersStart: usersActions.fetchUsersStart,
  removeRequestInfo: otherActions.removeRequestInfo,
})(SearchUserPage);
