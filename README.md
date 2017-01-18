Project is created by create-react-app.

Core:
  react, redux, react-router, react-router-redux, redux-saga, reselect, normalizr,
  redux-form, reduxLocalStorage

Css:
  Twitter Bootstrap 4 with Reactstrap

Test:
  Jest

Deploy:
  Github page, spa-github-pages

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
