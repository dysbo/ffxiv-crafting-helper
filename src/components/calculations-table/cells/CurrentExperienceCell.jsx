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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentExperience !== prevProps.currentExperience) {
      this.setState({
        currentExperience: _toNumber(this.props.currentExperience)
      })
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

  handleKeyPress (event) {
    const keyCode = _get(event, 'keyCode')

    if (keyCode === 13) {
      this.handleCurrentExperienceBlur()
    }
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
          onKeyDown={this.handleKeyPress.bind(this)}
          min={0}
          max={Math.max(totalExperience, 1)}
          step={100}
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
