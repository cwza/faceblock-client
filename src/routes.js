import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import HomePage from './containers/HomePage'
import PostDetailPage from './containers/PostDetailPage'
import GoogleOauth2Callback from './components/GoogleOauth2Callback'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="/users" component={UserPage} />
    <Route path="/post/:postId" component={PostDetailPage}></Route>
    <Route path="/googleOauth2Callback" component={GoogleOauth2Callback}></Route>
  </Route>
)
