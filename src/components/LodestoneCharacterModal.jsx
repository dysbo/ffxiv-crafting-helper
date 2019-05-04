import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal } from 'react-bootstrap'
import { get, map as _map } from 'lodash'
import XIV_SERVERS from '../data/xiv-servers'
import * as XivApi from '../service/xivApi'

class LodestoneCharacterModal extends React.Component {
  state = {}

  handleSetField (event) {
    const { target: { name, value } } = event
    this.setState({
      [name]: value
    })
  }

  handleSearch (page = 1, event) {
    !!event && event.preventDefault()
    this.setState({
      loading: true,
      page
    }, this.performSearch)
  }

  async performSearch () {
    const { name, server, page } = this.state
    const result = await XivApi.searchForCharacter(server, name, page)
    this.setState({
      lodestoneResults: result,
      loading: false
    })
  }

  handleClose () {
    const { onHide } = this.props
    this.setState({
      name: undefined,
      server: undefined,
      lodestoneResults: undefined,
      characterId: undefined
    }, onHide)
  }

  handleSubmitCharacterSelection () {
    const { getLodestoneCharacterData } = this.props
    const { characterId } = this.state

    getLodestoneCharacterData(characterId)
    this.handleClose()
  }

  render () {
    const { show } = this.props
    const { characterId, loading, lodestoneResults, name, server } = this.state

    const results = get(lodestoneResults, 'Results', [])
    const prevPage = get(lodestoneResults, 'Pagination.PagePrev')
    const nextPage = get(lodestoneResults, 'Pagination.PageNext')

    return (
      <Modal show={show} onHide={this.handleClose.bind(this)}>
        <Form
          onSubmit={this.handleSearch.bind(this, 1)}
          onReset={this.handleClose.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Import Character Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Server</Form.Label>
              <Form.Control name="server" as="select" onChange={this.handleSetField.bind(this)}>
                <option>Choose a Server</option>
                {_map(XIV_SERVERS, (server, key) => (
                  <option key={key} value={server}>{server}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" onChange={this.handleSetField.bind(this)} />
            </Form.Group>
            <Button type="submit" disabled={!name || !server}>
              Search
            </Button>
            <hr />
            {!!loading && (
              <div>
                Loading ...
              </div>
            )}
            {!loading && !results.length && (
              <div>
                No results available.
              </div>
            )}
            {!loading && !!results.length && (
              <React.Fragment>
                <div className="lodestoneResults">
                  {results.map((char, key) => {
                    const { ID, Name, Avatar } = char
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center"
                      >
                        <Form.Check
                          id={ID}
                          type="radio"
                          name="characterId"
                          value={ID}
                          onChange={this.handleSetField.bind(this)}
                        />
                        <label htmlFor={ID}>{Name}</label>
                        <label htmlFor={ID}>
                          <img className="avatar" src={Avatar} alt={Name} />
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between items-center pt2">
                  <div className="w-50 tl">
                    {!!prevPage && (
                      <Button type="button" onClick={this.handleSearch.bind(this, prevPage)}>
                        Prev Page
                      </Button>
                    )}
                  </div>
                  <div className="w-50 tr">
                    {nextPage && (
                      <Button type="button" onClick={this.handleSearch.bind(this, nextPage)}>
                        Next Page
                      </Button>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={!characterId}
              onClick={this.handleSubmitCharacterSelection.bind(this)}
            >
              Load Data
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

LodestoneCharacterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

LodestoneCharacterModal.defaultProps = {
  show: false
}

export default LodestoneCharacterModal
