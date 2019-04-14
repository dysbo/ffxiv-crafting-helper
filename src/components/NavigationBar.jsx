import React from 'react'
import PropTypes from 'prop-types'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { map as _map, orderBy as _orderBy } from 'lodash'
import CRAFTING_CLASSES from '../data/crafting-classes'

class NavigationBar extends React.Component {
  render () {
    const {
      activateLodestoneModal,
      characterData,
      characterIsLoaded,
      clearCharacterData,
      clearCraftingClassData,
      filterData,
      refreshCharacterData,
      setFilter
    } = this.props

    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
          FFXIV Crafting & Gathering Helper
        </Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title={`Showing ${filterData.label}`}>
            <NavDropdown.Item onClick={setFilter.bind(this, 'All', undefined)}>
              Show All
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={setFilter.bind(this, 'Crafting Classes', c => c.type === 'crafting')}>
              Crafting Classes
            </NavDropdown.Item>
            <NavDropdown.Item onClick={setFilter.bind(this, 'Gathering Classes', c => c.type === 'gathering')}>
              Gathering Classes
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {_map(_orderBy(CRAFTING_CLASSES, 'name'), (cc, key) => (
              <NavDropdown.Item
                key={key}
                onClick={setFilter.bind(this, cc.name, c => cc.abbreviation === c.abbreviation)}
              >
                {cc.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <Nav>
          {!characterIsLoaded && (
            <React.Fragment>
              <Nav.Link onClick={activateLodestoneModal.bind(this)}>
                Import Character Data
              </Nav.Link>
              <Nav.Link onClick={clearCraftingClassData.bind(this)}>
                Clear Crafting Class Data
              </Nav.Link>
            </React.Fragment>
          )}
          {characterIsLoaded && (
            <NavDropdown
              title={(
                <span>
                    {characterData.Character.Name}
                  <img
                    src={characterData.Character.Avatar}
                    alt={characterData.Character.Name}
                    className="character-icon"
                  />
                    </span>)}
              className="dropleft"
            >
              <NavDropdown.Item onClick={refreshCharacterData.bind(this)}>
                Refresh Character Class Data
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={activateLodestoneModal.bind(this)}>
                Import Different Character Data
              </NavDropdown.Item>
              <NavDropdown.Item onClick={clearCharacterData.bind(this)}>
                Clear Character Data
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={clearCraftingClassData.bind(this)}>
                Clear Crafting Class Data
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar>
    )
  }
}

NavigationBar.propTypes = {
  activateLodestoneModal: PropTypes.func.isRequired,
  characterData: PropTypes.shape({
    Character: PropTypes.shape({
      Avatar: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired
    })
  }),
  characterIsLoaded: PropTypes.bool.isRequired,
  clearCharacterData: PropTypes.func.isRequired,
  clearCraftingClassData: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    criteria: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }).isRequired,
  refreshCharacterData: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default NavigationBar
