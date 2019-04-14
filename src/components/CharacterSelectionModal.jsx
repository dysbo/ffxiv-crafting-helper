import React from 'react'
import PropTypes from 'prop-types'
import { get, map } from 'lodash'
import { Button, Col, Modal, Form, Row, Spinner } from 'react-bootstrap'
import XIV_SERVERS from '../data/xiv-servers'
import * as xivApi from '../util/xivApi'
import CharacterIcon from './CharacterIcon'

class CharacterSelectionModal extends React.Component {
  state = {}

  handleServerSelection (event) {
    const server = get(event, 'target.value', event)
    this.setState({
      server,
      characterResults: undefined
    })
  }

  handleNameInput (event) {
    const name = get(event, 'target.value', event)
    this.setState({
      name,
      characterResults: undefined
    })
  }

  handleSearch () {
    const { server, name } = this.state
    if (!server || !name) {
      alert('Must select a server and provide a name to search!')
      return
    }

    this.setState({
      loading: true,
      characterResults: undefined
    }, this.search)
  }

  async search () {
    const { server, name } = this.state

    const characterResults = await xivApi.searchForCharacter(server, name)
    this.setState({
      characterResults,
      loading: false
    })
  }

  handleClear () {
    const { onHide } = this.props
    this.setState({
      server: undefined,
      name: undefined,
      characterResults: undefined,
      loading: false
    })
    onHide()
  }

  handleCharacterSelect (event) {
    const characterId = get(event, 'target.value', event)
    this.setState({
      characterId
    })
  }

  async handleSubmit () {
    const { onSubmit } = this.props
    const { characterId } = this.state
    this.setState({
      loading: true
    }, async () => {
      const character = await xivApi.getCharacter(characterId)
      onSubmit(character)
      this.handleClear()
    })
  }

  render () {
    const { show } = this.props
    const { characterId, characterResults, loading } = this.state
    return (
      <Modal
        show={show}
        onHide={this.handleClear.bind(this)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Load Character Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="characterServer">
              <Form.Label column sm={2}>
                Server
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="select" onChange={this.handleServerSelection.bind(this)}>
                  <option>Select a Server</option>
                  {map(XIV_SERVERS, server => (
                    <option key={server} value={server}>{server}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="characterName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={7}>
                <Form.Control type="text" onBlur={this.handleNameInput.bind(this)} />
              </Col>
              <Col sm={3} className="text-right">
                <Button onClick={this.handleSearch.bind(this)} disabled={!!loading}>
                  Search
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <hr />
          {!characterResults && !loading && (
            <div className="text-center">
              No results to display.
            </div>
          )}
          {!!loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}
          {!loading && !!characterResults && !!characterResults.Results && (
            <div className="results">
              <table className="fullWidth">
                <tbody>
                  {map(characterResults.Results, (result, key) => (
                    <tr key={key}>
                      <td>
                        <input
                          id={`character-${result.ID}`}
                          type="radio"
                          name="characterSelection"
                          value={result.ID}
                          onChange={this.handleCharacterSelect.bind(this)}
                        />
                      </td>
                      <td>
                        <label htmlFor={`character-${result.ID}`} className="fullWidth">
                          {result.Name}
                        </label>
                      </td>
                      <td>
                        <label htmlFor={`character-${result.ID}`}>
                          <CharacterIcon altText={result.Name} imageUrl={result.Avatar} />
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={this.handleClear.bind(this)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!characterId}
            onClick={this.handleSubmit.bind(this)}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

CharacterSelectionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default CharacterSelectionModal
