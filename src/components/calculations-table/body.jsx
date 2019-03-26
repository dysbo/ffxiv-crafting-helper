import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { map as _map } from 'lodash'
import CalculationsTableRow from './row'

class CalculationsTableBody extends React.Component {
  render () {
    const {
      data,
      handleCurrentLevelSelection,
      handleCurrentExperienceChange,
      handleExperiencePerItemChange,
      handleProgressChange,
      show
    } = this.props

    return (
      <tbody>
      {_map(data, (d, key) => (
        <CalculationsTableRow
          className={cx(show && show !== d.abbreviation ? 'd-none' : '')}
          key={key}
          data={d}
          handleCurrentLevelSelection={handleCurrentLevelSelection.bind(this, d.abbreviation)}
          handleCurrentExperienceChange={handleCurrentExperienceChange.bind(this, d.abbreviation)}
          handleExperiencePerItemChange={handleExperiencePerItemChange.bind(this, d.abbreviation)}
          handleProgressChange={handleProgressChange.bind(this, d.abbreviation)}
        />
      ))}
      </tbody>
    )
  }
}

CalculationsTableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    currentLevel: PropTypes.number.isRequired,
    currentExperience: PropTypes.number.isRequired,
    experiencePerItem: PropTypes.number.isRequired
  })),
  handleCurrentLevelSelection: PropTypes.func.isRequired,
  handleCurrentExperienceChange: PropTypes.func.isRequired,
  handleExperiencePerItemChange: PropTypes.func.isRequired,
  handleProgressChange: PropTypes.func.isRequired
}

export default CalculationsTableBody