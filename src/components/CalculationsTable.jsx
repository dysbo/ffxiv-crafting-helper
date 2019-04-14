import React from 'react'
import PropTypes from 'prop-types'
import { map as _map } from 'lodash'
import { Table } from 'react-bootstrap'
import CalculationsRow from './CalculationsRow'

class CalculationsTable extends React.Component {
  render () {
    const { classData, updateLocalStorage } = this.props
    return (
      <div>
        <Table hover striped className="calculations">
          <thead>
          <tr>
            <th>Class</th>
            <th>Level</th>
            <th>Current Exp.</th>
            <th>Required Exp.</th>
            <th>Remaining Exp.</th>
            <th>Exp. Per Item</th>
            <th>Remaining Items</th>
            <th>Progress</th>
          </tr>
          </thead>
          <tbody>
          {!!classData && _map(classData, (c, k) => (
            <CalculationsRow key={k} {...c} updateLocalStorage={updateLocalStorage.bind(this, c.abbreviation)} />
          ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

CalculationsTable.propTypes = {
  classData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  updateLocalStorage: PropTypes.func.isRequired
}

CalculationsTable.defaultProps = {
  classData: []
}

export default CalculationsTable
