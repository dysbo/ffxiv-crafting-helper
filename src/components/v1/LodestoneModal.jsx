import React from 'react'
import PropTypes from 'prop-types'
import { cloneDeep as _cloneDeep, get as _get, map as _map } from 'lodash'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import * as XivApi from '../../service/xivApi'
import XIV_SERVERS from '../../data/xiv-servers'

const INITIAL_STATE = {
  characterId: undefined,
  loading: false,
  name: undefined,
  searchResult: undefined,
  server: undefined
}

class LodestoneModal extends React.Component {
  state = _cloneDeep(INITIAL_STATE)

  handleHide () {
    const { onHide } = this.props
    onHide()
    this.setState({
      ...INITIAL_STATE
    })
  }

  handleSearch (event) {
    if (event) {
      event.preventDefault()
    }

    const { name, server } = this.state
    if (!name || !server) {
      alert('Name and Server are required to find your character data.  Please fill out both fields and try again.')
      return
    }

    this.setState({
      loading: true,
      characterId: undefined
    }, this.findCharacters)
  }

  handleSelect (characterId) {
    this.setState({
      characterId
    })
  }

  handleChangePage (page) {
    this.setState({
      loading: true
    }, this.findCharacters.bind(this, page))
  }

  handleServerSelect (event) {
    const server = _get(event, 'target.value', event)
    this.setState({
      server
    })
  }

  handleNameEntry (event) {
    const name = _get(event, 'target.value', event)
    this.setState({
      name
    })
  }

  async findCharacters (page = 1) {
    const { name, server } = this.state
    const searchResult = await XivApi.searchForCharacter(server, name, page)
    this.setState({
      searchResult,
      loading: false
    })
  }

  async handleSubmit () {
    const { onSelect } = this.props
    const { characterId } = this.state
    const characterData = await XivApi.getCharacter(characterId)
    onSelect(characterData)
    this.handleHide()
  }

  render () {
    const { show } = this.props
    const { characterId, loading, name, searchResult, server } = this.state
    return (
      <Modal show={show} onHide={this.handleHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Import Character Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Server</Form.Label>
              <Form.Control as="select" onChange={this.handleServerSelect.bind(this)}>
                <option>Choose a Server</option>
                {_map(XIV_SERVERS, (server, key) => (
                  <option key={key} value={server}>{server}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={this.handleNameEntry.bind(this)} />
            </Form.Group>
            <Button type="submit" onClick={this.handleSearch.bind(this)} disabled={!name || !server}>
              Search
            </Button>
          </Form>
          <hr />
          {!!loading && (
            <div className="fullWidth text-center">
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="success" />
            </div>
          )}
          {!loading && !searchResult && (
            <div className="fullWidth text-center">
              No results to display.
            </div>
          )}
          {!loading && !!searchResult && (
            <div>
              <div className="results">
                <table className="fullWidth">
                  <tbody>
                  {_map(_get(searchResult, 'Results', []), (result, key) => (
                    <tr key={key}>
                      <td className="text-left">
                        <Form.Check
                          type="radio"
                          label={result.Name}
                          name="characterData"
                          value={result.ID}
                          onChange={this.handleSelect.bind(this, result.ID)}
                        />
                      </td>
                      <td className="text-right">
                        <img src={result.Avatar} alt={result.Name} width={36} height={36}
                             style={{ marginRight: '1em' }} />
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col text-left">
                  {!!searchResult.Pagination && !!searchResult.Pagination.PagePrev && (
                    <Button variant="dark" onClick={this.handleChangePage.bind(this, searchResult.Pagination.PagePrev)}>
                      Prev Page
                    </Button>
                  )}
                </div>
                <div className="col text-right">
                  {!!searchResult.Pagination && !!searchResult.Pagination.PageNext && (
                    <Button variant="dark" onClick={this.handleChangePage.bind(this, searchResult.Pagination.PageNext)}>
                      Next Page
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={this.handleHide.bind(this)}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={this.handleSubmit.bind(this)}
            disabled={!characterId}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

LodestoneModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default LodestoneModal
