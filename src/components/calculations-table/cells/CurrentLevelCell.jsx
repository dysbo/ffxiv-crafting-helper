import React from 'react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import expPerLevel from '../../../data/exp-per-level'

class CurrentLevelCell extends React.Component {
  handleCurrentLevelSelection (event) {
    const currentLevel = _get(event, 'target.value', event)
    const totalExperience = expPerLevel[currentLevel]

    this.props.handleCurrentLevelSelection(currentLevel, totalExperience)
  }

  render () {
    const { currentLevel } = this.props

    return (
      <td>
        <select value={currentLevel} onChange={this.handleCurrentLevelSelection.bind(this)}>
          {Object.keys(expPerLevel).map((level, key) => (
            <option key={key} value={level}>{level}</option>
          ))}
        </select>
      </td>
    )
  }
}

CurrentLevelCell.propTypes = {
  currentLevel: PropTypes.number.isRequired,
  handleCurrentLevelSelection: PropTypes.func.isRequired
}

export default CurrentLevelCell
