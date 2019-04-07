import React from 'react'
import PropTypes from 'prop-types'
import SortableHeaderCell from './cells/SortableHeaderCell'

class CalculationsTableHead extends React.Component {
  render () {
    const { handleSortUpdate, sort } = this.props
    return (
      <thead>
      <tr>
        <SortableHeaderCell
          fieldName="name"
          handleSortUpdate={handleSortUpdate}
          sort={sort}
          text={<span>Crafting/<br />Gathering Class</span>}
        />
        <SortableHeaderCell
          className="currentLevel"
          handleSortUpdate={handleSortUpdate}
          sort={sort}
          fieldName="currentLevel"
          text="Level"
        />
        <th>Current Experience</th>
        <th className="d-none d-sm-table-cell">Total Experience</th>
        <th className="d-none d-sm-table-cell">Remaining Experience</th>
        <th>Experience Per Item</th>
        <th>Items to Level Up</th>
        <SortableHeaderCell
          className="d-none d-sm-table-cell"
          handleSortUpdate={handleSortUpdate}
          fieldName={'progress'}
          text="Progress"
          sort={sort}
        />
      </tr>
      </thead>
    )
  }
}

CalculationsTableHead.propTypes = {
  handleSortUpdate: PropTypes.func,
  sort: PropTypes.shape({
    asc: PropTypes.bool.isRequired,
    field: PropTypes.string.isRequired
  })
}

CalculationsTableHead.defaultProps = {
  handleSortUpdate: () => {}
}

export default CalculationsTableHead
