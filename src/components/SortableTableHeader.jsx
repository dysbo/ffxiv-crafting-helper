import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

class SortableTableHeader extends React.Component {
  render () {
    const { className, text, sortField, updateSorting } = this.props
    console.log(className)
    return (
      <th className={className} onClick={updateSorting.bind(this, sortField)}
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

SortableTableHeader.propTypes = {
  text: PropTypes.string.isRequired,
  sortField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  updateSorting: PropTypes.func.isRequired
}

export default SortableTableHeader
