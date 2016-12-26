import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { usersItems } from '../mockDatas/data'

const getUsersObject = createSelector(
  [getFaceblockEntities],
  (entities={}) => {
    if(entities.users) return entities.users;
    return {};
  }
);

//TODO: getRealUsersItems
const getUsersItems = createSelector(
  [getUsersObject],
  (usersObject={}) => {
    // if(usersObject.items) return usersObject.items;
    // return {};
    return usersItems
  }
);

//TODO: implement this
const getSelfId = (state) => {
  return 1;
}

//TODO: implement this
const getFriendsIds = (state) => {
  return [2];
}

const getSelfUser = createSelector(
  [getUsersItems, getSelfId],
  (usersItems={}, selfId) => {
    if(usersItems[selfId]) return usersItems[selfId];
    return {};
  }
)

export {getSelfId, getFriendsIds, getSelfUser};
