import axios from 'axios'
import { filter, get, keys, map, toNumber } from 'lodash'

abstract class XivApiService {
  protected readonly BASE_URL = `https://xivapi.com`
}

class LodestoneService extends XivApiService {
  async getCharacterById (id : number) : Promise<any> {
    return await axios.get(`${this.BASE_URL}/character/${id}?extended=1`)
  }

  async searchForCharacter (params : { name : string, server? : string, page? : number }) : Promise<any> {
    return await axios.get(`${this.BASE_URL}/character/search?` + map(keys(params), key => `${key}=${params[key]}`).join(/&/))
  }

  async getServers () {
    return await axios.get(`${this.BASE_URL}/servers`)
  }

  getMaxLevel () : number {
    return 80
  }
}

export const lodestoneService = new LodestoneService()
