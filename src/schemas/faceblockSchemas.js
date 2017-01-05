import { schema } from 'normalizr';

const userSchema = new schema.Entity('users');
const userListSchema = [userSchema];
const postSchema = new schema.Entity('posts', {
  user: userSchema,
});
const postListSchema = [postSchema];

export { userSchema, userListSchema, postSchema, postListSchema };
