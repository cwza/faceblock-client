import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getPostsForSearchPostPage } from '../selectors/postsSelectors'
import PostList from '../components/PostList'
import postsActions from '../actions/postsActions'
import { getFetchOldQueryStr, getFetchNewQueryStr } from '../services/faceblock/utilsApis'

let selectorParams = {
  formName: 'KeywordSearch',
  fieldName: 'searchKeyword'
}
class SearchPostPage extends Component {
  componentDidMount() {
  }
  genQueryStr = (searchKeyword) => {
    searchKeyword = encodeURIComponent(searchKeyword);
    return `q=content:(*${searchKeyword}*)&sort=createTime&order=desc&limit=5`;
  }
  handleSearchFormOnChange = (value) => {
    if(value)
      this.handleFetchNewPosts(value, this.props.posts);
  }
  handleFetchOldPosts = (searchKeyword, posts) => {
    if(searchKeyword) {
      let fetchOldPostsQueryStr = getFetchOldQueryStr(this.genQueryStr(searchKeyword), posts)
      this.props.fetchPostsStart(fetchOldPostsQueryStr);
    }
  }
  handleFetchNewPosts = (searchKeyword, posts) => {
    if(searchKeyword) {
      let fetchNewPostsQueryStr = getFetchNewQueryStr(this.genQueryStr(searchKeyword), posts)
      this.props.fetchPostsStart(fetchNewPostsQueryStr);
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
  return {
    searchKeyword: getSearchKeyword(state, selectorParams),
    posts: getPostsForSearchPostPage(state, selectorParams),
  }
}

export default connect(mapStateToProps, {
  fetchPostsStart: postsActions.fetchPostsStart,
})(SearchPostPage);
