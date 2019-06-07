import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Badge, FormControl, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { clone, filter, includes, isEqual, get, orderBy, pull } from 'lodash'
import { getIconUrl } from '../../service/xivApi'
import { clearObtainedItems, getObtainedItems, storeObtainedItems } from '../../service/localStorage'
import SortableTableHeaderCell from '../common/SortableTableHeaderCell'

/**
 * Scrolls to a position on the screen.
 *
 * @param {number} x The X coordinate for scrolling.
 * @param {number} y The Y coodrinate for scrolling.
 */
function scrollToPosition(x, y) {
  window.scrollTo(x, y)
}

/**
 * The number of columns in a row.  This allows the subheadings to take up the full width of the table.
 * @type {number}
 */
const headingColumns = 7

export default class ShoppingList extends React.Component {
  state = {
    ingredientsGatherableSort: {
      func: 'name',
      direction: 'asc'
    },
    itemsOwned: getObtainedItems()
  }

  componentDidMount () {
    this.updateGatherableIngredients()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { shoppingList } = this.props

    if (!isEqual(shoppingList, prevProps.shoppingList)) {
      this.updateGatherableIngredients()
    }
  }

  updateGatherableIngredients () {
    const { shoppingList } = this.props
    const {
      // ingredientsCrafted,
      // ingredientsPurchased,
      ingredientsGatherable
      // ingredientsOther
    } = shoppingList

    const gatherableStateVars = {}
    if (ingredientsGatherable) {
      ingredientsGatherable.forEach(item => {
        const key = `gatherable-${item.itemId}-location`
        gatherableStateVars[key] = get(item, 'pointData[0]', {})
      })
    }

    clearObtainedItems()

    this.setState({
      ...gatherableStateVars,
      ingredientsGatherable: filter(ingredientsGatherable, ig => get(ig, 'itemCategory') !== 58),
      ingredientsCrystals: filter(ingredientsGatherable, ig => get(ig, 'itemCategory') === 58)
    })
  }

  handleLocationUpdate (event) {
    event.preventDefault()

    const { target: { value, id } } = event

    this.setState({
      [id]: JSON.parse(value)
    })
  }

  handleApplyIngredientsGatherableSort (sortFunc) {
    const { ingredientsGatherableSort } = this.state

    const sortDirection =
      // isEqual(JSON.stringify(sortFunc), JSON.stringify(ingredientsGatherableSort.func)) && ingredientsGatherableSort.direction === 'asc'
      isEqual(
        JSON.stringify(sortFunc),
        JSON.stringify(ingredientsGatherableSort.func)
      ) && ingredientsGatherableSort.direction === 'asc'
        ? 'desc'
        : 'asc'

    const newIngredientsGatherableSort = {
      func: sortFunc,
      direction: sortDirection
    }

    this.setState({
      ingredientsGatherableSort: newIngredientsGatherableSort
    })
  }

  handleToggleItemOwned (itemId) {
    const { scrollX, scrollY } = window
    const itemsOwned = clone(get(this.state, 'itemsOwned', []))

    if (includes(itemsOwned, itemId)) {
      pull(itemsOwned, itemId)
    } else {
      itemsOwned.push(itemId)
    }

    storeObtainedItems(itemsOwned)

    this.setState({
      itemsOwned
    }, scrollToPosition.bind(this, scrollX, scrollY))
  }

  handleOwnershipSort (item) {
    const itemId = get(item, 'itemId', get(item, 'ItemResult.ID'))
    return includes(get(this.state, 'itemsOwned', []), itemId)
    // return !!itemId
  }

