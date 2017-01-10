import { createSelector } from 'reselect'

const getRequestInfoById = (state, requestId) => {
  console.log('requestId: ', requestId);
  if(state.apis.faceblock.requestInfo && state.apis.faceblock.requestInfo[requestId])
    return state.apis.faceblock.requestInfo[requestId];
  return {};
}

const getOrder = createSelector(
  [getRequestInfoById],
  (requestInfo={}) => {
    if(requestInfo.order) return requestInfo.order;
    return [];
  }
)

const getFetchingStatus = createSelector(
  [getRequestInfoById],
  (requestInfo={}) => {
    if([0, 1, 2].includes(requestInfo.fetchingStatus)) return requestInfo.fetchingStatus;
    return 0;
  }
)

export { getOrder, getFetchingStatus };
