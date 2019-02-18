import * as T from './type'
import { get } from 'lodash'

const initialState = {
  craftingClasses: [],
  recipeList: [],
  thinking: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case T.CRAFTING_CLASS_SUCCESS:
      return {
        ...state,
        craftingClasses: get(action, 'payload.Results', []),
        thinking: false
      }
    case T.CRAFTING_CLASS_FAILURE:
    case T.RECIPE_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        thinking: false
      }
    case T.RECIPE_LIST_REQUEST:
      return {
        ...state,
        thinking: true
      }
    case T.RECIPE_LIST_SUCCESS:
      return {
        ...state,
        recipeList: get(action, 'payload.Results', []),
        thinking: false
      }
    case T.CLEAR_RECIPE_LIST:
      return {
        ...state,
        recipeList: [],
        thinking: false
      }
    default:
      return state
  }
}
