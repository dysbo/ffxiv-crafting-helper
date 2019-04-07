import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import CharacterSelectorModal from './CharacterSelectorModal'

class CharacterSelectorButton extends React.Component {
  state = {
    showModal: false
  }

  handleHide () {
    this.setState({
      showModal: false
    })
  }

  handleShow () {
    this.setState({
      showModal: true
    })
  }

  render () {
    const { showModal } = this.state
    const { onClear, onSelect } = this.props
    return (
      <React.Fragment>
        <Button onClick={this.handleShow.bind(this)}>
          Load My Character Data
        </Button>
        <CharacterSelectorModal
          show={showModal}
          onHide={this.handleHide.bind(this)}
          onSelect={onSelect}
          onClear={onClear}
        />
      </React.Fragment>
    )
  }
}

CharacterSelectorButton.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
}

export default CharacterSelectorButton
