import React from 'react'
import PropTypes from 'prop-types'

export default class CraftingGatheringCalculator extends React.Component {
  render () {
    return (
      <div>
        Under Construction
      </div>
    )
  }
}

CraftingGatheringCalculator.propTypes = {
  craftingClassData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  characterData: PropTypes.shape()
}
