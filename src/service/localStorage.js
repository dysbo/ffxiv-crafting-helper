import CRAFTING_CLASSES from '../data/crafting-classes'
import { applyChanges, diff } from 'diff-json'
import {
  filter as _filter,
  find as _find,
  get as _get,
  includes as _includes,
  map as _map,
  set as _set,
  values as _values
} from 'lodash'

const KEYS = {
  CHARACTER_DATA: 'character',
  CRAFTING_CLASS_DATA: 'craftingClasses',
  MY_RECIPE_LIST: 'myRecipeList',
  MY_SHOPPING_LIST: 'myShoppingList',
  CURRENT_TAB: 'currentTab',
  OWNED_ITEMS: 'ownedItems'
}

function get (key, defaultValue) {
  const data = localStorage.getItem(key)
  if (!!data) {
    return JSON.parse(data)
  }
  return defaultValue
}

function store (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function clear (key) {
  if (!!localStorage.getItem(key)) {
    localStorage.removeItem(key)
  }
}

export function getObtainedItems () {
  return get(KEYS.OWNED_ITEMS, [])
}

export function storeObtainedItems (obtainedItems) {
  store(KEYS.OWNED_ITEMS, obtainedItems)
}

export function getCurrentTab () {
  return get(KEYS.CURRENT_TAB)
}

export function storeCurrentTab (currentTab) {
  store(KEYS.CURRENT_TAB, currentTab)
}

export function getMyRecipeList () {
  return get(KEYS.MY_RECIPE_LIST, [])
}

export function getMyShoppingList () {
  return get(KEYS.MY_SHOPPING_LIST, {})
}

export function storeCharacterData (characterData) {
  store(KEYS.CHARACTER_DATA, characterData)
}

export function storeCraftingClassData (craftingClasses) {
  store(KEYS.CRAFTING_CLASS_DATA, craftingClasses)
}

export function storeMyRecipeList (myRecipeList) {
  store(KEYS.MY_RECIPE_LIST, myRecipeList)
}

export function storeMyShoppingList (myShoppingList) {
  store(KEYS.MY_SHOPPING_LIST, myShoppingList)
}

export function clearCharacterData () {
  clear(KEYS.CHARACTER_DATA)
}

export function clearCraftingClassData () {
  clear(KEYS.CRAFTING_CLASS_DATA)
}

export function clearMyRecipeList () {
  clear(KEYS.MY_RECIPE_LIST)
}

export function clearMyShoppingList () {
  clear(KEYS.MY_SHOPPING_LIST)
}

export function clearObtainedItems () {
  clear(KEYS.OWNED_ITEMS)
}

export function retrieveAndUpdateCraftingClassData () {
  // get the default crafting class data
  const defaultCraftingClasses = getDefaultCraftingClasses()

  // retrieve the stored data from local storage
  const storedData = localStorage.getItem(KEYS.CRAFTING_CLASS_DATA)

  // if there is no stored data, return the default data
  if (!storedData) {
    return defaultCraftingClasses
  }

  // if there is stored data, convert it to JSON
  const craftingClasses = JSON.parse(storedData)

  // create a variable for the result
  const result = []

  // cycle through all "default" classes
  defaultCraftingClasses.forEach(defaultCraftingClass => {
    // retrieve the matching stored class
    const storedCraftingClass = _find(craftingClasses, c => c.abbreviation === defaultCraftingClass.abbreviation)

    // if there is no matching stored class data, add the default for this class to the result
    if (!storedCraftingClass) {
      result.push(defaultCraftingClass)
      return
    }

    // get any added data to the default data set and apply it to the stored data
    const classDiffs = _filter(diff(storedCraftingClass, defaultCraftingClass), d => d.type === 'add')
    if (classDiffs.length > 0) {
      applyChanges(storedCraftingClass, classDiffs)
    }

    // get any leveling guide data and remove it from stored data
    const levelingGuideDiffs = _filter(diff(storedCraftingClass, defaultCraftingClass), d => d.key === 'levelingGuide')
    if (levelingGuideDiffs.length > 0) {
      applyChanges(storedCraftingClass, levelingGuideDiffs)
    }

    // add this record to the result to return
    result.push(storedCraftingClass)
  })

  // send back the updated stored data
  return result
}

export function retrieveAndUpdateCharacterData () {
  // get the stored character data
  const storedData = localStorage.getItem(KEYS.CHARACTER_DATA)

  // if there is no character data, return undefined
  if (!storedData) {
    return undefined
  }

  // if there is, update it
  // TBD

  // return the character data
  return JSON.parse(storedData)
}

export function updateCraftingClassDataWithCharacterData () {
  const classJobCategories = ['Disciple of the Land', 'Disciple of the Hand']
  const craftingClassData = retrieveAndUpdateCraftingClassData()
  const characterData = _filter(_values(_get(retrieveAndUpdateCharacterData(), 'Character.ClassJobs')),
    c => _includes(classJobCategories, _get(c, 'Class.ClassJobCategory.Name')))

  return _map(craftingClassData, c => {
    const lodestoneClassData = _find(characterData, d => _get(d, 'Class.Abbreviation') === _get(c, 'abbreviation'))
    _set(c, 'currentLevel', _get(lodestoneClassData, 'Level', 1))
    _set(c, 'currentExperience', _get(lodestoneClassData, 'ExpLevel', 0))
    _set(c, 'totalExperience', _get(lodestoneClassData, 'ExpLevelMax', c.totalExperience))
    return c
  })
}

export function getDefaultCraftingClasses () {
  return _map(CRAFTING_CLASSES, c => {
    c.currentLevel = 1
    c.currentExperience = 0
    c.experiencePerItem = 1
    c.totalExperience = 300
    return c
  })
}
