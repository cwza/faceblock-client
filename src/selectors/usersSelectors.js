import { createSelector } from 'reselect'
import { getFaceblockEntities, getAuthentication} from './utilsSelectors'
import { getOrder } from './requestInfoSelectors'
import { getUserIdsByFollowerId, getFollowerIdsByUserId, getFollowRelationsByRequestId } from './followRelationsSelectors'
import { memoize } from 'lodash'

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
    }, []);
    return result;
  }
)

const getFollowingsByFollowerId = createSelector(
  [getUsersItems, (state, followerId) => getUserIdsByFollowerId(state)(followerId)],
  (usersItems={}, followingsIds=[], followerId) => memoize (
    (followerId) => {
      let result = followingsIds.reduce((result, followingsId) => {
        if(usersItems[followingsId.toString()])
          result.push(usersItems[followingsId.toString()])
        return result;
      }, []);
      return result;
    }
  )
)

const getFollowersByUserId = createSelector(
  [getUsersItems, (state, userId) => getFollowerIdsByUserId(state)(userId)],
  (usersItems={}, followerIds=[], userId) => memoize (
    (userId) => {
      console.log('followerIds: ', followerIds, ' userId: ', userId);
      let result = followerIds.reduce((result, followerId) => {
        if(usersItems[followerId.toString()])
          result.push(usersItems[followerId.toString()])
        return result;
      }, []);
      return result;
    }
  )
)

const getFollowersByFollowRelationsRequestId = createSelector(
  [getUsersItems, getFollowRelationsByRequestId],
  (userItems={}, followRelations=[]) => {
    let result = followRelations.reduce((result, followRelation) => {
      if(userItems[followRelation.followerId.toString()])
        result.push(userItems[followRelation.followerId.toString()])
      return result;
    }, []);
    return result;
  }
)

const getFollowingsByFollowRelationsRequestId = createSelector(
  [getUsersItems, getFollowRelationsByRequestId],
  (userItems={}, followRelations=[]) => {
    let result = followRelations.reduce((result, followRelation) => {
      if(userItems[followRelation.userId.toString()])
        result.push(userItems[followRelation.userId.toString()])
      return result;
    }, []);
    return result;
  }
)

export {
  getSelfId, getFriendsIds, getSelfUser, getUsersByRequestId, getUserById,
  getFollowingsByFollowerId, getFollowersByUserId, getFollowersByFollowRelationsRequestId,
  getFollowingsByFollowRelationsRequestId,
};
