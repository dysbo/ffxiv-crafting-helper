import React from 'react'
import PropTypes from 'prop-types'

export default class RecipeHelper extends React.Component {
  render () {
    const { match: { params: { craftingClass } } } = this.props
    return (
      <div>
        Hi......... {craftingClass}
      </div>
    )
  }
}

RecipeHelper.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      craftingClass: PropTypes.string
    })
  })
}

RecipeHelper.defaultProps = {
  match: {
    params: {
      craftingClass: 'all'
    }
  }
}
