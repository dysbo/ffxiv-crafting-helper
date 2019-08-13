import * as T from './types'
import { lodestoneService } from '../../services/xivapi'
import TypeStrings from '../TypeStrings'

function action (type: TypeStrings, func: any, ...params: any) {
  return async dispatch => {
    dispatch({ type: type.REQUEST, ...params })
    try {
      const payload = await func(...params)
      dispatch({ type: type.SUCCESS, payload })
    } catch (error) {
      dispatch({ type: type.FAILURE, error })
    }
  }
}

export function getCharacter (id : number) {
  return action(T.GET_CHARACTER, lodestoneService.getCharacterById, id)
}

export function searchCharacters (name : string, server? : string, page? : number) {
  return action(T.SEARCH_CHARACTER, lodestoneService.searchForCharacter, { name, server, page })
}

export function getServers () {
  return action(T.GET_SERVERS, lodestoneService.getServers)
}
