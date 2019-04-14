import React from 'react'
import PropTypes from 'prop-types'
import { Nav, NavDropdown } from 'react-bootstrap'
import CharacterIcon from './CharacterIcon'
import CharacterSelectionModal from './CharacterSelectionModal'
import * as xivApi from '../util/xivApi'
import * as lodestoneHelper from '../util/lodestoneHelper'
import * as localStorageHelper from '../util/localStorageHelper'

class CharacterMenu extends React.Component {
  state = {
    characterModalIsOpen: false
  }

  handleLoadCharacterData () {
    this.handleShowCharacterModal()
  }

  handleShowCharacterModal () {
    this.setState({
      characterModalIsOpen: true
    })
  }

  handleHideCharacterModal () {
    this.setState({
      characterModalIsOpen: false
    })
  }

  handleSelectCharacterData (characterData) {
    const { handleStoreCharacterData } = this.props
    handleStoreCharacterData(characterData)
    this.handleUpdateCharacterDataWithLodestone(characterData)
  }

  async handleRefreshCharacterData () {
    const { character, handleStoreCharacterData } = this.props
    const characterData = await xivApi.getCharacter(character.Character.ID)
    handleStoreCharacterData(characterData)
    this.handleUpdateCharacterDataWithLodestone(characterData)
  }

  handleUpdateCharacterDataWithLodestone (characterData) {
    const { craftingClasses } = this.props
    lodestoneHelper.updateStoredDataWithLodestoneData(craftingClasses, characterData)
    console.log(craftingClasses)
    localStorageHelper.storeCraftingClassData(craftingClasses)
  }

  render () {
    const { character, handleClearCharacterData } = this.props
    const { characterModalIsOpen } = this.state
    const characterNameDisplay = character && (
      <span>
        <CharacterIcon
          altText={character.Character.Name}
          imageUrl={character.Character.Avatar}
        /> {character.Character.Name}
      </span>
    )

    const Modal = (
      <CharacterSelectionModal
        show={characterModalIsOpen}
        onHide={this.handleHideCharacterModal.bind(this)}
        onSubmit={this.handleSelectCharacterData.bind(this)}
      />
    )

    if (!!character) {
      return (
        <React.Fragment>
          <NavDropdown title={characterNameDisplay} className="dropleft">
            <NavDropdown.Item onClick={this.handleRefreshCharacterData.bind(this)}>
              Refresh Character Data
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.handleLoadCharacterData.bind(this)}>
              Load a Different Character
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleClearCharacterData}>
              Clear Character Data
            </NavDropdown.Item>
          </NavDropdown>
          {Modal}
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Nav.Link onClick={this.handleLoadCharacterData.bind(this)}>
          Load Character Data
        </Nav.Link>
        {Modal}
      </React.Fragment>
    )
  }
}

CharacterMenu.propTypes = {
  character: PropTypes.shape({
    Character: PropTypes.shape({
      Avatar: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      ID: PropTypes.number.isRequired
    }).isRequired
  }),
  craftingClasses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleStoreCharacterData: PropTypes.func.isRequired,
  handleClearCharacterData: PropTypes.func.isRequired
}

export default CharacterMenu
