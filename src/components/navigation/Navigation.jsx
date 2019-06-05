import React from 'react'
import PropTypes from 'prop-types'
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import LodestoneCharacterMenu from './LodestoneCharacterMenu'

export default class Navigation extends React.Component {
  render () {
    const { characterData } = this.props
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <NavbarBrand>
          FFXIV Crafting & Gathering Helper
        </NavbarBrand>
        <Nav className="mr-auto" />
        <Nav>
          <LodestoneCharacterMenu
            characterData={characterData}
          />
        </Nav>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  characterData: PropTypes.shape(),
  craftingClassData: PropTypes.arrayOf(PropTypes.shape())
}
