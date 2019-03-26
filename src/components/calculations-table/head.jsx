import React from 'react'
import PropTypes from 'prop-types'

class CalculationsTableHead extends React.Component {
  render () {
    return (
      <thead>
      <tr>
        <th>
          <button className="link-like" onClick={this.props.handleSortUpdate.bind(this, 'name')}>
            Crafting/<br />Gathering Class
          </button>
        </th>
        <th style={{ minWidth: '75px' }}>
          <button className="link-like" onClick={this.props.handleSortUpdate.bind(this, 'currentLevel')}>
            Level
          </button>
        </th>
        <th>Current Experience</th>
        <th className="d-none d-sm-table-cell">Total Experience</th>
        <th className="d-none d-sm-table-cell">Remaining Experience</th>
        <th>Experience Per Item</th>
        <th>Items to Level Up</th>
        <th className="d-none d-sm-table-cell">
          <button className="link-like" onClick={this.props.handleSortUpdate.bind(this, 'progress')}>
            Progress
          </button>
        </th>
      </tr>
      </thead>
    )
  }
}

CalculationsTableHead.propTypes = {
  handleSortUpdate: PropTypes.func
}

CalculationsTableHead.defaultProps = {
  handleSortUpdate: () => {}
}

export default CalculationsTableHead
