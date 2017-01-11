import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { memoize } from 'lodash'
import { getOrder } from './requestInfoSelectors'

const getFollowRelationsObject = createSelector(
  [getFaceblockEntities],
  (entities={}) => {
    if(entities.followRelations) return entities.followRelations;
    return {};
  }
);

const getFollowRelationsItems = createSelector(
  [getFollowRelationsObject],
  (followRelationsObject={}) => {
    if(followRelationsObject.items) return followRelationsObject.items;
    return {};
  }
);

const getAllFollowRelations = createSelector(
  [getFollowRelationsItems],
  (followRelationsItems={}) => Object.values(followRelationsItems)
);

const getFollowRelationByUserIdAndFollowerId = createSelector(
  [getAllFollowRelations],
  (followRelations=[]) => memoize (
    (userId, followerId) => {
      let followRelation = followRelations.filter(followRelation => followRelation.userId === userId && followRelation.followerId === followerId);
      if(followRelation.length > 0)
        return followRelation[0];
      return {};
    }
  )
);

const getUserIdsByFollowerId = createSelector(
  [getAllFollowRelations],
  (followRelations=[]) => memoize (
    (followerId) => {
      let result = followRelations.filter(followRelation => followRelation.followerId === followerId)
        .map(followRelation => followRelation.userId)
      return result;
    }
  )
)

const getFollowerIdsByUserId = createSelector(
  [getAllFollowRelations],
  (followRelations=[]) => memoize (
    (userId) => {
      let result = followRelations.filter(followRelation => followRelation.userId === userId)
        .map(followRelation => followRelation.followerId)
      return result;
    }
  )
)

const getFollowRelationsByRequestId = createSelector(
  [getFollowRelationsItems, getOrder],
  (followRelationItems={}, order) => {
    let result = order.reduce((result, followRelationId) => {
      if(followRelationItems[followRelationId.toString()])
        result.push(followRelationItems[followRelationId.toString()])
      return result;
    }, []);
    return result;
  }
)

export {
  getFollowRelationByUserIdAndFollowerId, getUserIdsByFollowerId, getAllFollowRelations,
  getFollowerIdsByUserId, getFollowRelationsByRequestId,
}
