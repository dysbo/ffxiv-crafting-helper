import React from 'react'
import PropTypes from 'prop-types'

const baseUrl = 'https://xivapi.com'

const Icon = props => {
  const { url, name } = props

  const imageUrl = url.indexOf(baseUrl) > -1 ? url : baseUrl + url

  return (
    <div className="pa1">
      <img src={imageUrl} alt={name} height={32} width={32} />
    </div>
  )
}

Icon.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Icon
