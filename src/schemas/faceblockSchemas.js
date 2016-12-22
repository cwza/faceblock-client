import { Schema } from 'normalizr';

let post = new Schema('posts');
let user = new Schema('users');

post.define({
  user: user,
});

export { post, user };
