import React from 'react'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
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
import * as LocalStorageService from '../../service/localStorage'
import * as XivApi from '../../service/xivApi'
import LodestoneModal from './LodestoneModal'
import CalculationsTable from './CalculationsTable'
import NavigationBar from './NavigationBar'
import ImportAlert from './ImportAlert'

dayjs.extend(isSameOrBefore)

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

  async refreshCharacterData (id) {
    const characterId = _get(this.state, 'characterData.Character.ID', id)
    const parseDate = _get(this.state, 'characterData.Character.ParseDate')
    if (!!parseDate) {
      const parseDateTime = dayjs(parseDate * 1000)
      const sixHoursAgo = dayjs().add(-6, 'h')
      const canRefreshCharacterData = parseDateTime.isBefore(sixHoursAgo)

      if (!canRefreshCharacterData) {
        const confirmed = window.confirm(`Character data was last obtained ${parseDateTime.format('YYYY-MM-DD HH:mm')}.  ` +
          'Please wait at least six hours for an update from Lodestone.  Next update will be available ' +
          `at ${parseDateTime.add(6, 'h').format('YYYY-MM-DD HH:mm')}.  If you would ` +
          `like to overwrite local changes with current Lodestone data, you may do so by clicking 'OK' on this alert.`)

        if (!confirmed) return
      }
    }
    const characterData = await XivApi.getCharacter(characterId)
    this.updateCharacterData(characterData)
    this.updateStoredDataWithLodestoneData()
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
          <ImportAlert
            characterData={characterData}
            characterIsLoaded={characterIsLoaded}
            refreshCharacterData={this.refreshCharacterData.bind(this)}
          />
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
