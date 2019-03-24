import React from 'react'
import PropTypes from 'prop-types'

class ProgressCell extends React.Component {
  render () {
    const { currentExperience, totalExperience } = this.props
    const progress = `${(Math.round(currentExperience / totalExperience * 100))}%`

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
