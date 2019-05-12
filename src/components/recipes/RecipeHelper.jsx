import React from 'react'
import { Button, Col, Form, FormControl, OverlayTrigger, Popover, Row, Table } from 'react-bootstrap'
import { cloneDeep, find, get, reject } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import * as XivApi from '../../service/xivApi'
import CRAFTING_CLASSES from '../../data/crafting-classes'

export default class RecipeHelper extends React.Component {
  state = {
    recipeSearchString: 'healing',
    recipeSearchIsInvalid: false,
    searching: false,
    myList: [],
    lastSearch: undefined
  }

  handleFieldUpdate (event) {
    const { target: { name, value } } = event

    let recipeSearchIsInvalid = false
    if (!value) {
      recipeSearchIsInvalid = true
    }

    this.setState({
      [name]: value,
      recipeSearchIsInvalid
    })
  }

  async search () {
    const { recipeSearchString } = this.state
    const results = await XivApi.recipeSearch(undefined, recipeSearchString)
    console.log(results)
    this.setState({
      searching: false,
      recipeList: results,
      lastSearch: recipeSearchString
    })
  }

  handleSearch (event) {
    event.preventDefault()
    const { recipeSearchString } = this.state
    if (!recipeSearchString) {
      document.getElementsByName('recipeSearchString')[0].focus()
      this.setState({
        recipeSearchIsInvalid: true
      })
      return
    }

    this.setState({
      searching: true
    }, this.search)
  }

  handleClear () {
    document.getElementsByName('recipeSearchString')[0].focus()
    this.setState({
      recipeSearchIsInvalid: false,
      recipeSearchString: ''
    })
  }

  toggleListItem (item) {
    const { myList } = this.state
    let myClonedList = cloneDeep(myList)

    if (!!find(myList, item)) {
      myClonedList = reject(myList, item)
    } else {
      myClonedList.push(item)
    }

    this.setState({
      myList: myClonedList
    })
  }

  render () {
    const { myList, recipeList, recipeSearchIsInvalid, recipeSearchString, searching } = this.state
    const results = get(recipeList, 'Results')

    console.log(CRAFTING_CLASSES)

    const popover = ({ ref, style }) => {
      return (
        <div
          ref={ref}
          style={style}
          className="myList"
        >
          {!myList.length && (
            'No items currently in your list.'
          )}
          {myList.map((item, key) => (
            <div className="flex items-center justify-between pv1" key={key}>
              <span>
                [{get(item, 'ClassJob.Abbreviation_en')} {get(item, 'RecipeLevelTable.ClassJobLevel')}
                ] {get(item, 'Name')}
              </span>
              <span>
                <Button variant="danger" size="sm" onClick={this.toggleListItem.bind(this, item)}>
                  <FontAwesomeIcon icon={faWindowClose} />
                </Button>
              </span>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="recipe-list pt3">
        <div className="search">
          <Row>
            <Col xs={12} md={6} lg={8}>
              <Form onReset={this.handleClear.bind(this)} onSubmit={this.handleSearch.bind(this)} disabled={true}>
                <Form.Group>
                  <Form.Label>Enter Your Search Term(s)</Form.Label>
                  <Form.Control
                    as="input"
                    name="recipeSearchString"
                    value={recipeSearchString}
                    onChange={this.handleFieldUpdate.bind(this)}
                    isInvalid={!!recipeSearchIsInvalid}
                  />
                  <FormControl.Feedback type="invalid">
                    Please enter a search term.
                  </FormControl.Feedback>
                </Form.Group>
                <Button type="reset" variant="danger" className="mr1" disabled={!!searching}>Clear</Button>
                <Button type="submit" variant="primary" className="ml1" disabled={!!searching}>Go!</Button>
              </Form>
            </Col>
            <Col>
              <div className="tr">
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                  <Button style={{ position: 'fixed', right: '1em' }}>
                    My List ({myList.length})
                  </Button>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
          <hr />
          {!searching && !recipeList && (
            <div className="tc">
              No Results
            </div>
          )}
          {!!searching && (
            <div className="tc">
              Searching ...
            </div>
          )}
          {!searching && results && (
            <div>
              <Table hover striped className="recipes">
                <thead>
                <tr>
                  <th />
                  <th>Crafting Class</th>
                  <th>Recipe Name</th>
                  <th>Level Required to Craft</th>
                  <th>Add/Remove</th>
                </tr>
                </thead>
                <tbody>
                {results.map((r, key) => {
                  const iconUrl = XivApi.getIconUrl(get(r, 'Icon'))
                  const name = get(r, 'Name')
                  const classAbbr = get(r, 'ClassJob.NameEnglish', get(r, 'ClassJob.Abbreviation_en'))
                  const classLevel = get(r, 'RecipeLevelTable.ClassJobLevel')
                  return (
                    <tr key={key}>
                      <td>
                        <img src={iconUrl} alt={name} className="" />
                      </td>
                      <td>
                        {classAbbr}
                      </td>
                      <td>
                        {name}
                      </td>
                      <td>
                        {classLevel}
                      </td>
                      <td>
                        {!!find(myList, r) ? (
                          <Button variant="danger" onClick={this.toggleListItem.bind(this, r)}>
                            <FontAwesomeIcon
                              icon={faMinusCircle}
                            />
                          </Button>
                        ) : (
                          <Button variant="success" onClick={this.toggleListItem.bind(this, r)}>
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                            />
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    )
  }
}
