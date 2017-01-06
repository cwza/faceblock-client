import { schema } from 'normalizr';

const userSchema = new schema.Entity('users');
const userListSchema = [userSchema];
const postSchema = new schema.Entity('posts', {
  user: userSchema,
});
const postListSchema = [postSchema];
const followRelationSchema = new schema.Entity('followRelations', {
  user: userSchema,
  follower: userSchema,
});
const followRelationListSchema = [followRelationSchema];

export { userSchema, userListSchema, postSchema, postListSchema, followRelationSchema, followRelationListSchema };
