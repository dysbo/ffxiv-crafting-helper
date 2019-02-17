import * as T from './type'
import { get } from 'lodash'

const initialState = {
  craftingClasses: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case T.CRAFTING_CLASS_SUCCESS:
      return {
        ...state,
        craftingClasses: get(action, 'payload.Results', [])
      }
    case T.CRAFTING_CLASS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
