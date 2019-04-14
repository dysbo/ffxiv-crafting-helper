import axios from 'axios'
import { get as _get } from 'lodash'

// const PRIVATE_KEY = '257f7d4532a74f15a429b5262d51d0f3938964ea78124b1ca8da9459accc15b7'
const BASE_URL = 'https://xivapi.com'

export const searchForCharacter = async (server, name) => {
  const result = await axios.get(`${BASE_URL}/character/search?name=${name}&server=${server}`)
  return _get(result, 'data', [])
}

export const getCharacter = async id => {
  const result = await axios.get(`${BASE_URL}/character/${id}?extended=1`)
  return _get(result, 'data', {})
}

export const getServers = async () => {
  const result = await axios.get(`${BASE_URL}/servers`)
  return _get(result, 'data', [])
}
