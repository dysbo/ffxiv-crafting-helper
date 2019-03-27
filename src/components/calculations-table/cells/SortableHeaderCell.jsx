import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

class SortableHeaderCell extends React.Component {
  render () {
    const { className, fieldName, handleSortUpdate, sort, style, text } = this.props
    return (
      <th className={cx(className)} style={style}>
        <button
          className="link-like"
          onClick={handleSortUpdate.bind(this, fieldName)}
        >
          {text}
          &nbsp;
          <FontAwesomeIcon
            icon={sort.field === fieldName ? (sort.asc ? faSortUp : faSortDown) : faSort}
          />
        </button>
      </th>
    )
  }
}

SortableHeaderCell.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  handleSortUpdate: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    asc: PropTypes.bool.isRequired,
    field: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.shape(),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
}

export default SortableHeaderCell
