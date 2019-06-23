import axios from 'axios'
import { map, get, isArray, set, toLower } from 'lodash'
// import UNLOADED_CHARACTER from '../data/mock/unloadedCharacter'

// const PRIVATE_KEY = '257f7d4532a74f15a429b5262d51d0f3938964ea78124b1ca8da9459accc15b7'
const BASE_URL = 'https://xivapi.com'

// this is for testing
// let attempt = 0

/**
 * Retrieves the URL of an icon provided in a response from XIVAPI.
 * @param   {string}  iconRelativePath  The relative path of the icon.
 * @returns {string}                    The full URL path of the icon.
 */
export const getIconUrl = iconRelativePath => `${BASE_URL}${iconRelativePath}`

/**
 * Finds a character by server and name.
 *
 * @param   {string}  server  The name of the server.
 * @param   {string}  name    The name of the character.
 * @param   {number}  page    The page of results to view.
 * @returns {object}          An object containing the search results.
 */
export const findCharacterByServerAndName = async (server, name, page = 1) => {
  const result = await axios.get(`${BASE_URL}/character/search?name=${name}&server=${server}&page=${page}`)
  return get(result, 'data', [])
}

/**
 * Retrieves character data by the character's ID.
 *
 * @param   {number}  id  The ID of the character to retrieve.
 * @returns {object}      An object containing the character's data.
 */
export const getCharacterById = async id => {
  // use this for normal functionality
  const result = await axios.get(`${BASE_URL}/character/${id}?extended=1`)

  // use this when testing the "first import" message
  // console.log('this is attempt', attempt.toString())
  // let result
  // if (!attempt) {
  //   result = { data: UNLOADED_CHARACTER }
  // } else {
  //   result = await axios.get(`${BASE_URL}/character/${id}?extended=1`)
  // }
  // attempt++

  // use this when testing the behavior when character does not load from Lodestone
  // const result = { data: UNLOADED_CHARACTER }

  set(result, 'data.characterId', id)
  return get(result, 'data', {})
}

/**
 * Searches for recipes via the XIPAPI.
 *
 * @param   {string}          searchString                    The string for which to search.
 * @param   {object}          [options]                       Options to apply to this search.
 * @param   {boolean}         [options.exact]                 Whether we are searching for the exact string (true) or
 *                                                              should substitute spaces for wildcards (false).
 * @param   {number}          [options.page]                  The page on which to begin the search.
 * @param   {string|[string]} [options.abbreviation]          Any crafting class abbreviations that should be queried.
 * @param   {boolean}         [options.includeMasterRecipes]  Indicates whether master recipes should be included.
 * @returns {object}                                          An object containing search results.
 */
export const recipeSearch = async (searchString = '', options = {}) => {
  const indexes = 'recipe'
  const size = 20
  const columns = [
    'ID',
    'ClassJob.Abbreviation_en',
    'ClassJob.Icon',
    'ClassJob.NameEnglish',
    'RecipeLevelTable.ClassJobLevel',
    'Name',
    'Icon'
  ]

  const { exact = false, page = 1, includeMasterRecipes = false } = options

  searchString = toLower(searchString)

  if (!exact) {
    searchString = searchString.replace(' ', '*')
  }

  const request = {
    indexes,
    body: {
      query: {
        bool: {
          must: [
            {
              wildcard: {
                'NameCombined_en': `*${searchString}*`
              }
            },
            {
              match: {
                'ExpRewarded': 1
              }
            },
            {
              match: {
                'ItemRequiredTargetID': 0
              }
            }
            // {
            //   match: {
            //     'SecretRecipeBookTargetID': 0
            //   }
            // },
            // {
            //   match: {
            //     'StatusRequiredTargetID': 0
            //   }
            // }
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
    limit: size,
    page
  }

  if (!includeMasterRecipes) {
    request.body.query.bool.must.push({
      match: {
        'SecretRecipeBookTargetID': 0
      }
    })
  }

  if (!!options.abbreviation && !!options.abbreviation.length && options.abbreviation.length < 8) {
    let { abbreviation } = options
    const minimum_should_match = 1

    abbreviation = isArray(abbreviation) ? abbreviation : [abbreviation]

    request.body.query.bool.minimum_should_match = minimum_should_match
    request.body.query.bool.should = map(abbreviation, a => ({
      match: {
        'ClassJob.Abbreviation_en': a
      }
    }))
  }

  const result = await axios.post(`${BASE_URL}/search`,
    request
  )
  return get(result, 'data', {})
}

/**
 * Retrieves a list of recipes by their IDs.
 *
 * @param   {[number]}  recipeIds The IDs of the recipes that should be retrieved.
 * @returns {object}              An object containing the recipe data retrieved.
 */
export const getRecipesById = async recipeIds => {
  const columns = [
    'ID',
    'Name'
  ]

  for (let i = 0; i < 10; i++) {
    columns.push(`AmountIngredient${i}`)
    columns.push(`ItemIngredient${i}.ID`)
    columns.push(`ItemIngredient${i}.Icon`)
    columns.push(`ItemIngredient${i}.Name`)
    columns.push(`ItemIngredient${i}.ItemSearchCategoryTargetID`)
    columns.push(`ItemIngredientRecipe${i}`)
  }

  const result = await axios.get(`${BASE_URL}/recipe`, {
    params: {
      ids: recipeIds.join(','),
      columns: columns.join(',')
    }
  })
  return get(result, 'data', {})
}

/**
 * Retrieves a list of items by their IDs.
 *
 * @param   {[number]}  itemIds The IDs of the items that should be retrieved.
 * @returns {object}            An object containing the item data retrieved.
 */
export const getItemsById = async itemIds => {
  const columns = [
    'ID',
    'Name',
    'Icon',
    'GameContentLinks'
  ]

  const result = await axios.get(`${BASE_URL}/item`, {
    params: {
      ids: itemIds.join(','),
      columns: columns.join(',')
    }
  })

  return get(result, 'data', {})
}
