import * as tested from './lodestoneHelper'

describe('lodestoneHelper tests', () => {
  describe('updateStoredDataWithLodestoneData tests', () => {
    const testCases = [
      { craftingClassData: [], characterData: {} }
    ]

    testCases.forEach(testCase => {
      const { craftingClassData, characterData } = testCase
      it('does its thing', () => {
        const result = tested.updateStoredDataWithLodestoneData(craftingClassData, characterData)
        expect(result).toBeUndefined()
      })
    })
  })
})