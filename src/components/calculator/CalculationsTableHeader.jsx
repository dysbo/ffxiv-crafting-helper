import React from 'react'
import PropTypes from 'prop-types'
import { calculateProgressPercentage, calculateRemainingExp, calculateRemainingItems } from '../../service/calculations'
import SortableTableHeaderCell from '../common/SortableTableHeaderCell'

const tableHeaders = [
  { name: 'Class', sortFunc: 'name' },
  { name: 'Level', sortFunc: 'currentLevel' },
  { name: 'Current Exp.', sortFunc: 'currentExperience' },
  { name: 'Required Exp.', sortFunc: undefined },
  { name: 'Remaining Exp.', sortFunc: c => calculateRemainingExp(c.currentExperience, c.totalExperience) },
  { name: 'Exp. Per Item', sortFunc: 'experiencePerItem' },
  {
    name: 'Remaining Items',
    sortFunc: c => calculateRemainingItems(
      calculateRemainingExp(c.currentExperience, c.totalExperience), c.experiencePerItem
    )
  },
  { name: 'Progress', sortFunc: c => calculateProgressPercentage(c.currentExperience, c.totalExperience) }
]

export default class CalculationsTableHeader extends React.Component {
  render () {
    const { applySortFunc } = this.props
    return (
      <thead>
      <tr>
        {tableHeaders.map((h, key) => {
          if (h.sortFunc) {
            return (
              <SortableTableHeaderCell
                key={key}
                text={h.name}
                sortFunc={h.sortFunc}
                applySorting={applySortFunc}
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
    )
  }
}

CalculationsTableHeader.propTypes = {
  applySortFunc: PropTypes.func.isRequired
}
