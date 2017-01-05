import { createSelector } from 'reselect'
import { removeSpecialWordFromQuery } from '../utils'

const getInputValue = (state={}, {formName, fieldName}) => {
  if(state.form[formName] && state.form[formName].values && state.form[formName].values[fieldName])
    return state.form[formName].values[fieldName];
  return '';
}

const getSearchKeyword = createSelector(
  [getInputValue],
  (inputValue) => removeSpecialWordFromQuery(inputValue)
)

export { getSearchKeyword };
