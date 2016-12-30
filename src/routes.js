import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Private from './containers/Private'
import UserPage from './containers/UserPage'
import HomePage from './containers/HomePage'
import PostDetailPage from './containers/PostDetailPage'
import GoogleOauth2Callback from './containers/GoogleOauth2Callback'

export default (
  <Route path="/" component={App}>
    <Route component={Private}>
      <IndexRoute component={HomePage} />
      <Route path="/users" component={UserPage} />
      <Route path="/post/:postId" component={PostDetailPage}></Route>
    </Route>
    <Route path="/googleOauth2Callback" component={GoogleOauth2Callback}></Route>
  </Route>
)
