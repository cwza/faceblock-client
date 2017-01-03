import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserPostsPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am UserPostsPage.</h1>
      </div>
    )
  }
}

UserPostsPage.propTypes = {
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {
})(UserPostsPage);
