import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if(!values.content)
    errors.content = 'Required'
  return errors;
}

const renderTextAreaField = ({
    input, label,
    meta: { touched, error, warning }, ...rest
  }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea form="AddPostForm" cols="35" wrap="soft" {...input} {...rest} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

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
        <form id="AddPostForm" onSubmit={handleSubmit}>
          <div>
            <Field name="content" placeholder="input something" component={renderTextAreaField} label="Content" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

AddPostForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'AddPost', // a unique name for this form
  validate,
})(AddPostForm);
