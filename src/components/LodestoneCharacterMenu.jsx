import React from 'react'
import PropTypes from 'prop-types'
import { get, isEqual } from 'lodash'
import { Modal, NavDropdown } from 'react-bootstrap'

const getDropdownTitle = characterData => {
  if (get(characterData, 'Avatar')) {
    return (
      <span>
        TBD
      </span>
    )
  }

  return 'Options'
}

const getDropdownOptions = characterData => {
  if (isEqual(characterData, {})) {
    return (
      <React.Fragment>
        <NavDropdown.Item>
          Option
        </NavDropdown.Item>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <NavDropdown.Item>
        Import Character Data
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        Clear Crafting Class Data
      </NavDropdown.Item>
    </React.Fragment>
  )
}

export default class LodestoneCharacterMenu extends React.Component {
  state = {
    showModal: false
  }

  render () {
    const { characterData } = this.props
    return (
      <React.Fragment>
        <NavDropdown
          alignRight
          title={getDropdownTitle(characterData)}
        >
          {getDropdownOptions(characterData)}
        </NavDropdown>
        <Modal show={this.state.showModal} onHide={() => {}}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>
                LoDeStOnE
              </Modal.Title>
            </Modal.Header>
          </Modal.Dialog>
        </Modal>
      </React.Fragment>
    )
  }
}

LodestoneCharacterMenu.propTypes = {
  characterData: PropTypes.shape()
}
