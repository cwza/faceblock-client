Project skeleton is created by create-react-app.

A small twitter like SPA app.  
Pure Client Rendering.
Server Side is at [faceblock-server](https://github.com/cwza/faceblock-server)

# Features
* Use google account to login
* Follow user
* Show following's posts and self posts
* Show posts, users with infinite scroll
* Add post, Add post to post to post...(recursive comments)
* Search posts, users reactively

# Library
* Core:
  react, redux, react-router, react-router-redux, redux-saga, reselect, normalizr,
  redux-form, reduxLocalStorage

* Css:
  Twitter Bootstrap 4 with Reactstrap

* Test:
  Jest

* Deploy:
  Github page, spa-github-pages

# Redux state like:
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
