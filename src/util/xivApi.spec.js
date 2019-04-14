import * as tested from './xivApi'
import axios from 'axios'

describe('xivApi tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('searchForCharacter tests', () => {
    const testCases = [
      { response: undefined, expected: [] },
      { response: null, expected: [] },
      { response: [], expected: [] },
      { response: {}, expected: [] },
      { response: { result: 'no data' }, expected: [] },
      { response: { data: 'cheeseburger' }, expected: 'cheeseburger' },
      { response: { data: ['array', 'of', 'data'] }, expected: ['array', 'of', 'data'] },
      { response: { data: [{ obj: 'someData' }, { obj: 'some more data' }] }, expected: [{ obj: 'someData' }, { obj: 'some more data' }] }
    ]

    testCases.forEach(testCase => {
      const { expected, response } = testCase
      it(`returns ${JSON.stringify(expected)} when ${JSON.stringify(response)} is received from server`, async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => response)
        const result = await tested.searchForCharacter('any', 'any')
        expect(result).toEqual(expected)
      })
    })
  })

  describe('getCharacter tests', () => {
    const testCases = [
      { response: undefined, expected: {} },
      { response: null, expected: {} },
      { response: [], expected: {} },
      { response: {}, expected: {} },
      { response: { data: 'character data' }, expected: 'character data' }
    ]

    testCases.forEach(testCase => {
      const { expected, response } = testCase
      it(`returns ${JSON.stringify(expected)} when ${JSON.stringify(response)} is received from server`, async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => response)
        const result = await tested.getCharacter('any')
        expect(result).toEqual(expected)
      })
    })
  })

  describe('getServers tests', () => {
    const testCases = [
      { response: undefined, expected: [] },
      { response: null, expected: [] },
      { response: [], expected: [] },
      { response: {}, expected: [] },
      { response: { data: 'servers data' }, expected: 'servers data' }
    ]

    testCases.forEach(testCase => {
      const { expected, response } = testCase
      it(`returns ${JSON.stringify(expected)} when ${JSON.stringify(response)} is received from server`, async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => response)
        const result = await tested.getServers()
        expect(result).toEqual(expected)
      })
    })
  })
})
