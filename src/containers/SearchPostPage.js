import React, { Component } from 'react'
import { connect } from 'react-redux'
import KeywordSearchForm from '../components/KeywordSearchForm'
import { getSearchKeyword } from '../selectors/formSelectors'
import { getPostsForSearchPostPage } from '../selectors/postsSelectors'
import PostList from '../components/PostList'
import postsActions from '../actions/postsActions'

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
      this.props.fetchOldPostsStart(this.genQueryStr(value), getPostsForSearchPostPage, selectorParams);
  }
  handleFetchOldPosts = (searchKeyword) => {
    if(searchKeyword)
      this.props.fetchOldPostsStart(this.genQueryStr(searchKeyword), getPostsForSearchPostPage, selectorParams);
  }
  handleFetchNewPosts = (searchKeyword) => {
    if(searchKeyword)
      this.props.fetchNewPostsStart(this.genQueryStr(searchKeyword), getPostsForSearchPostPage, selectorParams);
  }
  render() {
    let { searchKeyword, posts } = this.props;
    return (
      <div>
        <h1>I am SearchPostPage.</h1>
        <KeywordSearchForm handleOnChange={this.handleSearchFormOnChange} />
        <h2>{this.genQueryStr(searchKeyword)}</h2>
        <PostList posts={posts}
          handleFetchOldPosts={() => this.handleFetchOldPosts(searchKeyword)}
          handleFetchNewPosts={() => this.handleFetchNewPosts(searchKeyword)} />
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
  fetchOldPostsStart: postsActions.fetchOldPostsStart,
  fetchNewPostsStart: postsActions.fetchNewPostsStart,
})(SearchPostPage);
