import React from 'react'
import PropTypes from 'prop-types'
import { calculateProgressPercentage, calculateRemainingExp, calculateRemainingItems } from '../../service/calculations'
import Form from 'react-bootstrap/es/Form'
import { OverlayTrigger, Popover, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle as faIcon } from '@fortawesome/free-solid-svg-icons'
import { find, set, toNumber } from 'lodash'
import LEVELING_GUIDE_LINKS from '../../data/leveling-guide-links'

class CalculationsTableBody extends React.Component {
  getLevelingGuidePageUrl (abbreviation, currentLevel) {
    const classGuideData = find(LEVELING_GUIDE_LINKS, g => g.abbreviation === abbreviation)
    const { levelingGuide } = classGuideData

    const matchedPage = find(levelingGuide.pages, p => {
      const { maxLevel, minLevel } = p

      if (currentLevel >= minLevel && currentLevel <= maxLevel) {
        return true
      }
    })

    return !!matchedPage ? `${levelingGuide.url}/${matchedPage.page}/` : levelingGuide.url
  }

  validateNumericFieldChange (abbreviation, event) {
    const { target: { value, max, min } } = event
    const { updateField } = this.props

    if (!!min && toNumber(value) < min) {
      set(event, 'target.value', min)
    }

    if (!!max && toNumber(value) > max) {
      set(event, 'target.value', max)
    }

    updateField(abbreviation, event)
  }

  render () {
    const { craftingClasses } = this.props
    return (
      <tbody>
      {craftingClasses.map((c, key) => {
        const remainingExperience = calculateRemainingExp(c.currentExperience, c.totalExperience)
        const remainingItems = calculateRemainingItems(remainingExperience, c.experiencePerItem)
        const progressPercentage = calculateProgressPercentage(c.currentExperience, c.totalExperience)

        const popover = (
          <Popover id={`links-${c.name}`}>
            <a
              href={this.getLevelingGuidePageUrl(c.abbreviation, c.currentLevel)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leveling Guide
            </a>
          </Popover>
        )

        return (
          <tr key={key}>
            <td>
              <div className="flex justify-between items-center">
                {c.name}
                <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
                  <FontAwesomeIcon icon={faIcon} className="text-primary pointer" />
                </OverlayTrigger>
              </div>
            </td>
            <td>
              <Form.Control
                name="currentLevel"
                type="number"
                value={c.currentLevel}
                min="1"
                max="70"
                onChange={this.validateNumericFieldChange.bind(this, c.abbreviation)}
              />
            </td>
            <td>
              <Form.Control
                name="currentExperience"
                type="number"
                value={c.currentExperience}
                min="0"
                max={c.totalExperience}
                onChange={this.validateNumericFieldChange.bind(this, c.abbreviation)}
              />
            </td>
            <td>{c.totalExperience}</td>
            <td>{remainingExperience}</td>
            <td>
              <Form.Control
                name="experiencePerItem"
                type="number"
                value={c.experiencePerItem}
                min="1"
                onChange={this.validateNumericFieldChange.bind(this, c.abbreviation)}
              />
            </td>
            <td>{remainingItems}</td>
            <td>
              <ProgressBar
                now={progressPercentage}
                label={`${c.currentExperience} / ${c.totalExperience} (${progressPercentage}%)`}
              />
            </td>
          </tr>
        )
      })}
      </tbody>
    )
  }
}

CalculationsTableBody.propTypes = {
  craftingClasses: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default CalculationsTableBody
