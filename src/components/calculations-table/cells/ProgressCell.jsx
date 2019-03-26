import React from 'react'
import { get as _get, isEqual as _isEqual } from 'lodash'
import PropTypes from 'prop-types'

class ProgressCell extends React.Component {
  static calculateProgress (currentExperience, totalExperience) {
    if (currentExperience < 0 || totalExperience < 1) {
      return 0
    }

    return Math.floor(currentExperience / totalExperience * 100)
  }

  state = {
    progress: 0
  }

  componentDidMount() {
    const { currentExperience, totalExperience } = this.props
    this.handleProgressChange(ProgressCell.calculateProgress(currentExperience, totalExperience))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const oldCurrentExp = _get(prevProps, 'currentExperience', 0)
    const oldTotalExp = _get(prevProps, 'totalExperience', 1)

    const newCurrentExp = _get(this.props, 'currentExperience', 0)
    const newTotalExp = _get(this.props, 'totalExperience', 1)

    if (!_isEqual(oldCurrentExp, newCurrentExp) || !_isEqual(oldTotalExp, newTotalExp)) {
      const progress = ProgressCell.calculateProgress(newCurrentExp, newTotalExp)
      this.handleProgressChange(progress)
    }
  }

  handleProgressChange (progress) {
    const { handleProgressChange } = this.props
    this.setState({
      progress
    }, () => handleProgressChange(progress))
  }

  render () {
    const { currentExperience, totalExperience } = this.props
    const progress = `${this.state.progress}%`

    return (
      <td className="d-none d-sm-table-cell">
        <div className="progress">
          <div className="progress-bar" style={{ width: progress }}>
            {currentExperience.toLocaleString()} / {totalExperience.toLocaleString()} ({progress})
          </div>
        </div>
      </td>
    )
  }
}

ProgressCell.propTypes = {
  currentExperience: PropTypes.number.isRequired,
  totalExperience: PropTypes.number.isRequired,
  handleProgressChange: PropTypes.func.isRequired
}

export default ProgressCell
