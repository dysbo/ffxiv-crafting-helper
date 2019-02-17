import * as xivApi from '../service/xivApi'
import * as T from './type'

const getCraftingClassesRequest = () => ({
  type: T.CRAFTING_CLASS_REQUEST
})

const getCraftingClassesSuccess = payload => ({
  type: T.CRAFTING_CLASS_SUCCESS,
  payload
})

const getCraftingClassesFailure = error => ({
  type: T.CRAFTING_CLASS_FAILURE,
  error
})

export const getCraftingClasses = () => {
  return async dispatch => {
    dispatch(getCraftingClassesRequest())
    try {
      const result = await xivApi.getCraftingClasses()
      dispatch(getCraftingClassesSuccess(result))
    } catch (err) {
      dispatch(getCraftingClassesFailure(err))
    }
  }
}
