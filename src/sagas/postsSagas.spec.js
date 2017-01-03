import { expect } from 'chai'
import { call, put, select, take} from 'redux-saga/effects'
import * as postsService from '../services/faceblock/postsApis'
import postsActions from '../actions/postsActions'
import otherActions from '../actions/otherActions'
import { getPostsForHomePageByTime } from '../selectors/postsSelectors'
import { posts } from '../mockDatas/data'
const postsSagas = require('./postsSagas').private;

describe('#callPostsApi() fetchPosts', () => {
  it('should call postsService.fetchPosts if success should dispatch fetchPostsSuccess otherwise dispatch fetchPostsError', () => {
    let queryStr = 'q=userId:(1)&sort=createTime&order=desc&limit=5';
    let response = {response: {}};
    let error = {error: {}};
    let apiName = 'fetchPosts';
    let iter = postsSagas.callPostsApi(apiName, queryStr);
    expect(iter.next().value).to.deep.equal(
      call(postsService[apiName], queryStr)
    );
    expect(iter.next(response).value).to.deep.equal(
      put(postsActions[apiName + 'Success']({response}))
    );
    expect(iter.throw(error).value).to.deep.equal(
      put(otherActions.setError({error}))
    );
  });
});

describe('#getFetchOldPostsQueryStr()', () => {
  it('should call getPostsForHomePageByTime selector and return new queryStr', () => {
    let queryStr = 'q=userId:(1)&sort=createTime&order=desc&limit=5';
    let props = {};
    let iter = postsSagas.getFetchOldPostsQueryStr(queryStr, getPostsForHomePageByTime, props);
    expect(iter.next().value).to.deep.equal(
      select(getPostsForHomePageByTime, props)
    );
    expect(iter.next(posts).value).to.deep.equal(
      queryStr + '&underNearId=1'
    );
  });
});

describe('#watchFetchOldPostsStart()', () => {
  it('', () => {
    let iter = postsSagas.watchFetchOldPostsStart();
    expect(iter.next().value).to.deep.equal(
      take(postsActions.fetchOldPostsStart().type)
    );
  });
})
