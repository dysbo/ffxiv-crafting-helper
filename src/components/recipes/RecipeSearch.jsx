import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import RecipeSearchForm from './RecipeSearchForm'
import RecipeSearchResult from './RecipeSearchResult'

export default class RecipeSearch extends React.Component {
  render () {
    const {
      handleChange,
      handlePageChange,
      handleReset,
      handleSubmit,
      handleToggleListItem,
      myList,
      recipeSearchIsInvalid,
      recipeSearchResults,
      recipeSearchString,
      searching
    } = this.props

    const pagination = get(recipeSearchResults, 'Pagination')
    const recipeList = get(recipeSearchResults, 'Results')

    return (
      <React.Fragment>
        <RecipeSearchForm
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          recipeSearchIsInvalid={recipeSearchIsInvalid}
          recipeSearchString={recipeSearchString}
          searching={searching}
        />
        <hr />
        <RecipeSearchResult
          handlePageChange={handlePageChange}
          handleToggleListItem={handleToggleListItem}
          myList={myList}
          pagination={pagination}
          recipeList={recipeList}
          ready={!searching}
        />
      </React.Fragment>
    )
  }
}

RecipeSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleToggleListItem: PropTypes.func.isRequired,
  myList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipeSearchIsInvalid: PropTypes.bool.isRequired,
  recipeSearchResults: PropTypes.shape(),
  recipeSearchString: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired
}

RecipeSearch.defaultProps = {
  myList: [],
  recipeSearchResults: {}
}
