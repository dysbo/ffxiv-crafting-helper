import * as T from './types'
import * as XivApiService from '../../service/xivApi'

const fetchRecipesByIdRequest = recipeIds => ({
  type: T.FETCH_RECIPES_BY_ID,
  recipeIds
})

const searchRecipesRequest = (abbreviations, searchString = '', page = 1) => ({
  type: T.SEARCH_RECIPES,
  searchParams: {
    abbreviations,
    searchString,
    page
  }
})

const apiRequestFailure = (requestType, error) => ({
  type: T.API_REQUEST_FAILURE,
  requestType,
  error
})

const apiRequestSuccess = (requestType, payload) => ({
  type: T.API_REQUEST_SUCCESS,
  requestType,
  payload
})

export const fetchRecipesById = recipeIds => {
  return async dispatch => {
    dispatch(fetchRecipesByIdRequest(recipeIds))
    try {
      const payload = await XivApiService.getRecipesById(recipeIds)
      dispatch(apiRequestSuccess(T.FETCH_RECIPES_BY_ID, payload))
    } catch (err) {
      dispatch(apiRequestFailure(T.FETCH_RECIPES_BY_ID, err))
    }
  }
}

export const searchRecipes = (abbreviations, searchString = '', page = 1) => {
  return async dispatch => {
    dispatch(searchRecipesRequest(abbreviations, searchString, page))
    try {
      const payload = await XivApiService.recipeSearch(abbreviations, searchString, page)
      dispatch(apiRequestSuccess(T.SEARCH_RECIPES, payload))
    } catch (err) {
      dispatch(apiRequestFailure(T.SEARCH_RECIPES, err))
    }
  }
}
