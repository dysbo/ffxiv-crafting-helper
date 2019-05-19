import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

class SortableTableHeaderCell extends React.Component {
  render () {
    const { className, text, sortFunc, applySorting } = this.props
    return (
      <th className={className} onClick={applySorting.bind(this, sortFunc)}
        style={{ cursor: 'pointer' }}
      >
        {text}
        <FontAwesomeIcon
          className="margin-left"
          icon={faSort}
        />
      </th>
    )
  }
}

SortableTableHeaderCell.propTypes = {
  text: PropTypes.string.isRequired,
  sortFunc: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  applySorting: PropTypes.func.isRequired
}

export default SortableTableHeaderCell