  render () {
    const { shoppingList: { ingredientsCrafted, ingredientsPurchased, ingredientsOther } } = this.props
    const { ingredientsCrystals, ingredientsGatherable, ingredientsGatherableSort } = this.state

    if (!get(ingredientsGatherable, 'length') && !ingredientsCrafted && !ingredientsPurchased) {
      return (
        <div className="tc">
          No Results to Display
        </div>
      )
    }

    return (
      <div>
        <div className="flex flex-row justify-center items-center">
          {!!ingredientsCrystals && (
            ingredientsCrystals.map(ic => {
              const { amount, name, icon } = ic
              return (
                <span key={name} className="ph1">
                  <OverlayTrigger
                    key={`overlayTrigger-${name}`}
                    overlay={
                      <Tooltip id={`tooltip-${name}`}>
                        {name}
                      </Tooltip>
                    }
                  >
                    <img src={icon} alt={name} />
                  </OverlayTrigger><br />
                    <Badge
                      variant="primary"
                      style={{ position: 'relative', top: '-15px', right: '-25px' }}
                    >
                      {amount}
                    </Badge>
                </span>
              )
            })
          )}
        </div>
        <Table hover striped className="shopping-list">
          {!!ingredientsGatherable && !!ingredientsGatherable.length && (
            <React.Fragment>
              <thead>
              <tr className="section-head">
                <th colSpan={headingColumns}>Gatherable Items</th>
              </tr>
              <tr>
                <th />
                <SortableTableHeaderCell
                  text="Name"
                  sortFunc="name"
                  applySorting={this.handleApplyIngredientsGatherableSort.bind(this)}
                />
                <th>Required Class</th>
                <th>Required Level</th>
                <th>Quantity</th>
                <SortableTableHeaderCell
                  text="Location"
                  sortFunc={ig => {
                    const point = get(this.state, `gatherable-${ig.itemId}-location`)
                    return `${point.region} - ${point.area} - ${point.name}`
                  }}
                  applySorting={this.handleApplyIngredientsGatherableSort.bind(this)}
                />
                <th>Obtained</th>
              </tr>
              </thead>
              <tbody>
              {orderBy(
                ingredientsGatherable,
                [this.handleOwnershipSort.bind(this), ingredientsGatherableSort.func],
                ['asc', ingredientsGatherableSort.direction]
              ).map(item => {
                  const { name, icon, itemId, amount, pointData } = item
                  const key = `gatherable-${itemId}`
                  const locationSelectId = `${key}-location`
                  const gatheringClass = get(this.state, `${locationSelectId}.gatheringClass`)
                  const gatheringType = get(this.state, `${locationSelectId}.type`)
                  const level = get(this.state, `${locationSelectId}.level`)
                  const owned = includes(get(this.state, 'itemsOwned', []), itemId)

                  return (
                    <tr key={key} className={cx(owned ? 'owned' : '')}>
                      <td><img src={icon} alt={name} /></td>
                      <td>{name}</td>
                      <td>{gatheringClass}{!!gatheringType && ` (${gatheringType})`}</td>
                      <td>{level}</td>
                      <td>{amount}</td>
                      <td>
                        {pointData.length === 1 && (
                          <React.Fragment>
                            {pointData[0].region} - {pointData[0].area} {pointData[0].name ? `- ${pointData[0].name}` : '(Unspoiled)'}
                          </React.Fragment>
                        )}
                        {pointData.length > 1 && (
                          <FormControl
                            id={locationSelectId}
                            as="select"
                            onChange={this.handleLocationUpdate.bind(this)}
                          >
                            {pointData.map((point, key) => (
                              <option key={key} value={JSON.stringify(point)}>
                                {point.region} - {point.area} {point.name ? `- ${point.name}` : '(Unspoiled)'} (Level {point.level}, {point.gatheringClass})
                              </option>
                            ))}
                          </FormControl>
                        )}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          value={itemId}
                          checked={owned}
                          onChange={this.handleToggleItemOwned.bind(this, itemId)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </React.Fragment>
          )}
          {!!ingredientsOther && !!ingredientsOther.length && (
            <React.Fragment>
              <thead>
              <tr className="section-head">
                <th colSpan={headingColumns}>Items Obtained Elsewhere</th>
              </tr>
              <tr>
                <th />
                <th>Name</th>
                <th />
                <th />
                <th>Quantity</th>
                <th>Location</th>
                <th>Obtained</th>
              </tr>
              </thead>
              <tbody>
              {orderBy(
                ingredientsOther,
                this.handleOwnershipSort.bind(this),
                'asc'
              ).map(item => {
                const { name, icon, itemId, amount } = item
                const owned = includes(get(this.state, 'itemsOwned', []), itemId)
                return (
                  <tr key={`purchasable-${itemId}`} className={cx(owned ? 'owned' : '')}>
                    <td><img src={icon} alt={name} /></td>
                    <td>{name}</td>
                    <td />
                    <td />
                    <td>{amount}</td>
                    <td>???</td>
                    <td>
                      <input
                        type="checkbox"
                        value={itemId}
                        checked={owned}
                        onChange={this.handleToggleItemOwned.bind(this, itemId)}
                      />
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </React.Fragment>
          )}
          {!!ingredientsPurchased && !!ingredientsPurchased.length && (
            <React.Fragment>
              <thead>
              <tr className="section-head">
                <th colSpan={headingColumns}>Purchasable Items</th>
              </tr>
              <tr>
                <th />
                <th>Name</th>
                <th>Currency</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Obtained</th>
              </tr>
              </thead>
              <tbody>
              {orderBy(
                ingredientsPurchased,
                this.handleOwnershipSort.bind(this),
                'asc'
              ).map(item => {
                const { name, icon, itemId, amount } = item
                const owned = includes(get(this.state, 'itemsOwned', []), itemId)
                return (
                  <tr key={`purchasable-${itemId}`} className={cx(owned ? 'owned' : '')}>
                    <td><img src={icon} alt={name} /></td>
                    <td>{name}</td>
                    <td>???</td>
                    <td>???</td>
                    <td>{amount}</td>
                    <td>???</td>
                    <td>
                      <input
                        type="checkbox"
                        value={itemId}
                        checked={owned}
                        onChange={this.handleToggleItemOwned.bind(this, itemId)}
                      />
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </React.Fragment>
          )}
          {!!ingredientsCrafted && !!ingredientsCrafted.length && (
            <React.Fragment>
              <thead>
              <tr className="section-head">
                <th colSpan={headingColumns}>Prerequisite Crafts</th>
              </tr>
              <tr>
                <th />
                <th>Name</th>
                <th>Required Class</th>
                <th>Required Level</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Obtained</th>
              </tr>
              </thead>
              <tbody>
              {orderBy(
                ingredientsCrafted,
                [this.handleOwnershipSort.bind(this), 'ItemResult.Name_en'],
                ['asc', 'asc']
              ).map(item => {
                const name = get(item, 'ItemResult.Name_en')
                const icon = get(item, 'ItemResult.Icon')
                const id = get(item, 'ID')
                const quantity = get(item, 'quantity')
                const craftClass = get(item, 'ClassJob.NameEnglish')
                const craftLevel = get(item, 'RecipeLevelTable.ClassJobLevel')
                const itemId = get(item, 'ItemResult.ID')
                const owned = includes(get(this.state, 'itemsOwned', []), itemId)
                return (
                  <tr key={`crafted-${id}`} className={cx(owned ? 'owned' : '')}>
                    <td><img src={getIconUrl(icon)} alt={name} /></td>
                    <td>{name}</td>
                    <td>{craftClass}</td>
                    <td>{craftLevel}</td>
                    <td>{quantity}</td>
                    <td>N/A</td>
                    <td>
                      <input
                        type="checkbox"
                        value={itemId}
                        checked={owned}
                        onChange={this.handleToggleItemOwned.bind(this, itemId)}
                      />
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </React.Fragment>
          )}
        </Table>
      </div>
    )
  }
}

ShoppingList.propTypes = {
  shoppingList: PropTypes.shape().isRequired
}

ShoppingList.defaultProps = {
  shoppingList: {}
}
