import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { filter, isEqual, orderBy } from 'lodash'
import FilterDropdown from './FilterDropdown'
import CalculationsTableHeader from './CalculationsTableHeader'
import CalculationsTableBody from './CalculationsTableBody'

export default class CraftingGatheringCalculator extends React.Component {
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
            <CalculationsTableBody craftingClasses={sortedAndFilteredCraftingClassData} />
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
