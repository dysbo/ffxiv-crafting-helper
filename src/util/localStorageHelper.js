import CRAFTING_CLASSES from '../data/crafting-classes'
import { applyChanges, diff } from 'diff-json'
import { filter as _filter, find as _find, map as _map } from 'lodash'

const KEYS = {
  CHARACTER_DATA: 'character',
  CRAFTING_CLASS_DATA: 'craftingClasses'
}

function store(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
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

    // add this record to the result to return
    result.push(storedCraftingClass)
  })

  // send back the updated stored data
  return result
}

export function retrieveAndUpdateCharacterData() {
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

export function storeCharacterData(characterData) {
  // localStorage.setItem(KEYS.CHARACTER_DATA, JSON.stringify(characterData))
  store(KEYS.CHARACTER_DATA, characterData)
}

export function storeCraftingClassData(craftingClasses) {
  // localStorage.setItem(KEYS.CRAFTING_CLASS_DATA, JSON.stringify(craftingClasses))
  store(KEYS.CRAFTING_CLASS_DATA, craftingClasses)
}

export function clearCharacterData() {
  if (!!localStorage.getItem(KEYS.CHARACTER_DATA)) {
    localStorage.removeItem(KEYS.CHARACTER_DATA)
  }
}

export function clearCraftingClassData () {
  // if (!!localStorage.getItem(KEYS.CRAFTING_CLASS_DATA)) {
  //   localStorage.removeItem(KEYS.CRAFTING_CLASS_DATA)
  // }
  console.log(`I'll really do it next time.`)
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
