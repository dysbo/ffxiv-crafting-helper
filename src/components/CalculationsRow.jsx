import React from 'react'
import PropTypes from 'prop-types'
import { forEach as _forEach, get as _get, isEqual as _isEqual, set as _set } from 'lodash'
import { Form, ProgressBar } from 'react-bootstrap'
import EXP_PER_LEVEL from '../data/exp-per-level'

class CalculationsRow extends React.Component {
  static validateValue (value, min, max) {
    if (!value) return 0

    min = parseInt(min)
    max = parseInt(max)
    value = parseInt(value)

    if (value < min) return min
    if (value > max) return max
    return value
  }

  constructor (props) {
    super(props)

    const { currentLevel, currentExperience, experiencePerItem, totalExperience } = props

    this.state = {
      currentLevel,
      currentExperience,
      experiencePerItem,
      totalExperience
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const fields = ['currentLevel', 'currentExperience', 'experiencePerItem', 'totalExperience']
    const newState = {}

    _forEach(fields, field => {
      if (!_isEqual(this.props[field], prevProps[field])) {
        _set(newState, field, this.props[field])
      }
    })

    if (Object.keys(newState).length > 0) {
      this.setState({
        ...newState
      })
    }
  }

  handleFieldUpdate (event) {
    const fieldName = _get(event, 'target.name')
    const fieldValue = _get(event, 'target.value')
    const validatedValue = CalculationsRow.validateValue(fieldValue,
      _get(event, 'target.min'), _get(event, 'target.max'))

    const newState = {}
    _set(newState, fieldName, validatedValue)

    if (fieldName === 'currentLevel') {
      _set(newState, 'totalExperience', EXP_PER_LEVEL[validatedValue])
    }

    this.setState({
      ...newState
    })
  }

  handleLocalStorageUpdate (event) {
    const { updateLocalStorage } = this.props
    const fieldName = _get(event, 'target.name')
    const data = {}
    data[fieldName] = this.state[fieldName]
    if (fieldName === 'currentLevel') {
      _set(data, 'totalExperience', _get(this.state, 'totalExperience'))
    }
    updateLocalStorage(data)
  }

  render () {
    const { name } = this.props
    const { currentLevel, currentExperience, experiencePerItem, totalExperience } = this.state
    const remainingExperience = totalExperience - currentExperience
    const progressPercentage = Math.floor((currentExperience / totalExperience) * 100)
    return (
      <tr className="calculations">
        <td>
          {name}
        </td>
        <td>
          <Form.Control
            type="number"
            min={1}
            max={69}
            value={currentLevel}
            name="currentLevel"
            onChange={this.handleFieldUpdate.bind(this)}
            onBlur={this.handleLocalStorageUpdate.bind(this)}
          />
        </td>
        <td>
          <Form.Control
            type="number"
            min={0}
            max={totalExperience}
            value={currentExperience}
            name="currentExperience"
            onChange={this.handleFieldUpdate.bind(this)}
            onBlur={this.handleLocalStorageUpdate.bind(this)}
          />
        </td>
        <td>
          {totalExperience}
        </td>
        <td>
          {remainingExperience}
        </td>
        <td>
          <Form.Control
            type="number"
            min={1}
            max={totalExperience}
            value={experiencePerItem}
            name="experiencePerItem"
            onChange={this.handleFieldUpdate.bind(this)}
            onBlur={this.handleLocalStorageUpdate.bind(this)}
          />
        </td>
        <td>
          {Math.max(Math.ceil(remainingExperience / experiencePerItem), 0)}
        </td>
        <td>
          <ProgressBar
            now={progressPercentage}
            label={`${currentExperience} / ${totalExperience} (${progressPercentage}%)`}
          />
        </td>
      </tr>
    )
  }
}

CalculationsRow.propTypes = {
  currentLevel: PropTypes.number.isRequired,
  currentExperience: PropTypes.number.isRequired,
  experiencePerItem: PropTypes.number.isRequired,
  totalExperience: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired,
  updateLocalStorage: PropTypes.func.isRequired
}

export default CalculationsRow
