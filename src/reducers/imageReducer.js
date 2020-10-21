import _ from "lodash"

import * as actionTypes from "../actions/types"
import errors from "./errorsReducer"

export default (state={}, action) => {
  switch(action.type) {
    case actionTypes.GET_IMAGES: 
      return {...state, ..._.mapKeys(action.payload, "id")}
    case actionTypes.GET_IMAGES_ERROR:
        return {...errors(state, action)}
    case actionTypes.UPLOAD_IMAGE:
      return {...state, [action.payload.id]: action.payload}
    case actionTypes.UPLOAD_IMAGE_ERROR:
      return {...errors(state, action)}
    default:
      return state
  }
}