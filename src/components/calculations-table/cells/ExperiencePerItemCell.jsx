import React from 'react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'

class ExperiencePerItemCell extends React.Component {
  constructor (props) {
    super(props)

    const { experiencePerItem } = this.props

    this.state = {
      experiencePerItem
    }
  }

  handleExperiencePerItemChange (event) {
    const experiencePerItem = _get(event, 'target.value', event)
    this.setState({
      experiencePerItem
    })
  }

  handleExperiencePerItemBlur () {
    const { experiencePerItem } = this.state
    const { handleExperiencePerItemChange } = this.props

    handleExperiencePerItemChange(experiencePerItem)
  }

  render () {
    const { experiencePerItem } = this.state
    return (
      <td>
        <input
          type="number"
          value={experiencePerItem}
          onChange={this.handleExperiencePerItemChange.bind(this)}
          onBlur={this.handleExperiencePerItemBlur.bind(this)}
        />
      </td>
    )
  }
}

ExperiencePerItemCell.propTypes = {
  experiencePerItem: PropTypes.number.isRequired,
  handleExperiencePerItemChange: PropTypes.func.isRequired
}

export default ExperiencePerItemCell