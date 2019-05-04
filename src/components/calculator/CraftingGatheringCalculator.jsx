import React from 'react'
import PropTypes from 'prop-types'
import { Form, ProgressBar, Table } from 'react-bootstrap'
import { filter, isEqual, orderBy } from 'lodash'
import SortableTableHeaderCell from './SortableTableHeaderCell'
import FilterDropdown from './FilterDropdown'

const tableHeaders = [
  { name: 'Class', sortFunc: 'name' },
  { name: 'Level', sortFunc: 'currentLevel' },
  { name: 'Current Exp.', sortFunc: 'currentExperience' },
  { name: 'Required Exp.', sortFunc: undefined },
  { name: 'Remaining Exp.', sortFunc: c => calcRemainingExp(c.currentExperience, c.totalExperience) },
  { name: 'Exp. Per Item', sortFunc: 'experiencePerItem' },
  {
    name: 'Remaining Items',
    sortFunc: c => calcRemainingItems(calcRemainingExp(c.currentExperience, c.totalExperience), c.experiencePerItem)
  },
  { name: 'Progress', sortFunc: c => calcProgressPercentage(c.currentExperience, c.totalExperience) }
]

function calcRemainingExp (currentExp, totalExp) {
  return Math.max(totalExp - currentExp, 0)
}

function calcRemainingItems (remainingExp, expPerItem) {
  return Math.ceil(remainingExp / expPerItem)
}

function calcProgressPercentage (currentExp, totalExp) {
  return totalExp <= 0 ? 0 : Math.floor((currentExp / totalExp) * 100)
}

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
            <thead>
            <tr>
              {tableHeaders.map((h, key) => {
                if (h.sortFunc) {
                  return (
                    <SortableTableHeaderCell
                      key={key}
                      text={h.name}
                      sortFunc={h.sortFunc}
                      applySorting={this.applySort.bind(this)}
                    />
                  )
                } else {
                  return (
                    <th key={key}>
                      {h.name}
                    </th>
                  )
                }
              })}
            </tr>
            </thead>
            <tbody>
            {sortedAndFilteredCraftingClassData.map((c, key) => {
              const remainingExperience = calcRemainingExp(c.currentExperience, c.totalExperience)
              const remainingItems = calcRemainingItems(remainingExperience, c.experiencePerItem)
              const progressPercentage = calcProgressPercentage(c.currentExperience, c.totalExperience)
              return (
                <tr key={key}>
                  <td>{c.name}</td>
                  <td>
                    <Form.Control type="number" value={c.currentLevel} readOnly />
                  </td>
                  <td>
                    <Form.Control type="number" value={c.currentExperience} readOnly />
                  </td>
                  <td>{c.totalExperience}</td>
                  <td>{remainingExperience}</td>
                  <td>
                    <Form.Control type="number" value={c.experiencePerItem} readOnly />
                  </td>
                  <td>{remainingItems}</td>
                  <td>
                    <ProgressBar
                      now={progressPercentage}
                      label={`${c.currentExperience} / ${c.totalExperience} (${progressPercentage}%)`}
                    />
                  </td>
                </tr>
              )
            })}
            </tbody>
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
