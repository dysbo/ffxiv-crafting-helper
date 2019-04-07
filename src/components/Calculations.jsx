import React from 'react'
import { get as _get } from 'lodash'
import CharacterSelectorButton from './character-selecor/CharacterSelectorButton'
import CalculationsTable from './calculations-table/CalculationsTable'
import * as localStorageHelper from '../util/localStorageHelper'
import * as xivApi from '../util/xivApi'

class Calculations extends React.Component {
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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default Calculations
