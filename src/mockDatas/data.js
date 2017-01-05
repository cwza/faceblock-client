import { postListSchema, userListSchema } from '../schemas/faceblockSchemas'
import { normalize } from 'normalizr'
import * as utils from '../utils'
import { DATETIME_FIELDS } from '../Constants'
const postsResponse = require('./postsData.json');
const usersResponse = require('./usersData.json');

let posts = postsResponse.entities.posts;
posts = posts.map(post => utils.parseTimeStrFieldToDate(post, DATETIME_FIELDS));
let postsItems = normalize(posts, postListSchema).entities.posts;
let users = usersResponse.entities.users;
users = users.map(user => utils.parseTimeStrFieldToDate(user, DATETIME_FIELDS));
let usersItems = normalize(users, userListSchema).entities.users;

export {posts, postsItems, users, usersItems};
