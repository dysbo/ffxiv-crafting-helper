import React from 'react'
import { cloneDeep as _cloneDeep, concat as _concat, find as _find, get as _get, uniqBy as _uniqBy } from 'lodash'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import * as LocalStorageService from '../service/localStorage'
import * as XivApi from '../service/xivApi'
import LodestoneModal from './LodestoneModal'
import CalculationsTable from './CalculationsTable'

class Calculations extends React.Component {
  state = {
    lodestoneModalIsOpen: false
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

  render () {
    const { characterData, classData, lodestoneModalIsOpen } = this.state
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            FFXIV Crafting & Gathering Helper
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav>
            {!characterData && (
              <Nav.Link onClick={this.activateLodestoneModal.bind(this)}>
                Import Character Data
              </Nav.Link>
            )}
            {!!characterData && (
              <NavDropdown title={characterData.Character.Name} className="dropleft">
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
          <CalculationsTable classData={classData} updateLocalStorage={this.updateLocalStorage.bind(this)} />
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
