// import { createSelector } from 'reselect'

const getError = (state={}) => state.error

const getFaceblockEntities = (state={}) => {
  if(state.apis && state.apis.faceblock && state.apis.faceblock.entities)
    return state.apis.faceblock.entities;
  return {};
}

const getAuthentication = (state={}) => {
  if(state.localStorage && state.localStorage.authentication)
    return state.localStorage.authentication;
}

export { getFaceblockEntities, getError , getAuthentication };
