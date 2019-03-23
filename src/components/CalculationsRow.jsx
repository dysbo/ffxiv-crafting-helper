import React from 'react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import experiencePerLevel from '../data/exp-per-level'

class CalculationsRow extends React.Component {
  state = {
    selectedLevel: 1,
    currentExperience: 0,
    experiencePerItem: 1
  }

  storageStrings = {}

  static pullDataItemFromLocalStorage (storageString, setMethod) {
    if (localStorage.getItem(storageString)) {
      setMethod(localStorage.getItem(storageString))
    }
  }

  elementId = (descriptor) => {
    const { craftingClass: { abbreviation } } = this.props
    return `${descriptor}${abbreviation}`
  }

  componentDidMount() {
    const { craftingClass: { abbreviation } } = this.props

    this.storageStrings = {
      currentLevel: `currentLevel${abbreviation}`,
      currentExperience: `currentExperience${abbreviation}`,
      experiencePerItem: `experiencePerItem${abbreviation}`
    }

    CalculationsRow.pullDataItemFromLocalStorage(
      this.storageStrings.currentLevel, this.handleLevelChange.bind(this))
    CalculationsRow.pullDataItemFromLocalStorage(
      this.storageStrings.experiencePerItem, this.handleExperiencePerItemChange.bind(this))
    CalculationsRow.pullDataItemFromLocalStorage(
      this.storageStrings.currentExperience, this.handleCurrentExperienceChange.bind(this))
  }

  handleCurrentExperienceChange (event) {
    const currentExperience = _get(event, 'target.value', event)
    this.setState({
      currentExperience
    }, () => localStorage.setItem(this.storageStrings.currentExperience, currentExperience))
  }

  handleExperiencePerItemChange (event) {
    const experiencePerItem = _get(event, 'target.value', event)
    this.setState({
      experiencePerItem
    }, () => localStorage.setItem(this.storageStrings.experiencePerItem, experiencePerItem))
  }

  handleLevelChange (event) {
    const selectedLevel = _get(event, 'target.value', event)
    this.setState({
      selectedLevel,
      currentExperience: 0
    }, () => {
      this.props.handleUpdateCurrentLevel(selectedLevel)
      localStorage.setItem(this.storageStrings.currentLevel, selectedLevel)
    })
  }

  render () {
    const { craftingClass, hidden } = this.props
    const { currentExperience, experiencePerItem, selectedLevel } = this.state

    const totalExperience = experiencePerLevel[selectedLevel]
    const remainingExperience = Math.max(totalExperience - currentExperience, 0)
    const itemsToLevel = Math.ceil((totalExperience - currentExperience) / experiencePerItem)
    const progress = Math.round(currentExperience / totalExperience * 100)

    return (
      <tr hidden={hidden}>
        <td>
          <span className="d-none d-sm-block">{craftingClass.name}</span>
          <span className="d-block d-sm-none">{craftingClass.abbreviation}</span>
        </td>
        <td>
          <select
            id={this.elementId('selectLevel')}
            className="fullWidth"
            value={selectedLevel}
            onChange={this.handleLevelChange.bind(this)}
          >
            {Object.keys(experiencePerLevel).map((level, key) => (
              <option key={key} value={level}>{level}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            id={this.elementId('tbCurrentExperience')}
            type="number"
            className="fullWidth"
            value={currentExperience}
            onChange={this.handleCurrentExperienceChange.bind(this)}
            min={0}
            max={totalExperience}
          />
        </td>
        <td className="d-none d-md-table-cell">
          {totalExperience}
        </td>
        <td className="d-none d-md-table-cell">
          {remainingExperience}
        </td>
        <td>
          <input
            id={this.elementId('tbExperiencePerItem')}
            type="number"
            className="fullWidth"
            value={experiencePerItem}
            onChange={this.handleExperiencePerItemChange.bind(this)}
          />
        </td>
        <td>
          {itemsToLevel}
        </td>
        <td className="d-none d-md-table-cell">
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            >
              {currentExperience} / {totalExperience} ({progress}%)
            </div>
          </div>
        </td>
      </tr>
    )
  }
}

CalculationsRow.propTypes = {
  craftingClass: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired
  }),
  handleUpdateCurrentLevel: PropTypes.func
}

CalculationsRow.defaultProps = {
  handleUpdateCurrentLevel: () => {}
}

export default CalculationsRow
