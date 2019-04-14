import React from 'react'
import * as localStorageHelper from '../util/localStorageHelper'
import * as lodestoneHelper from '../util/lodestoneHelper'
import CalculationsBody from './CalculationsBody'
import Header from './Header'

class Calculations extends React.Component {
  state = {}

  componentDidMount () {
    const character = localStorageHelper.retrieveAndUpdateCharacterData()
    const craftingClasses = localStorageHelper.retrieveAndUpdateCraftingClassData()
    this.setState({
      craftingClasses
    }, () => {
      if (!!character) {
        this.setState({
          character
        })
      }
    })
  }

  handleStoreCharacterData (character) {
    this.setState({
      character
    })
    localStorageHelper.storeCharacterData(character)
  }

  handleClearCharacterData () {
    this.setState({
      character: undefined
    })
    localStorageHelper.clearCharacterData()
  }

  render () {
    const { character, craftingClasses } = this.state
    return (
      <div>
        <Header
          character={character}
          craftingClasses={craftingClasses}
          handleClearCharacterData={this.handleClearCharacterData.bind(this)}
          handleStoreCharacterData={this.handleStoreCharacterData.bind(this)}
        />
        <CalculationsBody
          character={character}
          craftingClasses={craftingClasses}
        />
      </div>
    )
  }
}

export default Calculations
