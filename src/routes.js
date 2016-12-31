import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import HomePage from './containers/HomePage'
import PostDetailPage from './containers/PostDetailPage'
import GoogleOauth2Callback from './containers/GoogleOauth2Callback'
import Authentication from './components/Authentication'

const needLogin = () => {
  let reduxLocalStorage = localStorage.getItem('redux');
  if(reduxLocalStorage)
    reduxLocalStorage = JSON.parse(reduxLocalStorage);
  if(reduxLocalStorage && reduxLocalStorage.localStorage && reduxLocalStorage.localStorage.authentication)
    return !reduxLocalStorage.localStorage.authentication.item.faceblockToken
}

const requireAuth = (nextState, replace) => {
   if (needLogin()) {
     replace({
       pathname: '/authentication',
     })
   }
}

export default (
  <Route path="/" component={App}>
    <Route component={(props) => (<div>{props.children}</div>)} onEnter={requireAuth}>
      <IndexRoute component={HomePage} />
      <Route path="/users" component={UserPage} />
      <Route path="/post/:postId" component={PostDetailPage}></Route>
    </Route>
    <Route path="/authentication" component={Authentication}></Route>
    <Route path="/googleOauth2Callback" component={GoogleOauth2Callback}></Route>
  </Route>
)
