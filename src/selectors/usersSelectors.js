import { createSelector } from 'reselect'
import { getFaceblockEntities, getAuthentication} from './utilsSelectors'
import { getSearchKeyword } from './formSelectors'

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

const getAllUsers = createSelector(
  [getUsersItems],
  (usersItems={}) => Object.values(usersItems)
);

const getUsersForSearchUserPage = createSelector(
  [getAllUsers, getSearchKeyword],
  (users=[], searchKeyword) => {
    console.log('searchKeyword: ', searchKeyword);
    let result = users.filter(user => searchKeyword && user.mail.includes(searchKeyword))
      .slice(0).sort((a, b) => b.createTime - a.createTime || b.id - a.id);
    return result;
  }
)

export {getSelfId, getFriendsIds, getSelfUser, getUsersForSearchUserPage};
