import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getUsersByRequestId } from '../selectors/usersSelectors'
import UserList from '../components/UserList'
import usersActions from '../actions/usersActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import otherActions from '../actions/otherActions'
import * as utils from '../utils'

const selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
}
const componentName = 'SearchUserPage';
class SearchUserPage extends Component {
  componentDidMount() {
    this.fetchUsersRequestId = componentName + '_' + this.props.searchKeyword;
    this.handleFetchNewUsers('*', this.props.users);
  }
  componentWillUnmount() {
    this.props.removeRequestInfo(componentName);
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=${searchKeyword}&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
    value = utils.removeSpecialWordFromQuery(value);
    if(!value) value = '*';
    let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(value), this.props.usersSelector(componentName + '_' + value))
    this.props.fetchUsersStart(fetchNewUsersQueryStr, componentName + '_' + value);
  }
  handleFetchOldUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchOldUsersQueryStr = getFetchOldQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchOldUsersQueryStr, this.fetchUsersRequestId);
    }
  }
  handleFetchNewUsers = (searchKeyword, users) => {
    if(searchKeyword) {
      let fetchNewUsersQueryStr = getFetchNewQueryStr(this.genQueryStr(searchKeyword), users)
      this.props.fetchUsersStart(fetchNewUsersQueryStr, this.fetchUsersRequestId);
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
  let searchKeyword = getSearchKeyword(state, selectorParams) ? getSearchKeyword(state, selectorParams) : '*';
  let fetchUsersRequestId = componentName + '_' + searchKeyword;
  return {
    searchKeyword,
    users: getUsersByRequestId(state, fetchUsersRequestId),
    usersSelector: (arg) => getUsersByRequestId(state, ...arg),
  }
}

export default connect(mapStateToProps, {
  fetchUsersStart: usersActions.fetchUsersStart,
  removeRequestInfo: otherActions.removeRequestInfo,
})(SearchUserPage);
