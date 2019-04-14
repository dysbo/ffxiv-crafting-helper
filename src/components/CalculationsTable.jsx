import React from 'react'
import PropTypes from 'prop-types'
import { map as _map } from 'lodash'
import { Table } from 'react-bootstrap'
import CalculationsRow from './CalculationsRow'
import SortableTableHeader from './SortableTableHeader'

function sortByProgress (c) {
  return !c.totalExperience ? 0 : c.currentExperience / c.totalExperience
}

class CalculationsTable extends React.Component {
  render () {
    const { classData, updateLocalStorage, updateSorting } = this.props
    return (
      <div>
        <Table hover striped className="calculations">
          <thead>
          <tr>
            <SortableTableHeader text="Class" sortField="name" updateSorting={updateSorting} />
            <SortableTableHeader text="Level" sortField="currentLevel" updateSorting={updateSorting} className="numeric-entry" />
            <th className="numeric-entry">Current Exp.</th>
            <th>Required Exp.</th>
            <th>Remaining Exp.</th>
            <th className="numeric-entry">Exp. Per Item</th>
            <th>Remaining Items</th>
            <SortableTableHeader text="Progress" sortField={sortByProgress} updateSorting={updateSorting} />
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
