import axios from 'axios'
import { get as _get, isArray as _isArray, set as _set } from 'lodash'
// import UNLOADED_CHARACTER from '../data/mock/unloadedCharacter'

// const PRIVATE_KEY = '257f7d4532a74f15a429b5262d51d0f3938964ea78124b1ca8da9459accc15b7'
const BASE_URL = 'https://xivapi.com'

export const searchForCharacter = async (server, name, page = 1) => {
  const result = await axios.get(`${BASE_URL}/character/search?name=${name}&server=${server}&page=${page}`)
  return _get(result, 'data', [])
}

export const getCharacter = async id => {
  const result = await axios.get(`${BASE_URL}/character/${id}?extended=1`)
  _set(result, 'data.characterId', id)
  return _get(result, 'data', {})
}

const search = async (indexes, filters, sortField, columns) => {
  if (_isArray(indexes)) {
    indexes = indexes.join(',')
  }

  if (_isArray(filters)) {
    filters = filters.join(',')
  }

  const params = {
    indexes,
    filters,
    columns
  }

  if (!!sortField) {
    params['sort_field'] = sortField
    params['sort_order'] = 'asc'
  }

  const result = await axios.get(`${BASE_URL}/search`, {
    params
  })
  return _get(result, 'data', {})
}

export const getRecipesForLevelRange = async (abbreviation, minLevel, maxLevel) => {
  const index = 'Recipe'
  const sortField = 'RecipeLevelTable.ClassJobLevel'
  const columns = ['ID', 'ClassJob.Abbreviation_en', 'RecipeLevelTable.ClassJobLevel', 'Name', 'Icon']
  const filters = [
    `ClassJob.Abbreviation_en=${abbreviation}`,
    `RecipeLevelTable.ClassJobLevel>=${minLevel}`,
    `RecipeLevelTable.ClassJobLevel<=${maxLevel}`,
    'StatusRequiredTargetID=0'
  ]

  return await search(
    index,
    filters,
    sortField,
    columns.join(',')
  )
}

export const getIconUrl = iconRelativePath => `${BASE_URL}${iconRelativePath}`
