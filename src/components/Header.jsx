import React from 'react'
import PropTypes from 'prop-types'
import { Nav, Navbar } from 'react-bootstrap'
import CharacterMenu from './CharacterMenu'

class Header extends React.Component {
  render () {
    const { character, craftingClasses, handleClearCharacterData, handleStoreCharacterData } = this.props
    return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand>FFXIV Crafting & Gathering Calculator</Navbar.Brand>
        </Nav>
        <Nav>
          <CharacterMenu
            character={character}
            craftingClasses={craftingClasses}
            handleStoreCharacterData={handleStoreCharacterData}
            handleClearCharacterData={handleClearCharacterData}
          />
        </Nav>
      </Navbar>
    )
  }
}

Header.propTypes = {
  character: PropTypes.shape({
    Character: PropTypes.shape({
      Avatar: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired
    }).isRequired
  }),
  craftingClasses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleStoreCharacterData: PropTypes.func.isRequired,
  handleClearCharacterData: PropTypes.func.isRequired
}

Header.defaultProps = {
  craftingClasses: []
}

export default Header
