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
      handleTabChange,
      handleToggleListItem,
      handleToggleRecipeIncludeMaster,
      handleToggleRecipeSearchClass,
      handleToggleRecipeSearchExact,
      myList,
      recipeSearchClasses,
      recipeSearchExact,
      recipeSearchIncludeMaster,
      recipeSearchIsInvalid,
      recipeSearchResults,
      recipeSearchString
    } = this.props

    const pagination = get(recipeSearchResults, 'Pagination')
    const recipeList = get(recipeSearchResults, 'Results')

    return (
      <React.Fragment>
        <RecipeSearchForm
          handleChange={handleChange}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          handleToggleRecipeIncludeMaster={handleToggleRecipeIncludeMaster}
          handleToggleRecipeSearchClass={handleToggleRecipeSearchClass}
          handleToggleRecipeSearchExact={handleToggleRecipeSearchExact}
          recipeSearchClasses={recipeSearchClasses}
          recipeSearchExact={recipeSearchExact}
          recipeSearchIncludeMaster={recipeSearchIncludeMaster}
          recipeSearchIsInvalid={recipeSearchIsInvalid}
          recipeSearchString={recipeSearchString}
        />
        <hr />
        <RecipeSearchResult
          handlePageChange={handlePageChange}
          handleTabChange={handleTabChange}
          handleToggleListItem={handleToggleListItem}
          myList={myList}
          pagination={pagination}
          recipeList={recipeList}
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
  handleTabChange: PropTypes.func.isRequired,
  handleToggleListItem: PropTypes.func.isRequired,
  handleToggleRecipeIncludeMaster: PropTypes.func.isRequired,
  handleToggleRecipeSearchClass: PropTypes.func.isRequired,
  handleToggleRecipeSearchExact: PropTypes.func.isRequired,
  myList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipeSearchClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  recipeSearchExact: PropTypes.bool.isRequired,
  recipeSearchIncludeMaster: PropTypes.bool.isRequired,
  recipeSearchIsInvalid: PropTypes.bool.isRequired,
  recipeSearchResults: PropTypes.shape(),
  recipeSearchString: PropTypes.string.isRequired
}

RecipeSearch.defaultProps = {
  myList: [],
  recipeSearchExact: false,
  recipeSearchIncludeMaster: false,
  recipeSearchResults: {}
}
