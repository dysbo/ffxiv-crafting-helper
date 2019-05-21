import * as T from './types'
import * as LocalStorageService from '../../service/localStorage'
import * as RecipeListService from '../../service/recipe'

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
  const result = await RecipeListService.getIngredientListForRecipes(recipeList)
  LocalStorageService.storeMyShoppingList(result)
  dispatch(shoppingListCreate(result))
}

export const clearMyShoppingList = () => dispatch => {
  LocalStorageService.clearMyShoppingList()
  dispatch(shoppingListClear())
}
