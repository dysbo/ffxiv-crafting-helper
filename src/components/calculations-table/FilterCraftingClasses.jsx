import React from 'react'
import PropTypes from 'prop-types'
import { orderBy as _orderBy } from 'lodash'

class FilterCraftingClasses extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: _orderBy(props.options, ['name'], ['asc'])
    }
  }

  render () {
    const { handleFilterUpdate } = this.props
    const { options } = this.state
    return (
      <div>
        <select className="fullWidth" onChange={handleFilterUpdate}>
          <option value="">Show All</option>
          {options.map((o, key) => (
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
