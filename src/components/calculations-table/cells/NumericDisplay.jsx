import React from 'react'
import PropTypes from 'prop-types'

class NumericDisplay extends React.Component {
  render () {
    const { value } = this.props
    return (
      <span>
        {value.toLocaleString()}
      </span>
    )
  }
}

NumericDisplay.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

NumericDisplay.defaultProps = {
  value: 0
}

export default NumericDisplay
