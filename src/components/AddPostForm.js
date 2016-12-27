import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

class AddPostForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.props.handleSubmit.bind(this);
  }
  render() {
    let { handleSubmit } = this.props;
    return (
      <div>
        <h1>I am AddPost.</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="content">Content</label>
            <Field name="content" component="input" type="text"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'AddPost' // a unique name for this form
})(AddPostForm);
