import * as LocalStorage from '../service/localStorage'
import * as XivApi from '../service/xivApi'
import * as T from './types'

const localClassDataRetrieve = localData => ({
  type: T.LOCAL_CLASS_DATA_RETRIEVAL,
  localData
})

const localClassDataStore = localData => ({
  type: T.LOCAL_CLASS_DATA_STORE,
  localData
})

const localCharacterDataRetrieve = localData => ({
  type: T.LOCAL_CHARACTER_DATA_RETRIEVAL,
  localData
})

const localCharacterDataStore = localData => ({
  type: T.LOCAL_CHARACTER_DATA_STORE,
  localData
})

const lodestoneCharacterDataRequest = characterId => ({
  type: T.LODESTONE_CHARACTER_DATA_REQUEST,
  characterId
})

const apiRequestSuccess = (type, payload) => ({
  type,
  payload
})

const apiRequestFailure = (type, error) => ({
  type,
  error
})

export const getLocalClassData = () => {
  return dispatch => {
    const localData = LocalStorage.retrieveAndUpdateCraftingClassData()
    dispatch(localClassDataRetrieve(localData))
  }
}

export const saveLocalClassData = classData => {
  return dispatch => {
    LocalStorage.storeCraftingClassData(classData)
    dispatch(localClassDataStore(classData))
  }
}

export const saveLocalCharacterData = characterData => {
  return dispatch => {
    LocalStorage.storeCharacterData(characterData)
    dispatch(localCharacterDataStore(characterData))
  }
}

export const getLocalCharacterData = () => {
  return dispatch => {
    const localData = LocalStorage.retrieveAndUpdateCharacterData()
    dispatch(localCharacterDataRetrieve(localData))
  }
}

export const getLodestoneCharacterData = characterId => {
  return async dispatch => {
    dispatch(lodestoneCharacterDataRequest(characterId))
    try {
      const payload = await XivApi.getCharacter(characterId)
      dispatch(apiRequestSuccess(T.LODESTONE_CHARACTER_DATA_SUCCESS, payload))
      dispatch(saveLocalCharacterData(payload))
    } catch (err) {
      dispatch(apiRequestFailure(T.API_REQUEST_FAILURE, err))
    }
  }
}
