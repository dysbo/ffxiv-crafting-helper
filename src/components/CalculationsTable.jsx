import React from 'react'
import PropTypes from 'prop-types'
import { map as _map } from 'lodash'
import { Table } from 'react-bootstrap'
import CalculationsRow from './CalculationsRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

class CalculationsTable extends React.Component {
  render () {
    const { classData, updateLocalStorage, updateSorting } = this.props
    return (
      <div>
        <Table hover striped className="calculations">
          <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={updateSorting.bind(this, 'name')}>
              Class
              <FontAwesomeIcon
                className="margin-left"
                icon={faSort}
              />
            </th>
            <th style={{ cursor: 'pointer' }} onClick={updateSorting.bind(this, 'currentLevel')}>
              Level
              <FontAwesomeIcon
                className="margin-left"
                icon={faSort}
              />
            </th>
            <th>Current Exp.</th>
            <th>Required Exp.</th>
            <th>Remaining Exp.</th>
            <th>Exp. Per Item</th>
            <th>Remaining Items</th>
            <th style={{ cursor: 'pointer' }} onClick={updateSorting.bind(this, c => {
              return !c.totalExperience ? 0 : (c.currentExperience / c.totalExperience) * 100
            })}>
              Progress
              <FontAwesomeIcon
                className="margin-left"
                icon={faSort}
              />
            </th>
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
  updateLocalStorage: PropTypes.func.isRequired,
  updateSorting: PropTypes.func.isRequired
}

CalculationsTable.defaultProps = {
  classData: []
}

export default CalculationsTable
