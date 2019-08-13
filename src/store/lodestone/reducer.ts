import * as T from './types'

export default function (state = {}, action) {
  switch (action.type) {
    case T.GET_SERVERS.SUCCESS:
    case T.SEARCH_CHARACTER.SUCCESS:
    case T.GET_CHARACTER.SUCCESS:
      return {
        ...state,
        payload: action.payload
      }
    case T.GET_SERVERS.FAILURE:
    case T.GET_CHARACTER.FAILURE:
    case T.SEARCH_CHARACTER.FAILURE:
      return {
        ...state,
        error: action.error
      }
    case T.GET_CHARACTER.REQUEST:
      return {
        ...state,
        characterId: action.characterId
      }
    case T.SEARCH_CHARACTER.REQUEST:
      return {
        ...state,
        params: action.params
      }
    case T.GET_SERVERS.REQUEST:
    default:
      return state
  }
}
