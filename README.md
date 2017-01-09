Project is created by create-react-app 1.0.2 and run eject for customize.

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
          isFetching: false
        }
      },
      requestInfo: {
        [requestId]: {
          order: []
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
