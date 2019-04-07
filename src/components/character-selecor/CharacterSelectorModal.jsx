import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'
import { get as _get } from 'lodash'
import xivServers from '../../data/xiv-servers'
import * as xivApi from '../../util/xivApi'

const LABEL_CLASSES = 'font-weight-bold text-right'

class CharacterSelectorModal extends React.Component {
  state = {
    server: xivServers[0] || '',
    pagination: {},
    results: [],
    thinking: false
  }

  handleCharacterInput (event) {
    this.setState({
      characterName: event.target.value
    })
  }

  handleServerSelection (event) {
    this.setState({
      server: event.target.value
    })
  }

  async handleCharacterSearch () {
    this.setState({
      thinking: true
    }, async () => {
      const { characterName, server } = this.state
      const data = await xivApi.searchForCharacter(server, characterName)
      console.log(data)
      this.setState({
        thinking: false,
        results: _get(data, 'Results', []),
        pagination: _get(data, 'Pagination', {})
      })
    })
  }

  handleCharacterSelection (event) {
    console.log('I selected this', event.target.value)
    this.setState({
      characterId: event.target.value
    })
  }

  handleSubmit () {
    const { onHide, onSelect } = this.props
    const { characterId } = this.state

    onSelect(characterId)
    onHide()
  }

  render () {
    const { onHide, show } = this.props
    const { results, thinking } = this.state

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            Load My Character Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
            <tr>
              <td className={LABEL_CLASSES}>
                Server
              </td>
              <td className="fullWidth">
                <select onChange={this.handleServerSelection.bind(this)}>
                  {xivServers.map(server => (
                    <option key={server} value={server}>{server}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className={LABEL_CLASSES}>
                Character Name
              </td>
              <td className="fullWidth">
                <input onBlur={this.handleCharacterInput.bind(this)} />
              </td>
              <td>
                <Button onClick={this.handleCharacterSearch.bind(this)}>
                  Search
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <hr />
              </td>
            </tr>
            {thinking ? (
              <tr>
                <td colSpan={3}>
                  Thinking ...
                </td>
              </tr>
            ) : !!results.length ? results.map(r => (
              <tr key={r.ID}>
                <td>
                  <input
                    id={`lodestone-${r.ID}`}
                    type="radio" value={r.ID}
                    name="character"
                    onChange={this.handleCharacterSelection.bind(this)}
                  />
                </td>
                <td>
                  <label
                    htmlFor={`lodestone-${r.ID}`}
                  >
                    {r.Name}
                  </label>
                </td>
                <td>
                  <label htmlFor={`lodestone-${r.ID}`}>
                    <img
                      height={48}
                      width={48}
                      src={r.Avatar}
                      alt={r.Name}
                    />
                  </label>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3}>
                  No Results to Display
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

CharacterSelectorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

CharacterSelectorModal.defaultProps = {
  show: true
}

export default CharacterSelectorModal
