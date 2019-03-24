import React from 'react'
import PropTypes from 'prop-types'

class CraftingClassCell extends React.Component {
  render () {
    const { abbreviation, name } = this.props
    return (
      <td>
        <div className="d-none d-sm-block">{name}</div>
        <div className="d-block d-sm-none">{abbreviation}</div>
      </td>
    )
  }
}

CraftingClassCell.propTypes = {
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string.isRequired
}

export default CraftingClassCell
