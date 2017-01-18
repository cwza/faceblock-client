import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Form, Input } from 'reactstrap';

let renderField = ({
    input, handleOnChange,
    meta: { touched, error, warning }, ...rest
  }) => (
  <Input {...rest} type="search" onChange={(e) => {
      input.onChange(e);
      handleOnChange(e.target.value);
  }}/>
);
class KeywordSearchForm extends Component {
  render() {
    let { handleOnChange } = this.props;
    return (
      <div>
        <h1 hidden>I am KeywordSearchForm.</h1>
        <Form id="KeywordSearchForm">
          <Field handleOnChange={handleOnChange} name="searchKeyword" component={renderField} placeholder="input search keyword"/>
        </Form>
      </div>
    )
  }
}

KeywordSearchForm.propTypes = {
  handleOnChange: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'KeywordSearch', // a unique name for this form
})(KeywordSearchForm);
