import CRAFTING_CLASSES from '../data/crafting-classes'
import * as tested from './localStorageHelper'

describe('localStorageHelper tests', () => {
  const localStorageMock = (function () {
    let store = {}

    return {
      getItem (key) {
        return store[key] ? JSON.stringify(store[key]) : null
      },
      setItem (key, value) {
        console.log('setting', key, value)
        store[key] = value
      },
      clear () {
        store = {}
      }
    }
  }())

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  })

  beforeEach(() => {
    localStorage.clear()
  })

  describe('retrieveAndUpdateCraftingClassData tests', () => {
    it('does thing', () => {
      const alchemist = {
        name: 'Alchemist',
        abbreviation: 'ALC',
        currentLevel: 12,
        experiencePerItem: 1,
        currentExperience: 0,
        totalExperience: 300,
        type: 'crafting'
      }
      localStorage.setItem('craftingClasses', [alchemist])
      const result = tested.retrieveAndUpdateCraftingClassData()
      expect(result).toContainEqual(alchemist)
    })
  })
})
