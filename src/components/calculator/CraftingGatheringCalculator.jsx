import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { concat, filter, find, isEqual, orderBy, set, toNumber } from 'lodash'
import FilterDropdown from './FilterDropdown'
import CalculationsTableHeader from './CalculationsTableHeader'
import CalculationsTableBody from './CalculationsTableBody'
import EXP_PER_LEVEL from '../../data/exp-per-level'
import { saveLocalClassData } from '../../store/local/actions'

class CraftingGatheringCalculator extends React.Component {
  state = {
    sort: {
      func: 'name',
      direction: 'asc'
    },
    filter: {
      func: undefined,
      label: 'All'
    }
  }

  applySort (sortFunc) {
    const { sort } = this.state
    const sortDirection = isEqual(sortFunc, sort.func) && sort.direction === 'asc' ? 'desc' : 'asc'
    this.setState({
      sort: {
        func: sortFunc,
        direction: sortDirection
      }
    })
  }

  applyFilter (filterFunc, event) {
    this.setState({
      filter: {
        func: filterFunc,
        label: event.target.innerText
      }
    })
  }

  getSortedCraftingClassData (craftingClassData) {
    const { sort } = this.state
    return orderBy(craftingClassData, sort.func, sort.direction)
  }

  getFilteredCraftingClassData (craftingClassData) {
    const { filter: { func } } = this.state
    return filter(craftingClassData, func)
  }

  updateField (abbreviation, event) {
    const { target: { value, name } } = event
    const { craftingClassData, saveLocalClassData } = this.props

    const targetCraftingClass = find(craftingClassData, c => c.abbreviation === abbreviation)
    const otherCraftingClasses = filter(craftingClassData, c => c.abbreviation !== abbreviation)
    set(targetCraftingClass, name, toNumber(value))

    if (name === 'currentLevel') {
      set(targetCraftingClass, 'totalExperience', EXP_PER_LEVEL[value])
    }

    const updatedCraftingClasses = orderBy(concat(otherCraftingClasses, targetCraftingClass), ['type', 'name'])

    saveLocalClassData(updatedCraftingClasses)
  }

  render () {
    const { craftingClassData } = this.props
    const sortedAndFilteredCraftingClassData = this.getSortedCraftingClassData(
      this.getFilteredCraftingClassData(craftingClassData)
    )

    return (
      <div>
        <div className="w-100 pv3 tc">
          <FilterDropdown label={this.state.filter.label} applyFilterFunc={this.applyFilter.bind(this)} />
        </div>
        <div className="table-responsive">
          <Table className="calculations" striped hover>
            <CalculationsTableHeader applySortFunc={this.applySort.bind(this)} />
            <CalculationsTableBody
              craftingClasses={sortedAndFilteredCraftingClassData}
              updateField={this.updateField.bind(this)}
            />
          </Table>
        </div>
      </div>
    )
  }
}

CraftingGatheringCalculator.propTypes = {
  craftingClassData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  characterData: PropTypes.shape()
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  saveLocalClassData: (classData) => dispatch(saveLocalClassData(classData))
})

export default connect(mapStateToProps, mapDispatchToProps)(CraftingGatheringCalculator)
