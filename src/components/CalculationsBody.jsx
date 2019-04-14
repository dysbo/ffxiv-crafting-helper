import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Container, Table, Form } from 'react-bootstrap'
import EXP_PER_LEVEL from '../data/exp-per-level'

class CalculationsBody extends React.Component {
  render () {
    const { craftingClasses } = this.props
    return (
      <Container fluid>
        <Table striped hover responsive>
          <thead>
          <tr>
            <th>Class</th>
            <th>Level</th>
            <th>Required Exp.</th>
            <th>Current Exp.</th>
            <th>Remaining Exp.</th>
          </tr>
          </thead>
          <tbody>
          {!!craftingClasses && map(craftingClasses, (craftingClass, key) => (
            <tr key={key}>
              <td>
                {craftingClass.name}
              </td>
              <td>
                {craftingClass.currentLevel}
              </td>
              <td>
                {EXP_PER_LEVEL[craftingClass.currentLevel]}
              </td>
              <td>
                <Form.Control type="number" value={craftingClass.currentExperience} disabled />
              </td>
              <td>
                {EXP_PER_LEVEL[craftingClass.currentLevel] - craftingClass.currentExperience}
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}

CalculationsBody.propTypes = {
  character: PropTypes.shape(),
  craftingClasses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
    currentLevel: PropTypes.number.isRequired,
    currentExperience: PropTypes.number.isRequired
  })).isRequired
}

CalculationsBody.defaultProps = {
  craftingClasses: []
}

export default CalculationsBody
