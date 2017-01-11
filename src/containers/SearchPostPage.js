import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getPostsByRequestId } from '../selectors/postsSelectors'
import PostList from '../components/PostList'
import postsActions from '../actions/postsActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'
import otherActions from '../actions/otherActions'
import * as utils from '../utils'

const selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
};
const componentName = 'SearchPostPage';
class SearchPostPage extends Component {
  componentDidMount() {
    this.handleFetchNewPosts('*', this.props.posts);
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
    let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(value), this.props.postsSelector(componentName + '_' + value))
    this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + value);
  }
  handleFetchOldPosts = (searchKeyword, posts) => {
    if(searchKeyword) {
      let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(searchKeyword), posts)
      this.props.fetchPostsStart(fetchOldPostsQueryStr, componentName + '_' + searchKeyword);
    }
  }
  handleFetchNewPosts = (searchKeyword, posts) => {
    if(searchKeyword) {
      let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(searchKeyword), posts)
      this.props.fetchPostsStart(fetchNewPostsQueryStr, componentName + '_' + searchKeyword);
    }
  }
  render() {
    let { searchKeyword, posts } = this.props;
    return (
      <div>
        <h1>I am SearchPostPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(searchKeyword, posts)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(searchKeyword, posts)} />
      </div>
    )
  }
}

SearchPostPage.propTypes = {
}

const mapStateToProps = (state, props) => {
  let searchKeyword = getSearchKeyword(state, selectorParams) ? getSearchKeyword(state, selectorParams) : '*';
  return {
    searchKeyword,
    posts: getPostsByRequestId(state, componentName + '_' + searchKeyword),
    postsSelector: (arg) => getPostsByRequestId(state, ...arg),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
  removeRequestInfo: otherActions.removeRequestInfo,
})(SearchPostPage);
