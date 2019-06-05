import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'

export default class LoadingOverlay extends React.Component {
  render () {
    const { show } = this.props

    if (!show) {
      return null
    }

    return (
      <div className="loading-overlay">
        <div>
          <Spinner animation="border" variant="light" />
        </div>
      </div>
    )
  }
}

LoadingOverlay.propTypes = {
  show: PropTypes.bool.isRequired
}

LoadingOverlay.defaultProps = {
  show: false
}
