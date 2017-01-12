import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

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
  <FormGroup>
    <Label>{label}</Label>
    <div>
      <Input type="textarea" form="AddPostForm" rows="8" wrap="soft" {...input} {...rest} />
      {touched && ((error && <span style={{color:"red"}}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </FormGroup>
)

class AddPostForm extends Component {
  render() {
    let { handleSubmit } = this.props;
    return (
      <div>
        <h1 hidden>I am AddPost.</h1>
        <Container center-block>
          <Form id="AddPostForm" onSubmit={handleSubmit}>
            <Field name="content" placeholder="input something" component={renderTextAreaField} label="Content" />
            <Button className="btn-block" color="primary" type="submit">Add New Post</Button>
          </Form>
        </Container>
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
