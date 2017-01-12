import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import otherActions from '../actions/otherActions'
import UserListContainer from './UserListContainer'

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
  genFetchUsersRequestId = (searchKeyword) => {
    return componentName + '_' + searchKeyword;
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=${searchKeyword}&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
  }
  renderUserListContainer = (searchKeyword) => {
    return (
      <UserListContainer
        queryStr={this.genQueryStr(searchKeyword)}
        fetchUsersRequestId={this.genFetchUsersRequestId(searchKeyword)}/>
    )
  }
  render() {
    let { searchKeyword } = this.props;
    return (
      <div>
        <h1 hidden>I am SearchUserPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2 hidden>{this.genQueryStr(searchKeyword)}</h2>
        {this.renderUserListContainer(searchKeyword)}
      </div>
    )
  }
}

SearchUserPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let searchKeyword = getSearchKeyword(state, selectorParams);
  return {
    searchKeyword,
  }
}

export default connect(mapStateToProps, {
  removeRequestInfo: otherActions.removeRequestInfo,
})(SearchUserPage);
