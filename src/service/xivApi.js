import axios from 'axios'
import { forEach, map, get, isArray, set } from 'lodash'
// import UNLOADED_CHARACTER from '../data/mock/unloadedCharacter'

// const PRIVATE_KEY = '257f7d4532a74f15a429b5262d51d0f3938964ea78124b1ca8da9459accc15b7'
const BASE_URL = 'https://xivapi.com'

export const searchForCharacter = async (server, name, page = 1) => {
  const result = await axios.get(`${BASE_URL}/character/search?name=${name}&server=${server}&page=${page}`)
  return get(result, 'data', [])
}

export const getCharacter = async id => {
  const result = await axios.get(`${BASE_URL}/character/${id}?extended=1`)
  set(result, 'data.characterId', id)
  return get(result, 'data', {})
}

const search = async (indexes, filters, sortField, columns, searchString) => {
  if (isArray(indexes)) {
    indexes = indexes.join(',')
  }

  if (isArray(filters)) {
    filters = filters.join(',')
  }

  const params = {
    indexes,
    filters,
    columns,
    string: searchString
  }

  if (!!sortField) {
    params['sort_field'] = sortField
    params['sort_order'] = 'asc'
  }

  const result = await axios.get(`${BASE_URL}/search`, {
    params
  })
  return get(result, 'data', {})
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

export const recipeSearch = async (abbreviation, searchString, page = 1) => {
  const indexes = 'recipe'
  const size = 50
  const columns = [
    'ID',
    'ClassJob.Abbreviation_en',
    'ClassJob.Icon',
    'ClassJob.NameEnglish',
    'RecipeLevelTable.ClassJobLevel',
    'Name',
    'Icon'
  ]

  const paramsToSend = {
    indexes,
    body: {
      query: {
        bool: {
          must: [
            {
              wildcard: {
                'NameCombined_en': `*${searchString}*`
              }
            }
          ]
        }
      },
      size,
      from: size * (page - 1),
      sort: [
        {
          'RecipeLevelTable.ClassJobLevel': 'asc'
        }
      ]
    },
    columns,
    limit: size
  }

  if (!!abbreviation) {
    const minimum_should_match = 1
    // const should = []
        // {
        //   match: {
        //     'ClassJob.Abbreviation_en': 'WVR'
        //   }
        // },

    abbreviation = isArray(abbreviation) ? abbreviation : [abbreviation]
    const should = map(abbreviation, a => ({
      match: {
        'ClassJob.Abbreviation_en': a
      }
    }))

    paramsToSend.body.query.bool.should = should
    paramsToSend.body.query.bool.minimum_should_match = minimum_should_match
  }

  console.log(paramsToSend)

  const result = await axios.post(`${BASE_URL}/search`,
    paramsToSend
  )
  return get(result, 'data', {})
}

export const getIconUrl = iconRelativePath => `${BASE_URL}${iconRelativePath}`
