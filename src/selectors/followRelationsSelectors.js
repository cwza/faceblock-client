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

const getIsFetching = createSelector(
  [getFollowRelationsObject],
  (followRelationsObject={}) => {
    if(followRelationsObject.isFetching) return followRelationsObject.isFetching;
    return false;
  }
)

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
  (followRelations={}) => memoize (
    ({userId, followerId}) => {
      let followRelation = followRelations.filter(followRelation => followRelation.userId === userId && followRelation.followerId === followerId);
      if(followRelation.length > 0)
        return followRelation[0];
      return {};
    }
  )
);

export {
  getFollowRelationByUserIdAndFollowerId, getIsFetching
}
