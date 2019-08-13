import * as T from './types'
import { localStorageService } from '../../services/local'
import TypeStrings from '../TypeStrings'

function localStorageAction (type: TypeStrings, func: any, ...params ) {
  return dispatch => {
    const payload = func(...params)
    dispatch({ type: type.SUCCESS, payload })
  }
}

export function getAllCharacters () {
  return localStorageAction (T.GET_ALL_CHARACTERS, localStorageService.getAllCharacters)
}

export function getActiveCharacter () {
  return localStorageAction (T.GET_ACTIVE_CHARACTER, localStorageService.getActiveCharacter)
}

export function addCharacter (data : any) {
  return localStorageAction (T.ADD_CHARACTER, localStorageService.addCharacter, data)
}

export function removeCharacter (id : number) {
  return localStorageAction (T.REMOVE_CHARACTER, localStorageService.removeCharacter, id)
}

export function clearActiveCharacter () {
  return localStorageAction(T.CLEAR_ACTIVE_CHARACTER, localStorageService.clearActiveCharacter)
}

export function setActiveCharacter (data: any) {
  return localStorageAction(T.SET_ACTIVE_CHARACTER, localStorageService.setActiveCharacter, data)
}
