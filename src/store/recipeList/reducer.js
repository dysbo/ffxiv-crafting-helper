import { set, unset } from 'lodash'
import * as LocalStorageService from '../../service/localStorage'
import * as T from './types'

const INITIAL_STATE = {
  loading: {},
  myRecipeList: LocalStorageService.getMyRecipeList(),
  myShoppingList: LocalStorageService.getMyShoppingList(),
  recipeSearchResults: {}
}

export default (state = INITIAL_STATE, action) => {
  const { loading } = state
  unset(state, 'error')
  switch (action.type) {
    case T.SHOPPING_LIST_CREATE:
      unset(loading, 'shoppingList')
      return {
        ...state,
        myShoppingList: action.shoppingList,
        loading
      }
    case T.SHOPPING_LIST_CLEAR:
      return {
        ...state,
        myShoppingList: {}
      }
    case T.RECIPE_LIST_SAVE:
      set(loading, 'shoppingList', true)
      return {
        ...state,
        myRecipeList: action.recipeList,
        loading
      }
    case T.RECIPE_LIST_CLEAR:
      return {
        ...state,
        myRecipeList: []
      }
    case T.RECIPE_SEARCH_REQUEST:
      set(loading, 'recipeSearch', true)
      return {
        ...state,
        loading,
        params: action.params
      }
    case T.RECIPE_SEARCH_SUCCESS:
      unset(loading, 'recipeSearch')
      return {
        ...state,
        loading,
        recipeSearchResults: action.payload
      }
    case T.RECIPE_SEARCH_FAILURE:
      unset(loading, 'recipeSearch')
      return {
        ...state,
        loading,
        error: action.error
      }
    case T.RECIPE_SEARCH_CLEAR:
      unset(state, 'params')
      return {
        ...state,
        recipeSearchResults: {}
      }
    default:
      return state
  }
}
