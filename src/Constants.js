const POSTS_COUNT_PER_PAGE = 10;
const DATETIME_FIELDS = ['createTime', 'updateTime'];
const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://cwza.github.io'
const ROOT_PATH = '/faceblock-client'

export { POSTS_COUNT_PER_PAGE, DATETIME_FIELDS, HOST, ROOT_PATH };
