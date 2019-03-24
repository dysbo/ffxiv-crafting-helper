import React from 'react'
import PropTypes from 'prop-types'

class FilterCraftingClasses extends React.Component {
  render () {
    return (
      <div>
        <select className="fullWidth" onChange={this.props.handleFilterUpdate}>
          <option value="">Show All</option>
          {this.props.options.map((o, key) => (
            <option key={key} value={o.abbreviation}>{o.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

FilterCraftingClasses.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired
  })).isRequired,
  handleFilterUpdate: PropTypes.func.isRequired
}

FilterCraftingClasses.defaultProps = {
  options: []
}

export default FilterCraftingClasses
