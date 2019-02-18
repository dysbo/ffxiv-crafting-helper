import * as T from './type'
import { get } from 'lodash'

const initialState = {
  craftingClasses: [],
  recipeList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case T.CRAFTING_CLASS_SUCCESS:
      return {
        ...state,
        craftingClasses: get(action, 'payload.Results', [])
      }
    case T.CRAFTING_CLASS_FAILURE:
    case T.RECIPE_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case T.RECIPE_SUCCESS:
      return {
        ...state,
        recipeList: get(action, 'payload.Results', [])
      }
    default:
      return state
  }
}
