import * as LocalStorageService from '../../service/localStorage'
import * as T from './types'

const INITIAL_STATE = {
  myRecipeList: LocalStorageService.getMyRecipeList(),
  myShoppingList: LocalStorageService.getMyShoppingList()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SHOPPING_LIST_CREATE:
      return {
        ...state,
        myShoppingList: action.shoppingList
      }
    case T.SHOPPING_LIST_CLEAR:
      return {
        ...state,
        myShoppingList: {}
      }
    case T.RECIPE_LIST_SAVE:
      return {
        ...state,
        myRecipeList: action.recipeList
      }
    case T.RECIPE_LIST_CLEAR:
      return {
        ...state,
        myRecipeList: []
      }
    default:
      return state
  }
}
