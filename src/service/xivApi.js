import XIVAPI from 'xivapi-js'
import { filter, get, orderBy } from 'lodash'

const XIV_API_KEY = '5f88be820b5f465ba3266038'
const xivApi = new XIVAPI(XIV_API_KEY)

export const getCraftingClasses = async () => {
  const columns = [
    'ID',
    'Name',
    'Icon',
    'Url',
    'ClassJobCategory.ID'
  ]

  const result = await xivApi.data.list('ClassJob', {
    columns: columns.join(',')
  })

  result['Results'] = orderBy(
    filter(
      result['Results'],
        res => get(res, 'ClassJobCategory.ID') === 33),
    'Name'
  )

  return result
}

export const queryForCraftingRecipes = async (craftingClassId, minLevel = 1, maxLevel = 70) => {
  const columns = [
    'ID',
    'Icon',
    'Name',
    'Url',
    'RecipeLevelTable.ClassJobLevel',
    'ClassJob'
  ]

  // add the Ingredient # fields lazily
  for (let i = 0; i < 10; i++) {
    columns.push(`AmountIngredient${i}`)
    columns.push(`ItemIngredient${i}`)
    // columns.push(`ItemIngredient${i}.ID`)
    // columns.push(`ItemIngredient${i}.Name`)
    // columns.push(`ItemIngredient${i}.Icon`)
    columns.push(`ItemIngredientRecipe${i}`)
  }

  // set up filter for initial request
  const filters = [
    `RecipeLevelTable.ClassJobLevel>=${minLevel}`,
    `RecipeLevelTable.ClassJobLevel<=${maxLevel}`,
    `ClassJob.ID=${craftingClassId}`,
    'StatusRequiredTargetID=0'
  ]

  // initial request is to get the IDs of the recipes we want
  const initialResponse = await xivApi.search('', {
    indexes: 'recipe',
    filters: filters.join(','),
    columns: 'ID'
  })

  // collect the IDs from the results
  const allIds = get(initialResponse, 'Results', [initialResponse]).map(res => res.ID)

  // send another request to get the actual recipe data since the search is broken
  const recipeResponse = await xivApi.data.list('recipe', {
    ids: allIds,
    columns: columns.join(',')
  })

  // sort the results by level and then alphabetically
  recipeResponse['Results'] = orderBy(
    recipeResponse['Results'],
    ['RecipeLevelTable.ClassJobLevel', 'Name'],
    ['asc', 'asc']
  )

  console.log({ initialResponse, allIds, recipeResponse })

  return recipeResponse
}
