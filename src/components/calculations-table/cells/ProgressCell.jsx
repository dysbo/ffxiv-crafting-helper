import React from 'react'
import PropTypes from 'prop-types'

class ProgressCell extends React.Component {
  static calculateProgress (currentExperience, totalExperience) {
    if (currentExperience < 0 || totalExperience < 1) {
      return 0
    }

    return Math.floor(currentExperience / totalExperience * 100)
  }

  render () {
    const { currentExperience, totalExperience } = this.props
    const progress = `${(ProgressCell.calculateProgress(currentExperience, totalExperience))}%`

    return (
      <td className="d-none d-sm-table-cell">
        <div className="progress">
          <div className="progress-bar" style={{ width: progress }}>
            {currentExperience} / {totalExperience} ({progress})
          </div>
        </div>
      </td>
    )
  }
}

ProgressCell.propTypes = {
  currentExperience: PropTypes.number.isRequired,
  totalExperience: PropTypes.number.isRequired
}

export default ProgressCell
