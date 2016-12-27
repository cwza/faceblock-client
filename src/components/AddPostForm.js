import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if(!values.content)
    errors.content = 'Required'
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
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
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="content" type="text" component={renderField} label="Content"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'AddPost', // a unique name for this form
  validate,
})(AddPostForm);
