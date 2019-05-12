import React from 'react'
import PropTypes from 'prop-types'
import { find, get } from 'lodash'
import { Button, Spinner, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { getIconUrl } from '../../service/xivApi'

export default class RecipeSearchResult extends React.Component {
  render () {
    const { handlePageChange, handleToggleListItem, myList, pagination, ready, recipeList } = this.props

    if (!ready) {
      return (
        <div className="tc">
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="primary" />
        </div>
      )
    }

    if (!recipeList.length) {
      return (
        <div className="tc">
          No Results to Display
        </div>
      )
    }

    const pagePrev = get(pagination, 'PagePrev')
    const pageNext = get(pagination, 'PageNext')

    return (
      <Table className="recipes" hover striped>
        <thead>
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
        {(!!pagePrev || !!pageNext) && (
          <tfoot>
          <tr>
            <td colSpan={5}>
              <div className="w-50 dib tl">
                {!!pagePrev && (
                  <Button value={pagePrev} onClick={handlePageChange}>
                    Previous
                  </Button>
                )}
              </div>
              <div className="w-50 dib tr">
                {!!pageNext && (
                  <Button value={pageNext} onClick={handlePageChange}>
                    Next
                  </Button>
                )}
              </div>
            </td>
          </tr>
          </tfoot>
        )}
      </Table>
    )
  }
}

RecipeSearchResult.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
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