import { createSelector } from 'reselect'
import { getFaceblockEntities, getAuthentication} from './utilsSelectors'
import { getOrder } from './requestInfoSelectors'

const getUserById = (state, userId) => {
  if(state.apis.faceblock.entities && state.apis.faceblock.entities.users
    && state.apis.faceblock.entities.users.items && state.apis.faceblock.entities.users.items[userId])
    return state.apis.faceblock.entities.users.items[userId];
  return {};
}

const getUsersObject = createSelector(
  [getFaceblockEntities],
  (entities={}) => {
    if(entities.users) return entities.users;
    return {};
  }
);

const getUsersItems = createSelector(
  [getUsersObject],
  (usersObject={}) => {
    if(usersObject.items) return usersObject.items;
    return {};
  }
);

const getSelfId = createSelector(
  [getAuthentication],
  (authentication={}) => {
    if(authentication.item && authentication.item.userId)
      return authentication.item.userId;
    return 0;
  }
)

//TODO: implement this
const getFriendsIds = (state) => {
  return [1, 2];
}

const getSelfUser = createSelector(
  [getUsersItems, getSelfId],
  (usersItems={}, selfId) => {
    if(usersItems[selfId]) return usersItems[selfId];
    return {};
  }
)

// const getAllUsers = createSelector(
//   [getUsersItems],
//   (usersItems={}) => Object.values(usersItems)
// );

const getUsersByRequestId = createSelector(
  [getUsersItems, getOrder],
  (usersItems={}, order) => {
    let result = order.reduce((result, userId) => {
      if(usersItems[userId.toString()])
        result.push(usersItems[userId.toString()])
      return result;
    },[])
    return result;
  }
)

export {getSelfId, getFriendsIds, getSelfUser, getUsersByRequestId, getUserById};
