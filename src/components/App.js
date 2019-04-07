import React, { Component } from 'react'
import { get as _get } from 'lodash'
import CalculationsTable from './calculations-table/CalculationsTable'
import CharacterSelectorButton from './character-selecor/CharacterSelectorButton'
import * as xivApi from '../util/xivApi'
import * as localStorageHelper from '../util/localStorageHelper'

class App extends Component {
  state = {
    character: localStorageHelper.retrieveAndUpdateCharacterData()
  }

  async handleCharacterSelection (characterId) {
    const characterData = await xivApi.getCharacter(characterId)
    this.setState({
      character: characterData
    }, localStorageHelper.storeCharacterData.bind(this, characterData))
  }

  handleCharacterClear () {
    this.setState({
      character: null
    })
  }

  render () {
    const { character } = this.state
    return (
      <div className="container-fluid">
        <table className="fullWidth">
          <tbody>
          <tr>
            <td className="text-left">
              <h1>
                FFXIV Crafting & Gathering Calculator
              </h1>
            </td>
            <td className="text-right">
              <CharacterSelectorButton
                onSelect={this.handleCharacterSelection.bind(this)}
                onClear={this.handleCharacterClear.bind(this)}
                character={_get(character, 'Character')}
              />
            </td>
          </tr>
          </tbody>
        </table>
        <CalculationsTable />
        <hr />
        <div className="text-center text-muted text-lowercase">
          Version {process.env.REACT_APP_VERSION}
        </div>
      </div>
    )
  }
}

export default App
