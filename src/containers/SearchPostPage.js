import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import otherActions from '../actions/otherActions'
import PostListContainer from './PostListContainer'

const selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
};
const componentName = 'SearchPostPage';
class SearchPostPage extends Component {
  componentDidMount() {
  }
  componentWillUnmount() {
    this.props.removeRequestInfo(componentName);
  }
  genFetchPostsRequestId = () => {
    return componentName + '_' + this.props.searchKeyword;
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=${searchKeyword}&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
  }
  renderPostListContainer = (searchKeyword) => {
    return (
      <PostListContainer
        queryStr={this.genQueryStr(searchKeyword)}
        fetchPostsRequestId={this.genFetchPostsRequestId(searchKeyword)}/>
    )
  }
  render() {
    let { searchKeyword } = this.props;
    return (
      <div>
        <h1>I am SearchPostPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        {this.renderPostListContainer(searchKeyword)}
      </div>
    )
  }
}

SearchPostPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let searchKeyword = getSearchKeyword(state, selectorParams);
  return {
    searchKeyword,
    postsSelector: (arg) => getPostsByRequestId(state, ...arg),
  }
}

export default connect(mapStateToProps, {
  removeRequestInfo: otherActions.removeRequestInfo,
})(SearchPostPage);
