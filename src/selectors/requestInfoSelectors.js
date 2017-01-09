import { createSelector } from 'reselect'

const getRequestInfoById = (state, requestId) => {
  if(state.apis.faceblock.requestInfo && state.apis.faceblock.requestInfo[requestId])
    return state.apis.faceblock.requestInfo[requestId];
  return {};
}

const getOrder = createSelector(
  [getRequestInfoById],
  (requestInfo) => {
    if(requestInfo.order) return requestInfo.order;
    return [];
  }
)

export { getOrder };
