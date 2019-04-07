import React from 'react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import expPerLevel from '../../../data/exp-per-level'

class CurrentLevelCell extends React.Component {
  handleCurrentLevelSelection (event) {
    const currentLevel = _get(event, 'target.value', event)

    const validatedCurrentLevel =
      currentLevel < 1 ? 1
        : currentLevel > 69 ? 69
        : currentLevel

    const totalExperience = expPerLevel[validatedCurrentLevel]

    this.props.handleCurrentLevelSelection(validatedCurrentLevel, totalExperience)
  }

  handleFocus (event) {
    event.target.select()
  }

  render () {
    const { currentLevel } = this.props

    return (
      <td>
        <input
          type="number"
          onChange={this.handleCurrentLevelSelection.bind(this)}
          min={1}
          max={69}
          value={currentLevel}
          onFocus={this.handleFocus.bind(this)}
        />
      </td>
    )
  }
}

CurrentLevelCell.propTypes = {
  currentLevel: PropTypes.number.isRequired,
  handleCurrentLevelSelection: PropTypes.func.isRequired
}

export default CurrentLevelCell
