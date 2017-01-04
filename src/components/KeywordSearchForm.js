import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';


let renderField = ({
    input, handleOnChange,
    meta: { touched, error, warning }, ...rest
  }) => (
  <input {...rest} type="text" onChange={(e) => {
      handleOnChange(e.target.value);
      input.onChange(e);
  }}/>
);
class KeywordSearchForm extends Component {
  render() {
    let { handleOnChange } = this.props;
    return (
      <div>
        <h1>I am AddPost.</h1>
        <form id="KeywordSearchForm">
          <div>
            <Field handleOnChange={handleOnChange} name="searchKeyword" component={renderField} placeholder="input search keyword"/>
          </div>
        </form>
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
