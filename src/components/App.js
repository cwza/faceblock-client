import React, { Component } from 'react'
import { Link } from 'react-router'
// import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
        <h1>I am App Page.</h1>
        <ul role="navigation">
          <li><Link to="/" onlyActiveOnIndex={true} activeClassName="active">Home</Link></li>
          <li><Link to="/users" activeClassName="active">Users</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App;
