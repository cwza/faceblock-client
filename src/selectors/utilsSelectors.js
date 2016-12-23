// import { createSelector } from 'reselect'

const getFaceblockEntities = (state={}) => {
  if(state.apis && state.apis.faceblock && state.apis.faceblock.entities)
    return state.apis.faceblock.entities;
  return {};
}

export { getFaceblockEntities };
