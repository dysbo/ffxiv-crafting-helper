import React from 'react'
import PropTypes from 'prop-types'
import { Form, ProgressBar, Table } from 'react-bootstrap'

export default class CraftingGatheringCalculator extends React.Component {
  render () {
    const { craftingClassData } = this.props
    console.log(craftingClassData)

    const tableHeaders = [
      { name: 'Class', sortFunc: undefined },
      { name: 'Level', sortFunc: undefined },
      { name: 'Current Exp.', sortFunc: undefined },
      { name: 'Required Exp.', sortFunc: undefined },
      { name: 'Remaining Exp.', sortFunc: undefined },
      { name: 'Exp. Per Item', sortFunc: undefined },
      { name: 'Remaining Items', sortFunc: undefined },
      { name: 'Progress', sortFunc: undefined },
    ]

    return (
      <div className="table-responsive">
        <Table striped hover>
          <thead>
          <tr>
            {tableHeaders.map((h, key) => (
              <th key={key}>
                {h.name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {craftingClassData.map((c, key) => {
            const remainingExperience = Math.max(c.totalExperience - c.currentExperience, 0)
            const remainingItems = Math.ceil(remainingExperience / c.experiencePerItem)
            const progressPercentage = c.totalExperience === 0 ? 0 : Math.floor((c.currentExperience / c.totalExperience) * 100)
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
        </Table>
      </div>
    )
  }
}

CraftingGatheringCalculator.propTypes = {
  craftingClassData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  characterData: PropTypes.shape()
}
