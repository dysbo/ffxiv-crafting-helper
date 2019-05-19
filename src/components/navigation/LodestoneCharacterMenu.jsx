import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { NavDropdown } from 'react-bootstrap'
import { clearLocalCharacterData, clearLocalClassData, getLodestoneCharacterData } from '../../store/local/actions'
import LodestoneCharacterModal from './LodestoneCharacterModal'

const getDropdownTitle = characterData => {
  if (get(characterData, 'Character.Avatar')) {
    const { Character: { Avatar, Name } } = characterData
    return (
      <span className="items-center">
        {Name}
        <span className="ml2"><img src={Avatar} alt={Name} className="avatar" /></span>
      </span>
    )
  }

  return 'Options'
}

class LodestoneCharacterMenu extends React.Component {
  state = {
    showModal: false
  }

  handleModalToggle (showModal) {
    this.setState({
      showModal: showModal
    })
  }

  render () {
    const {
      characterData,
      clearLocalCharacterData,
      clearLocalClassData,
      getLodestoneCharacterData,
      lodestoneResults,
      searchLodestoneCharacterData
    } = this.props

    const importText = `Import ${!characterData ? '' : 'Different'} Character Data`.replace('  ', ' ')

    return (
      <React.Fragment>
        <NavDropdown
          alignRight
          title={getDropdownTitle(characterData)}
        >
          {!!characterData && (
            <React.Fragment>
              <NavDropdown.Item onClick={getLodestoneCharacterData.bind(this, characterData.characterId)}>
                Refresh Character Data
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </React.Fragment>
          )}
          <NavDropdown.Item onClick={this.handleModalToggle.bind(this, true)}>
            {importText}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={clearLocalClassData}>
            Clear Crafting Class Data
          </NavDropdown.Item>
          {!!characterData && (
            <NavDropdown.Item onClick={clearLocalCharacterData}>
              Clear Character Data
            </NavDropdown.Item>
          )}
        </NavDropdown>
        <LodestoneCharacterModal
          lodestoneResults={lodestoneResults}
          onHide={this.handleModalToggle.bind(this, false)}
          searchLodestoneCharacterData={searchLodestoneCharacterData}
          show={this.state.showModal}
          getLodestoneCharacterData={getLodestoneCharacterData}
        />
      </React.Fragment>
    )
  }
}

LodestoneCharacterMenu.propTypes = {
  characterData: PropTypes.shape()
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  getLodestoneCharacterData: characterId => dispatch(getLodestoneCharacterData(characterId)),
  clearLocalCharacterData: () => dispatch(clearLocalCharacterData()),
  clearLocalClassData: () => dispatch(clearLocalClassData())
})

export default connect(mapStateToProps, mapDispatchToProps)(LodestoneCharacterMenu)
