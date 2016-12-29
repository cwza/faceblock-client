import { expect } from 'chai'
import errorReducer from './errorReducer'
import otherActions from '../actions/otherActions'

let apiResponse = {
  error: {
    status: 404,
    message: 'page not found',
  }
}
it('#errorReducer setError', () => {
  let oriState = {};
  let expectedState = apiResponse.error;
  let newState = errorReducer(oriState, otherActions.setError(apiResponse))
  expect(newState).to.deep.equal(expectedState)
});
it('#errorReducer resetError', () => {
  let expectedState = null;
  let newState = errorReducer(apiResponse.error, otherActions.resetError())
  expect(newState).to.deep.equal(expectedState)
});
