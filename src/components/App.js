import React, { Component } from 'react'
import CalculationsTable from './calculations-table/CalculationsTable'
import CharacterSelectorButton from './character-selecor/CharacterSelectorButton'
import * as xivApi from '../util/xivApi'

class App extends Component {
  state = {
    character: null
  }

  async handleCharacterSelection (characterId) {
    console.log('How did I get this??', characterId)
    const characterData = await xivApi.getCharacter(characterId)
    console.log(characterData)
    this.setState({
      character: characterData
    })
  }

  handleCharacterClear () {
    this.setState({
      character: null
    })
  }

  render () {
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
