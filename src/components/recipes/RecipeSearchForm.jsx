import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Form, FormControl } from 'react-bootstrap'
import { filter, forEach, includes, isEqual } from 'lodash'
import CRAFTING_CLASSES from '../../data/crafting-classes'
import { getIconUrl } from '../../service/xivApi'

export default class RecipeSearchForm extends React.Component {
  state = {
    craftingClassSelections: <ButtonGroup />
  }

  componentDidMount () {
    this.updateCraftingClassSelections()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { recipeSearchClasses } = this.props
    if (!isEqual(recipeSearchClasses, prevProps.recipeSearchClasses)) {
      this.updateCraftingClassSelections()
    }
  }

  updateCraftingClassSelections () {
    const { recipeSearchClasses, handleToggleRecipeSearchClass } = this.props

    const buttons = []

    forEach(filter(CRAFTING_CLASSES, cc => cc.type === 'crafting'), cc => {
      buttons.push((
        <Button
          className="craftingClassSelections"
          key={cc.abbreviation}
          value={cc.abbreviation}
          variant={includes(recipeSearchClasses, cc.abbreviation) ? 'primary' : 'light'}
        >
          <img
            src={getIconUrl(cc.icon)}
            alt={cc.name}
            onClick={handleToggleRecipeSearchClass.bind(this, cc.abbreviation)}
          />
        </Button>
      ))
    })

    const craftingClassSelections = (
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    )

    this.setState({
      craftingClassSelections
    })
  }

  render () {
    const {
      handleChange,
      handleReset,
      handleSubmit,
      handleToggleRecipeIncludeMaster,
      handleToggleRecipeSearchExact,
      recipeSearchExact,
      recipeSearchIncludeMaster,
      recipeSearchIsInvalid,
      recipeSearchString,
      searching
    } = this.props

    const { craftingClassSelections } = this.state

    return (
      <React.Fragment>
        <Form onReset={handleReset} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter Your Search Term(s)</Form.Label>
            <Form.Control
              as="input"
              name="recipeSearchString"
              value={recipeSearchString}
              onChange={handleChange}
              isInvalid={!!recipeSearchIsInvalid}
            />
            <FormControl.Feedback type="invalid">
              Please enter a search term.
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Choose Crafting Classes to Search
              <br />
              <small>(if none are selected, all will be searched)</small>
            </Form.Label>
            <br />
            {craftingClassSelections}
          </Form.Group>
          <div className="flex flex-row">
            <Form.Check onChange={handleToggleRecipeIncludeMaster} checked={recipeSearchIncludeMaster} />
            <Form.Label>Include Master Recipes</Form.Label>
          </div>
          {false && (
            <div className="flex flex-row">
              <Form.Check onChange={handleToggleRecipeSearchExact} checked={recipeSearchExact} />
              <Form.Label>Search Exact Phrase</Form.Label>
            </div>
          )}
          <Button type="reset" variant="danger" className="mr1" disabled={!!searching}>Clear</Button>
          <Button type="submit" variant="primary" className="ml1" disabled={!!searching}>Go!</Button>
        </Form>
      </React.Fragment>
    )
  }
}

RecipeSearchForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleToggleRecipeIncludeMaster: PropTypes.func.isRequired,
  handleToggleRecipeSearchClass: PropTypes.func.isRequired,
  handleToggleRecipeSearchExact: PropTypes.func.isRequired,
  recipeSearchClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeSearchExact: PropTypes.bool.isRequired,
  recipeSearchIncludeMaster: PropTypes.bool.isRequired,
  recipeSearchIsInvalid: PropTypes.bool.isRequired,
  recipeSearchString: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired
}
