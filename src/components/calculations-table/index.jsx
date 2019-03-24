import React from 'react'
import {
  cloneDeep as _cloneDeep,
  find as _find,
  get as _get,
  map as _map,
  orderBy as _orderBy,
  toNumber as _toNumber
} from 'lodash'
import CalculationsTableHead from './head'
import CalculationsTableBody from './body'
import craftingClasses from '../../data/crafting-classes'
import FilterCraftingClasses from './FilterCraftingClasses'

const STATE = {
  craftingClasses: _map(craftingClasses, c => {
    c.currentLevel = 1
    c.currentExperience = 0
    c.experiencePerItem = 1
    c.totalExperience = 300
    return c
  }),
  show: '',
  sort: {
    field: 'name',
    asc: true
  }
}

class CalculationsTable extends React.Component {
  constructor(props) {
    super(props)
    const craftingClasses = localStorage.getItem('craftingClasses')
    if (craftingClasses) {
      this.state = {
        craftingClasses: JSON.parse(craftingClasses),
        show: '',
        sort: {
          field: 'name',
          asc: true
        }
      }
    } else {
      this.state = STATE
    }
  }

  handleCurrentLevelSelection (abbreviation, level, totalExperience) {
    const { craftingClasses } = this.state
    const craftingClassesClone = _cloneDeep(craftingClasses)
    const craftingClass = _find(craftingClassesClone, c => c.abbreviation === abbreviation)

    craftingClass.currentLevel = _toNumber(level)
    craftingClass.totalExperience = totalExperience
    craftingClass.currentExperience = 0
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
    }, () => console.log(this.state.sort))
  }

  render () {
    const { craftingClasses, show } = this.state

    const sortedCraftingClasses = _orderBy(craftingClasses, [this.state.sort.field], [this.state.sort.asc ? 'asc' : 'desc'])

    return (
      <React.Fragment>
        <FilterCraftingClasses
          handleFilterUpdate={this.handleFilterUpdate.bind(this)}
          options={sortedCraftingClasses}
        />
        <table className="table table-hover table-condensed table-responsive">
          <CalculationsTableHead data={sortedCraftingClasses} handleSortUpdate={this.handleSortUpdate.bind(this)} />
          <CalculationsTableBody
            data={sortedCraftingClasses}
            show={show}
            handleCurrentLevelSelection={this.handleCurrentLevelSelection.bind(this)}
            handleCurrentExperienceChange={this.handleCurrentExperienceChange.bind(this)}
            handleExperiencePerItemChange={this.handleExperiencePerItemChange.bind(this)}
          />
        </table>
      </React.Fragment>
    )
  }
}

export default CalculationsTable
