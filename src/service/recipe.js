import { concat, filter, find, forEach, get, includes, map, set, toLower, uniqBy, orderBy } from 'lodash'
import ITEM_TO_GATHERING_ITEM_MAPPING from '../data/item-to-gathering-item-mapping'
import GATHERING_ITEM_POINTS from '../data/gathering-item-points'
import AETHERYTE from '../data/aetheryte'
import * as XivApiService from './xivApi'

/**
 * Gets a list of ingredients required to craft a given set of recipes.
 *
 * @param recipeList
 * @returns {Promise<*>}
 */
export const getIngredientListForRecipes = async recipeList => {
  if (!recipeList || !recipeList.length) return {}

  // we will want to keep the following lists:
  // 1. Ingredients that can be gathered
  const ingredientsGatherable = []

  // 2. Ingredients that can be crafted
  const ingredientsCrafted = []

  // 3. Ingredients that can be obtained from monsters
  const ingredientsOther = []

  // 3. Ingredients that can be bought (that cannot be gathered or dropped by monsters)
  const ingredientsPurchased = []

  await getAndSortRecipeResults(recipeList,
    ingredientsGatherable,
    ingredientsCrafted,
    ingredientsPurchased,
    ingredientsOther
  )

  // get item IDs for the gatherable and purchasable things so we can get their info
  const itemIds = map(concat(ingredientsGatherable, ingredientsOther), item => get(item, 'itemId'))
  const itemData = await XivApiService.getItemsById(itemIds)

  forEach(get(itemData, 'Results', []), item => {
    const foundItem = find(ingredientsGatherable, ig => get(ig, 'itemId') === get(item, 'ID')) ||
      find(ingredientsOther, io => get(io, 'itemId') === get(item, 'ID'))
    set(foundItem, 'name', get(item, 'Name'))
    set(foundItem, 'icon', XivApiService.getIconUrl(get(item, 'Icon')))
    // set(foundItem, 'gameContentLinks', get(item, 'GameContentLinks', {}))
    set(foundItem, 'gameContentLinks',
      filter(
        map(
          get(item, 'GameContentLinks', {}), (value, key) => ({ key, value })
        ), result => {
          const val = toLower(result.key)
          return includes(val, 'shop') && !includes(val, 'special')
        }
      )
    )

    if (!!get(foundItem, 'gameContentLinks.length')) {
      ingredientsPurchased.push(foundItem)
    }
  })

  // add gathering item data
  addGatheringItemData(ingredientsGatherable)

  // sort the results
  const results = {
    ingredientsCrafted: orderBy(uniqBy(ingredientsCrafted, ic => get(ic, 'ID')), 'Name'),
    ingredientsGatherable: orderBy(ingredientsGatherable, 'name'),
    ingredientsPurchased: orderBy(ingredientsPurchased, 'name'),
    ingredientsOther: orderBy(ingredientsOther, 'name')
  }

  return results
}

const addGatheringItemData = ingredientsGatherable => {
  forEach(ingredientsGatherable, item => {
    const gatheringItemId = get(item, 'gatheringItemId')

    const filteredGatheringPoints = filter(
      GATHERING_ITEM_POINTS, point => get(point, 'ID', '').startsWith(`${gatheringItemId}.`)
    )

    const namePath = 'GatheringPoint.PlaceName.Name_en'
    const areaPath = 'GatheringPoint.TerritoryType.PlaceName.Name_en'
    const regionPath = 'GatheringPoint.TerritoryType.PlaceNameRegion.Name_en'
    const levelPath = 'GatheringPoint.GatheringPointBase.GatheringLevel'
    const typePath = 'GatheringPoint.GatheringPointBase.GatheringType.Name_en'
    const aetherytePath = 'GatheringPoint.TerritoryType.AetheryteTargetID'

    const pointData = map(filteredGatheringPoints, point => getPointData(
      point,
      namePath,
      areaPath,
      regionPath,
      levelPath,
      typePath,
      aetherytePath
    ))

    set(item, 'pointData', orderBy(pointData, ['region', 'area', 'name']))
  })
}

const getPointData = (data, namePath, areaPath, regionPath, levelPath, typePath, aetherytePath) => {
  const typeMap = {
    'Mining': 'Miner',
    'Quarrying': 'Miner',
    'Logging': 'Botanist',
    'Harvesting': 'Botanist'
  }
  const name = get(data, namePath)
  const area = get(data, areaPath)
  const region = get(data, regionPath)
  const level = get(data, levelPath)
  const type = get(data, typePath)
  const aetheryteId = get(data, aetherytePath)

  return {
    name: name || get(find(AETHERYTE, a => get(a, 'ID') === aetheryteId), 'PlaceName.Name_en'),
    area,
    region,
    level,
    gatheringClass: get(typeMap, type),
    type,
    id: get(data, 'ID')
  }
}

const getAndSortRecipeResults = async (
  recipeList,
  ingredientsGatherable,
  ingredientsCrafted,
  ingredientsPurchased,
  ingredientsOther
) => {
  const recipeIds = map(recipeList, recipe => get(recipe, 'ID'))
  const recipeResults = get(await XivApiService.getRecipesById(recipeIds), 'Results', [])
  const nextRecipeResults = []
  forEach(recipeResults, rr => {
    const recipeListEntry = find(recipeList, rle => get(rle, 'ID') === get(rr, 'ID'))
    set(rr, 'quantity', get(recipeListEntry, 'quantity'))

    // go through each ingredient
    for (let i = 0; i < 10; i++) {
      const itemId = get(rr, `ItemIngredient${i}.ID`)
      const amount = get(rr, `AmountIngredient${i}`)
      const gatheringMapNode = find(ITEM_TO_GATHERING_ITEM_MAPPING, mapping => get(mapping, 'ItemID') === itemId)
      const gatheringItemId = get(gatheringMapNode, 'GatheringItemID')
      const ingredientRecipe = get(rr, `ItemIngredientRecipe${i}[0]`)
      const quantity = get(rr, 'quantity')

      if (!!gatheringItemId) {
        const existingIngredientGatherable = find(ingredientsGatherable, ig => get(ig, 'itemId') === itemId)
        if (!!existingIngredientGatherable) {
          const existingAmount = get(existingIngredientGatherable, 'amount')
          set(existingIngredientGatherable, 'amount', existingAmount + (amount * quantity))
        } else {
          ingredientsGatherable.push({ itemId, gatheringItemId, amount: amount * quantity })
        }
      }

      if (!!ingredientRecipe) {
        set(ingredientRecipe, 'quantity', quantity * amount)
        nextRecipeResults.push(ingredientRecipe)
        ingredientsCrafted.push(ingredientRecipe)
      }

      if (!gatheringItemId && !ingredientRecipe && !!itemId) {
        console.log('this item is not gatherable and is not a recpie', itemId)
        const existingIngredientOther = find(ingredientsOther, ip => get(ip, 'itemId') === itemId)
        if (!!existingIngredientOther) {
          console.log('I found an existing \'other\' ingredient', existingIngredientOther)
          const existingAmount = get(existingIngredientOther, 'amount')
          set(existingIngredientOther, 'amount', existingAmount + (amount * quantity))
        } else {
          ingredientsOther.push({ itemId, amount: amount * quantity })
        }
      }
    }
  })

  if (!!nextRecipeResults.length) {
    await getAndSortRecipeResults(nextRecipeResults,
      ingredientsGatherable,
      ingredientsCrafted,
      ingredientsPurchased,
      ingredientsOther
    )
  }
}
