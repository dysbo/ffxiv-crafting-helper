import React from 'react'
import { shallow } from 'enzyme'
import ProgressCell from './ProgressCell'

describe('ProgressCell tests', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ProgressCell currentExperience={50} totalExperience={100} />)
    expect(wrapper).toBeDefined()
  })

  describe('calculateProgress function', () => {
    const testCases = [
      {
        currentExperience: 9999,
        totalExperience: 10000,
        expectedResult: 99
      },
      {
        currentExperience: 100000,
        totalExperience: 100000,
        expectedResult: 100
      },
      {
        currentExperience: 1,
        totalExperience: 100,
        expectedResult: 1
      },
      {
        currentExperience: 1,
        totalExperience: 200,
        expectedResult: 0
      },
      {
        currentExperience: -5,
        totalExperience: -9,
        expectedResult: 0
      },
      {
        currentExperience: -432,
        totalExperience: 90,
        expectedResult: 0
      },
      {
        currentExperience: 999,
        totalExperience: -12341,
        expectedResult: 0
      }
    ]

    testCases.forEach(testCase => {
      const { currentExperience, totalExperience, expectedResult } = testCase
      it(`when current exp is ${currentExperience} and total is ${totalExperience}, rounds to ${expectedResult}%`, () => {
        const result = ProgressCell.calculateProgress(currentExperience, totalExperience)
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
