import { get, set, unset } from 'lodash'
import * as LocalStorage from '../../service/localStorage'
import * as T from './types'

const INITIAL_STATE = {
  classData: LocalStorage.getDefaultCraftingClasses(),
  loading: {}
}

export default (state = INITIAL_STATE, action) => {
  const { loading } = state
  switch (action.type) {
    case T.LODESTONE_CHARACTER_DATA_REQUEST:
      set(loading, 'characterData', true)
      return {
        ...state,
        loading
      }
    case T.LOCAL_CLASS_DATA_STORE:
    case T.LOCAL_CLASS_DATA_RETRIEVAL:
      return {
        ...state,
        classData: get(action, 'localData')
      }
    case T.LOCAL_CHARACTER_DATA_CLEAR:
      return {
        ...state,
        characterData: undefined
      }
    case T.LOCAL_CHARACTER_DATA_STORE:
    case T.LOCAL_CHARACTER_DATA_RETRIEVAL:
      return {
        ...state,
        characterData: get(action, 'localData')
      }
    case T.LOCAL_CLASS_DATA_CLEAR:
      return {
        ...state,
        classData: LocalStorage.getDefaultCraftingClasses()
      }
    case T.LODESTONE_CHARACTER_DATA_SUCCESS:
      unset(loading, 'characterData')
      return {
        ...state,
        characterData: get(action, 'payload'),
        loading
      }
    case T.API_REQUEST_FAILURE:
      unset(loading, 'characterData')
      return {
        ...state,
        error: action.error,
        loading
      }
    default:
      return state
  }
}
