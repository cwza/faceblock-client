import React, { Component } from 'react'
import { connect } from 'react-redux'

let queryStr = 'q=userId:(1)&sort=createTime&order=desc&limit=5';
// let queryParams = {userIds: [1], contentContains: '#cwz', sort: 'createTime', order: 'desc', limit: 5};
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>I am Home Page.</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
}

export default connect(mapStateToProps, {
})(HomePage);
