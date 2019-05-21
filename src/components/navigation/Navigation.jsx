import React from 'react'
import PropTypes from 'prop-types'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavbarBrand, Badge } from 'react-bootstrap'
import LodestoneCharacterMenu from './LodestoneCharacterMenu'

export default class Navigation extends React.Component {
  render () {
    const { characterData } = this.props
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <LinkContainer to="/">
          <NavbarBrand>
            FFXIV Crafting & Gathering Helper
          </NavbarBrand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/calculations">
            <Nav.Link>
              Calculations
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/recipes/all">
            <Nav.Link>
              Recipes <Badge variant="primary">Beta</Badge>
            </Nav.Link>
          </LinkContainer>
        </Nav>
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
