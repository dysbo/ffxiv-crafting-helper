import * as LocalStorage from '../service/localStorage'
// import * as XivApi from '../service/xivApi'
import * as T from './types'

const localClassData = localData => ({
  type: T.LOCAL_CLASS_DATA_RETRIEVAL,
  localData
})

const localCharacterData = localData => ({
  type: T.LOCAL_CHARACTER_DATA_RETRIEVAL,
  localData
})

export const getLocalClassData = () => {
  return dispatch => {
    const localData = LocalStorage.retrieveAndUpdateCraftingClassData()
    dispatch(localClassData(localData))
  }
}

export const getLocalCharacterData = () => {
  return dispatch => {
    const localData = LocalStorage.retrieveAndUpdateCharacterData()
    dispatch(localCharacterData(localData))
  }
}
