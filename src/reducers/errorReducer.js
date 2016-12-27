import otherActions from '../actions/otherActions'

const errorReducer = (state=null, action) => {
  switch(action.type) {
    case otherActions.setError().type:
      return action.payload.error;
    case otherActions.resetError().type:
      return null;
    default:
      return state;
  }
}

export default errorReducer;
