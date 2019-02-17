import XIVAPI from 'xivapi-js'

const XIV_API_KEY = '5f88be820b5f465ba3266038'
const xivApi = new XIVAPI(XIV_API_KEY)

export const queryForCraftingRecipes = async (craftingClassAbbreviation, minLevel = 1, maxLevel = 70) => {
  const columns = [
    'ID',
    'Name',
    'Url',
    'RecipeLevelTable.ClassJobLevel',
    'ClassJob'
  ]

  const filters = [
    `RecipeLevelTable.ClassJobLevel>=${minLevel}`,
    `RecipeLevelTable.ClassJobLevel<=${maxLevel}`,
    `ClassJob.Abbreviation_en=${craftingClassAbbreviation}`,
    'StatusRequiredTargetID=0'
  ]

  for (let i = 0; i < 10; i++) {
    columns.push(`AmountIngredient${i}`)
    columns.push(`ItemIngredient${i}.ID`)
    columns.push(`ItemIngredient${i}.Name`)
    columns.push(`ItemIngredient${i}.Icon`)
    // columns.push(`ItemIngredientRecipe${i}`) // need to prune this a little before we can toss it onto the object
  }

  const params = {
    indexes: 'recipe',
    filters: filters.join(','),
    columns: columns.join(','),
    sort_field: 'RecipeLevelTable.ClassJobLevel',
    sort_order: 'asc'
  }

  const response = await xivApi.search('', params)

  return response
}
