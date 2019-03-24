import React from 'react'
import PropTypes from 'prop-types'
import { get as _get, toNumber as _toNumber } from 'lodash'

class CurrentExperienceCell extends React.Component {
  constructor(props) {
    super(props)
    const { currentExperience } = props

    this.state = {
      currentExperience: _toNumber(currentExperience)
    }
  }

  handleCurrentExperienceChange (event) {
    const currentExperience = _get(event, 'target.value', event)
    this.setState({
      currentExperience
    })
  }

  handleCurrentExperienceBlur () {
    const { currentExperience } = this.state
    const { handleCurrentExperienceChange } = this.props
    handleCurrentExperienceChange(currentExperience)
  }

  render () {
    const { currentExperience } = this.state
    const { totalExperience } = this.props

    return (
      <td>
        <input
          type="number"
          value={currentExperience}
          onChange={this.handleCurrentExperienceChange.bind(this)}
          onBlur={this.handleCurrentExperienceBlur.bind(this)}
          min={0}
          max={Math.max(totalExperience, 1)}
        />
      </td>
    )
  }
}

CurrentExperienceCell.propTypes = {
  currentExperience: PropTypes.number.isRequired,
  handleCurrentExperienceChange: PropTypes.func.isRequired
}

export default CurrentExperienceCell
