import * as T from './types'
import * as LocalStorageService from '../../service/localStorage'
import * as RecipeListService from '../../service/recipe'
import * as XivApiService from '../../service/xivApi'

const recipeListClear = () => ({
  type: T.RECIPE_LIST_CLEAR
})

const recipeListSave = recipeList => ({
  type: T.RECIPE_LIST_SAVE,
  recipeList
})

const shoppingListClear = () => ({
  type: T.SHOPPING_LIST_CLEAR
})

const shoppingListCreate = shoppingList => ({
  type: T.SHOPPING_LIST_CREATE,
  shoppingList
})

const recipeSearchRequest = params => ({
  type: T.RECIPE_SEARCH_REQUEST,
  params
})

const apiRequestSuccess = (type, payload) => ({
  type,
  payload
})

const apiRequestFailure = (type, error) => ({
  type, error
})

const recipeSearchClear = () => ({
  type: T.RECIPE_SEARCH_CLEAR
})

const shoppingListFailure = error => ({
  type: T.SHOPPING_LIST_ERROR,
  error
})

export const saveMyRecipeList = recipeList => dispatch => {
  LocalStorageService.storeMyRecipeList(recipeList)
  dispatch(recipeListSave(recipeList))
  dispatch(createMyShoppingList(recipeList))
}

export const clearMyRecipeList = () => dispatch => {
  LocalStorageService.clearMyRecipeList()
  dispatch(recipeListClear())
  dispatch(clearMyShoppingList())
}

export const createMyShoppingList = recipeList => async dispatch => {
  try {
    const result = await RecipeListService.getIngredientListForRecipes(recipeList)
    LocalStorageService.storeMyShoppingList(result)
    dispatch(shoppingListCreate(result))
  } catch (err) {
    dispatch(shoppingListFailure(err))
  }
}

export const clearMyShoppingList = () => dispatch => {
  LocalStorageService.clearMyShoppingList()
  dispatch(shoppingListClear())
}

export const searchRecipes = (string, params) => async dispatch => {
  dispatch(recipeSearchRequest({string, ...params}))
  try {
    const result = await XivApiService.recipeSearch(string, params)
    dispatch(apiRequestSuccess(T.RECIPE_SEARCH_SUCCESS, result))
  } catch (err) {
    dispatch(apiRequestFailure(T.RECIPE_SEARCH_FAILURE, err))
  }
}

export const clearRecipeSearch = () => dispatch => {
  dispatch(recipeSearchClear())
}
