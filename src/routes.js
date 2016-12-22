import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import UserPage from './containers/UserPage'
import HomePage from './containers/HomePage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
    <Route path="/users" component={UserPage} />
  </Route>
)
