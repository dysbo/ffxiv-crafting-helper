import React from 'react'
import PropTypes from 'prop-types'

class CharacterIcon extends React.Component {
  render () {
    const { altText, imageUrl } = this.props
    return (
      <img className="character-icon" src={imageUrl} alt={altText} />
    )
  }
}

CharacterIcon.propTypes = {
  altText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}

export default CharacterIcon
