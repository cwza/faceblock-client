import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import UserPostsPage from './containers/UserPostsPage'
import PostDetailPage from './containers/PostDetailPage'
import SearchUserPage from './containers/SearchUserPage'
import SearchPostPage from './containers/SearchPostPage'
import NoMatchPage from './components/NoMatchPage'
import GoogleOauth2Callback from './containers/GoogleOauth2Callback'
import Authentication from './components/Authentication'
import Private from './containers/Private'
import UserFollowingsPage from './containers/UserFollowingsPage'
import UserFollowersPage from './containers/UserFollowersPage'

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

const propsComponent = (component, extraProps) => {
  return (props, params) => React.createElement(
    component, {...props, ...extraProps, key: props.router.location.pathname})
}

export default (
  <Route path="/" component={App}>
    <Route component={Private} onEnter={requireAuth}>
      <IndexRoute component={HomePage} />
      <Route path="/UserPostsPage/:userId" component={propsComponent(UserPostsPage)} />
      <Route path="/UserFollowingsPage/:userId" component={propsComponent(UserFollowingsPage)} />
      <Route path="/UserFollowersPage/:userId" component={propsComponent(UserFollowersPage)} />
      <Route path="/post/:postId" component={propsComponent(PostDetailPage)}></Route>
      <Route path="/SearchUserPage" component={propsComponent(SearchUserPage)}></Route>
      <Route path="/SearchPostPage" component={propsComponent(SearchPostPage)}></Route>
    </Route>
    <Route path="/authentication" component={Authentication}></Route>
    <Route path="/googleOauth2Callback" component={GoogleOauth2Callback}></Route>
    <Route path="*" component={NoMatchPage}/>
  </Route>
)
