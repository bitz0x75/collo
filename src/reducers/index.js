import { combineReducers } from 'redux'

import imageReducer from "./imageReducer"
import errorsReducer from "./errorsReducer"

export default combineReducers({
  errors: errorsReducer,
  images: imageReducer,
});
