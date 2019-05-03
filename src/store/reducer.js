import { get } from 'lodash'
import * as LocalStorage from '../service/localStorage'
import * as T from './types'

const INITIAL_STATE = {
  classData: LocalStorage.getDefaultCraftingClasses()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.LOCAL_CLASS_DATA_RETRIEVAL:
      return {
        ...state,
        classData: get(action, 'localData')
      }
    case T.LOCAL_CHARACTER_DATA_RETRIEVAL:
      return {
        ...state,
        characterData: get(action, 'localData')
      }
    default:
      return state
  }
}
