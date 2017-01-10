import { createSelector } from 'reselect'
import { getFaceblockEntities } from './utilsSelectors'
import { memoize } from 'lodash'

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
    ({userId, followerId}) => {
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
    ({followerId}) => {
      let result = followRelations.filter(followRelation => followRelation.followerId === followerId)
        .map(followRelation => followRelation.userId)
      return result;
    }
  )
)

export {
  getFollowRelationByUserIdAndFollowerId, getUserIdsByFollowerId
}
