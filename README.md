Project is created by create-react-app.

Core:
  react, redux, react-router, react-router-redux, redux-saga, reselect, normalizr

Test:
  Jest

Redux state like:
``` js
{
  apis: {
    faceblock: {
      entities: {
        posts: {
          items: {},
        }
      },
      requestInfo: {
        [requestId]: {
          order: [],
          fetchingStatus: 0,
        }
      }
    }   
  },
  components: {},
  localStorage: {
    authentication: {
      item {
        userId, faceblockToken
      },
      isFetching
    }
  }
}
```
