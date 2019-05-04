import React from 'react'
import PropTypes from 'prop-types'
import { calculateProgressPercentage, calculateRemainingExp, calculateRemainingItems } from '../../service/calculations'
import Form from 'react-bootstrap/es/Form'
import { ProgressBar } from 'react-bootstrap'

export default class CalculationsTableBody extends React.Component {
  render () {
    const { craftingClasses } = this.props
    return (
      <tbody>
      {craftingClasses.map((c, key) => {
        const remainingExperience = calculateRemainingExp(c.currentExperience, c.totalExperience)
        const remainingItems = calculateRemainingItems(remainingExperience, c.experiencePerItem)
        const progressPercentage = calculateProgressPercentage(c.currentExperience, c.totalExperience)
        return (
          <tr key={key}>
            <td>{c.name}</td>
            <td>
              <Form.Control type="number" value={c.currentLevel} readOnly />
            </td>
            <td>
              <Form.Control type="number" value={c.currentExperience} readOnly />
            </td>
            <td>{c.totalExperience}</td>
            <td>{remainingExperience}</td>
            <td>
              <Form.Control type="number" value={c.experiencePerItem} readOnly />
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
