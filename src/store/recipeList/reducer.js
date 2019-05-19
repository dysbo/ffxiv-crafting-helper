import { get } from 'lodash'
import * as T from './types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.FETCH_RECIPES_BY_ID:
      return {
        ...state,
        recipeIds: get(action, 'recipeIds')
      }
    case T.SEARCH_RECIPES:
      return {
        ...state,
        searchParams: get(action, 'searchParameters')
      }
    case T.API_REQUEST_SUCCESS:
      switch (action.requestType) {
        case T.FETCH_RECIPES_BY_ID:
          return {
            ...state,
            recipeList: get(action, 'payload.Results', []),
            recipeListPagination: get(action, 'payload.Pagination', {})
          }
        case T.SEARCH_RECIPES:
          return {
            ...state,
            payload
          }
        default:
          return state
      }
    case T.API_REQUEST_FAILURE:
      return {
        ...state,
        failedRequestType: get(action, 'requestType'),
        error: get(action, 'error')
      }
    default:
      return state
  }
}
