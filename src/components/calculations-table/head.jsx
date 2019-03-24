import React from 'react'

class CalculationsTableHead extends React.Component {
  render () {
    return (
      <thead>
      <tr>
        <th>Crafting Class</th>
        <th style={{ minWidth: '75px' }}>Level</th>
        <th>Current Experience</th>
        <th className="d-none d-sm-table-cell">Total Experience</th>
        <th className="d-none d-sm-table-cell">Remaining Experience</th>
        <th>Experience Per Crafted Item</th>
        <th>Items to Level Up</th>
        <th className="d-none d-sm-table-cell">Progress</th>
      </tr>
      </thead>
    )
  }
}

export default CalculationsTableHead
