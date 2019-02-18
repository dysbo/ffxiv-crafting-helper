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

const getRecipeListRequest = (classId, minimumLevel, maximumLevel) => ({
  type: T.RECIPE_LIST_REQUEST,
  classId,
  minimumLevel,
  maximumLevel
})

const getRecipeListSuccess = payload => ({
  type: T.RECIPE_LIST_SUCCESS,
  payload
})

const getRecipeListFailure = error => ({
  type: T.RECIPE_LIST_FAILURE,
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

export const getRecipeList = (classId, minimumLevel, maximumLevel) => {
  return async dispatch => {
    dispatch(getRecipeListRequest(classId, minimumLevel, maximumLevel))
    try {
      const result = await xivApi.queryForCraftingRecipes(classId, minimumLevel, maximumLevel)
      dispatch(getRecipeListSuccess(result))
    } catch (err) {
      dispatch(getRecipeListFailure(err))
    }
  }
}

export const clearRecipeList = () => {
  return async dispatch => {
    dispatch({ type: T.CLEAR_RECIPE_LIST })
  }
}
