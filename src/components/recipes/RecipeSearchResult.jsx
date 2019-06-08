import React from 'react'
import PropTypes from 'prop-types'
import { find, get } from 'lodash'
import { Button, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { getIconUrl } from '../../service/xivApi'
import Pagination from '../common/Pagination'

export default class RecipeSearchResult extends React.Component {
  render () {
    const {
      clearRecipeSearch,
      handlePageChange,
      handleTabChange,
      handleToggleListItem,
      myList,
      pagination,
      recipeList
    } = this.props

    if (!recipeList.length) {
      return (
        <div className="tc">
          No Results to Display
        </div>
      )
    }

    const pageTotal = get(pagination, 'PageTotal')
    const pageCurrent = get(pagination, 'Page')

    return (
      <Table className="recipes" hover striped>
        <thead>
        <tr>
          <td colSpan={5} className="tc">
            <Pagination currentPage={pageCurrent} totalPages={pageTotal} handlePageChange={handlePageChange} />
          </td>
        </tr>
        <tr>
          <th />
          <th>Crafting Class</th>
          <th>Item Name</th>
          <th>Required Level to Craft</th>
          <th>Add/Remove</th>
        </tr>
        </thead>
        <tbody>
        {recipeList.map((r, key) => {
          const iconUrl = getIconUrl(get(r, 'Icon', ''))
          const name = get(r, 'Name')
          const craftingClassName = get(r, 'ClassJob.NameEnglish')
          const level = get(r, 'RecipeLevelTable.ClassJobLevel')
          const isOnList = !!find(myList, item => get(item, 'ID') === get(r, 'ID'))

          return (
            <tr key={key}>
              <td><img src={iconUrl} alt={name} /></td>
              <td>{craftingClassName}</td>
              <td>{name}</td>
              <td>{level}</td>
              <td>
                <Button onClick={handleToggleListItem.bind(this, r)} variant={isOnList ? 'danger' : 'success'}>
                  <FontAwesomeIcon
                    icon={isOnList ? faMinusSquare : faPlusSquare}
                  />
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={5} className="tc">
            <Pagination currentPage={pageCurrent} totalPages={pageTotal} handlePageChange={handlePageChange} />
          </td>
        </tr>
        <tr>
          <td colSpan={5}>
            <div className="w-100 dib tc">
              <Button className="mh1" onClick={clearRecipeSearch.bind(this)} variant="danger">
                Clear Recipe Search
              </Button>
              <Button className="mh1" onClick={handleTabChange.bind(this, 'recipe-list')}>
                Go to Recipe List
              </Button>
            </div>
          </td>
        </tr>
        </tfoot>
      </Table>
    )
  }
}

RecipeSearchResult.propTypes = {
  clearRecipeSearch: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleToggleListItem: PropTypes.func.isRequired,
  myList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pagination: PropTypes.shape().isRequired,
  recipeList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  ready: PropTypes.bool.isRequired
}

RecipeSearchResult.defaultProps = {
  myList: [],
  pagination: {},
  recipeList: [],
  ready: true
}