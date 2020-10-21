import axios from "axios"
import * as actionTypes from "./types"
import colloAPI from "../apis/colloAPI"

export const uploadPhoto = (formValues) => async dispatch =>  {
  console.log(formValues, ">>>>form")
  try {
    const response = await colloAPI.post("/image", {...formValues})
    dispatch({
      type: actionTypes.UPLOAD_IMAGE,
      payload: response.data.data
    })
  } catch (error) {
    dispatch(errorActionCreator(actionTypes.UPLOAD_IMAGE_ERROR, error))
  }
}

export const getAllImages  = () => async dispatch => {
  try {
    const response = await colloAPI.get("/image")
    dispatch({
      type: actionTypes.GET_IMAGES,
      payload: response.data.data
    })
  } catch (error) {
    console.log(error)
    dispatch(errorActionCreator(actionTypes.GET_IMAGES_ERROR, error))
  }
}

export const getAnImage  = (id) => async dispatch => {
  try {
    const response = await colloAPI.get(`/image/${id}`)
    dispatch({
      type: actionTypes.GET_AN_IMAGE,
      payload: response.data.data
    })
  } catch (error) {
    console.log(error)
    dispatch(errorActionCreator(actionTypes.GET_AN_IMAGE_ERROR, error))
  }
}


// Errors action creator helper function
export const errorActionCreator = (errorType, error) => {
  return {
    type: errorType,
    error: true,
    payload: error
  }
}