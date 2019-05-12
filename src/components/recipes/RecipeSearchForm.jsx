import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormControl } from 'react-bootstrap'

export default class RecipeSearchForm extends React.Component {
  render () {
    const { handleChange, handleReset, handleSubmit, recipeSearchIsInvalid, recipeSearchString, searching } = this.props
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
  recipeSearchIsInvalid: PropTypes.bool.isRequired,
  recipeSearchString: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired
}
