import React from 'react'
import {
  cloneDeep as _cloneDeep,
  concat as _concat,
  filter as _filter,
  find as _find,
  get as _get,
  isEqual as _isEqual,
  orderBy as _orderBy,
  uniqBy as _uniqBy
} from 'lodash'
import { Container } from 'react-bootstrap'
import * as LocalStorageService from '../service/localStorage'
import * as XivApi from '../service/xivApi'
import LodestoneModal from './LodestoneModal'
import CalculationsTable from './CalculationsTable'
import NavigationBar from './NavigationBar'

class Calculations extends React.Component {
  state = {
    lodestoneModalIsOpen: false,
    sortData: {
      field: 'name',
      direction: 'asc'
    },
    filterData: {
      label: 'All',
      criteria: undefined
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

  clearCraftingClassData () {
    LocalStorageService.clearCraftingClassData()
    this.setState({
      classData: LocalStorageService.retrieveAndUpdateCraftingClassData()
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

  applyFilter (classData) {
    const { filterData } = this.state
    return _filter(_cloneDeep(classData), filterData.criteria)
  }

  setFilter (label, criteria) {
    this.setState({
      filterData: {
        label,
        criteria
      }
    })
  }

  render () {
    const { characterData, classData, filterData, lodestoneModalIsOpen } = this.state
    const characterIsLoaded = !!characterData && !!characterData.Character
    return (
      <React.Fragment>
        <NavigationBar
          activateLodestoneModal={this.activateLodestoneModal.bind(this)}
          characterData={characterData}
          characterIsLoaded={characterIsLoaded}
          clearCharacterData={this.clearCharacterData.bind(this)}
          clearCraftingClassData={this.clearCraftingClassData.bind(this)}
          filterData={filterData}
          refreshCharacterData={this.refreshCharacterData.bind(this)}
          setFilter={this.setFilter.bind(this)}
        />
        <Container fluid>
          {!characterIsLoaded && !!characterData && (
            <div className="alert alert-info">
              Your character is being imported for the first time. Congratulations!<br />
              Please wait a few minutes and try your import again.
            </div>
          )}
          <CalculationsTable
            classData={this.applyFilter(this.applySorting(classData))}
            updateLocalStorage={this.updateLocalStorage.bind(this)}
            updateSorting={this.setSorting.bind(this)}
          />
          <hr />
          <div className="text-center text-muted">
            Version {process.env.REACT_APP_VERSION}
          </div>
        </Container>
        <LodestoneModal
          show={lodestoneModalIsOpen}
          onHide={this.deactivateLodestoneModal.bind(this)}
          onSelect={this.updateCharacterData.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default Calculations
