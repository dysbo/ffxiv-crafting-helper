import React from 'react'
import {
  cloneDeep as _cloneDeep,
  find as _find,
  get as _get,
  orderBy as _orderBy,
  toNumber as _toNumber
} from 'lodash'
import CalculationsTableHead from './CalculationsTableHead'
import CalculationsTableBody from './CalculationsTableBody'
import FilterCraftingClasses from './FilterCraftingClasses'
import { retrieveAndUpdateStoredData } from '../../util/localStorageHelper'

class CalculationsTable extends React.Component {
  constructor(props) {
    super(props)
    const craftingClasses = retrieveAndUpdateStoredData()
    this.state = {
      craftingClasses,
      show: '',
      sort: {
        field: 'name',
        asc: true
      }
    }
  }

  handleCurrentLevelSelection (abbreviation, level, totalExperience) {
    const { craftingClasses } = this.state
    const craftingClassesClone = _cloneDeep(craftingClasses)
    const craftingClass = _find(craftingClassesClone, c => c.abbreviation === abbreviation)

    craftingClass.currentLevel = _toNumber(level)
    craftingClass.totalExperience = totalExperience
    this.setState({
      craftingClasses: craftingClassesClone
    }, () => localStorage.setItem('craftingClasses', JSON.stringify(craftingClassesClone)))
  }

  handleCurrentExperienceChange (abbreviation, currentExperience) {
    const { craftingClasses } = this.state
    const craftingClassesClone = _cloneDeep(craftingClasses)
    const craftingClass = _find(craftingClassesClone, c => c.abbreviation === abbreviation)

    craftingClass.currentExperience = _toNumber(currentExperience)
    this.setState({
      craftingClasses: craftingClassesClone
    }, () => localStorage.setItem('craftingClasses', JSON.stringify(craftingClassesClone)))
  }

  handleExperiencePerItemChange (abbreviation, experiencePerItem) {
    const { craftingClasses } = this.state
    const craftingClassesClone = _cloneDeep(craftingClasses)
    const craftingClass = _find(craftingClassesClone, c => c.abbreviation === abbreviation)

    craftingClass.experiencePerItem = _toNumber(experiencePerItem)
    this.setState({
      craftingClasses: craftingClassesClone
    }, () => localStorage.setItem('craftingClasses', JSON.stringify(craftingClassesClone)))
  }

  handleFilterUpdate (event) {
    const show = _get(event, 'target.value', event)
    this.setState({
      show
    })
  }

  handleSortUpdate (field) {
    const sort = _cloneDeep(_get(this.state, 'sort', {}))
    if (_get(sort, 'field') !== field) {
      sort.asc = true
    } else {
      sort.asc = !sort.asc
    }
    sort.field = field
    this.setState({
      sort
    })
  }

  handleProgressChange (abbreviation, progress) {
    const { craftingClasses } = this.state
    const craftingClassesClone = _cloneDeep(craftingClasses)
    const craftingClass = _find(craftingClassesClone, c => c.abbreviation === abbreviation)

    craftingClass.progress = progress
    this.setState({
      craftingClasses: craftingClassesClone
    }, () => localStorage.setItem('craftingClasses', JSON.stringify(craftingClassesClone)))
  }

  render () {
    const { craftingClasses, show, sort } = this.state

    const sortedCraftingClasses = _orderBy(craftingClasses, [this.state.sort.field], [this.state.sort.asc ? 'asc' : 'desc'])

    return (
      <React.Fragment>
        <FilterCraftingClasses
          handleFilterUpdate={this.handleFilterUpdate.bind(this)}
          options={_cloneDeep(sortedCraftingClasses)}
        />
        <div className="table-responsive">
          <table className="table table-hover table-condensed">
            <CalculationsTableHead
              data={sortedCraftingClasses}
              sort={sort}
              handleSortUpdate={this.handleSortUpdate.bind(this)}
            />
            <CalculationsTableBody
              data={sortedCraftingClasses}
              show={show}
              handleCurrentLevelSelection={this.handleCurrentLevelSelection.bind(this)}
              handleCurrentExperienceChange={this.handleCurrentExperienceChange.bind(this)}
              handleExperiencePerItemChange={this.handleExperiencePerItemChange.bind(this)}
              handleProgressChange={this.handleProgressChange.bind(this)}
            />
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default CalculationsTable
