import React from 'react'
import {
  cloneDeep as _cloneDeep,
  concat as _concat,
  find as _find,
  get as _get,
  isEqual as _isEqual,
  orderBy as _orderBy,
  uniqBy as _uniqBy
} from 'lodash'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import * as LocalStorageService from '../service/localStorage'
import * as XivApi from '../service/xivApi'
import LodestoneModal from './LodestoneModal'
import CalculationsTable from './CalculationsTable'

class Calculations extends React.Component {
  state = {
    lodestoneModalIsOpen: false,
    sortData: {
      field: 'name',
      direction: 'asc'
    }
  }

  componentDidMount () {
    const characterData = LocalStorageService.retrieveAndUpdateCharacterData()
    const classData = LocalStorageService.retrieveAndUpdateCraftingClassData()

    this.setState({
      characterData,
      classData
    })
  }

  activateLodestoneModal () {
    this.setState({
      lodestoneModalIsOpen: true
    })
  }

  deactivateLodestoneModal () {
    this.setState({
      lodestoneModalIsOpen: false
    })
  }

  clearCharacterData () {
    LocalStorageService.clearCharacterData()
    this.setState({
      characterData: undefined
    })
  }

  async refreshCharacterData () {
    const characterId = _get(this.state, 'characterData.Character.ID')
    const characterData = await XivApi.getCharacter(characterId)
    this.updateCharacterData(characterData)
    // this.updateStoredDataWithLodestoneData()
  }

  updateCharacterData (characterData) {
    LocalStorageService.storeCharacterData(characterData)
    this.setState({
      characterData
    }, this.updateStoredDataWithLodestoneData.bind(this))
  }

  updateClassData (classData) {
    LocalStorageService.storeCraftingClassData(classData)
    this.setState({
      classData
    })
  }

  updateStoredDataWithLodestoneData () {
    this.updateClassData(LocalStorageService.updateCraftingClassDataWithCharacterData())
  }

  updateLocalStorage (abbreviation, newData) {
    const { classData } = this.state
    const newClassData = _cloneDeep(classData)
    const targetData = _find(newClassData, c => c.abbreviation === abbreviation)
    if (targetData) {
      const replacementData = {
        ...targetData,
        ...newData
      }

      const toUpdate = _uniqBy(_concat(replacementData, newClassData), c => c.abbreviation)

      this.updateClassData(toUpdate)
    }
  }

  applySorting (classData) {
    const { sortData } = this.state
    return _orderBy(_cloneDeep(classData), sortData.field, sortData.direction)
  }

  setSorting (field) {
    const { sortData } = this.state
    const newSortData = {
      ...sortData
    }

    if (_isEqual(JSON.stringify(sortData.field), JSON.stringify(field))) {
      newSortData.direction = sortData.direction === 'asc' ? 'desc' : 'asc'
    } else {
      newSortData.field = field
      newSortData.direction = 'asc'
    }

    this.setState({
      sortData: newSortData
    })
  }

  render () {
    const { characterData, classData, lodestoneModalIsOpen } = this.state
    const characterIsLoaded = !!characterData && !!characterData.Character
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            FFXIV Crafting & Gathering Helper
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav>
            {!characterIsLoaded && (
              <Nav.Link onClick={this.activateLodestoneModal.bind(this)}>
                Import Character Data
              </Nav.Link>
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
                <NavDropdown.Item onClick={this.refreshCharacterData.bind(this)}>
                  Refresh Character Class Data
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.activateLodestoneModal.bind(this)}>
                  Import Different Character Data
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.clearCharacterData.bind(this)}>
                  Clear Character Data
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar>
        <Container fluid>
          {!characterIsLoaded && !!characterData && (
            <div className="alert alert-info">
              Your character is being imported for the first time. Congratulations!<br />
              Please wait a few minutes and try your import again.
            </div>
          )}
          <CalculationsTable
            classData={this.applySorting(classData)}
            updateLocalStorage={this.updateLocalStorage.bind(this)}
            updateSorting={this.setSorting.bind(this)}
          />
        </Container>
        <LodestoneModal
          show={lodestoneModalIsOpen}
          onHide={this.deactivateLodestoneModal.bind(this)}
          onSelect={this.updateCharacterData.bind(this)}
        />
      </div>
    )
  }
}

export default Calculations
