import React from 'react'
import PropTypes from 'prop-types'
import { Table, FormControl } from 'react-bootstrap'
import { isEqual, get } from 'lodash'
import { getIconUrl } from '../../service/xivApi'

export default class ShoppingList extends React.Component {
  state = {}

  componentDidMount() {
    this.updateGatherableIngredientsDropdowns()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { shoppingList } = this.props

    if (!isEqual(shoppingList, prevProps.shoppingList)) {
      this.updateGatherableIngredientsDropdowns()
    }
  }

  updateGatherableIngredientsDropdowns () {
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

    this.setState({
      ...gatherableStateVars
    })
  }

  handleLocationUpdate (event) {
    event.preventDefault()

    const { target: { value, id } } = event

    this.setState({
      [id]: JSON.parse(value)
    })
  }

  render () {
    const { shoppingList: { ingredientsCrafted, ingredientsPurchased, ingredientsGatherable, ingredientsOther } } = this.props

    if (!ingredientsGatherable && !ingredientsCrafted && !ingredientsPurchased) {
      return (
        <div className="tc">
          No Results to Display
        </div>
      )
    }

    const headings = (
      <tr>
        <th />
        <th>Name</th>
        <th>Required Class</th>
        <th>Required Level</th>
        <th>Quantity</th>
        <th>Location</th>
      </tr>
    )

    const headingColumns = 6

    return (
      <div>
        <Table hover striped className="shopping-list">
          {!!ingredientsGatherable && !!ingredientsGatherable.length && (
            <React.Fragment>
              <thead>
              <tr className="section-head">
                <th colSpan={headingColumns}>Gatherable Items</th>
              </tr>
              {headings}
              </thead>
              <tbody>
              {ingredientsGatherable.map(item => {
                const { name, icon, itemId, amount, pointData } = item
                const key = `gatherable-${itemId}`
                const locationSelectId = `${key}-location`
                const gatheringClass = get(this.state, `${locationSelectId}.gatheringClass`)
                const gatheringType = get(this.state, `${locationSelectId}.type`)
                const level = get(this.state, `${locationSelectId}.level`)

                return (
                  <tr key={key}>
                    <td><img src={icon} alt={name} /></td>
                    <td>{name}</td>
                    <td>{gatheringClass}{!!gatheringType && ` (${gatheringType})`}</td>
                    <td>{level}</td>
                    <td>{amount}</td>
                    <td>
                      {pointData.length === 1 && (
                        <React.Fragment>
                          {pointData[0].region} - {pointData[0].area} - {pointData[0].name}
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
                              {point.region} - {point.area} - {point.name} (Level {point.level}, {point.gatheringClass})
                            </option>
                          ))}
                        </FormControl>
                      )}
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
              {headings}
              </thead>
              <tbody>
              {ingredientsOther.map(item => {
                const { name, icon, itemId, amount } = item
                return (
                  <tr key={`purchasable-${itemId}`}>
                    <td><img src={icon} alt={name} /></td>
                    <td>{name}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{amount}</td>
                    <td>???</td>
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
              {headings}
              </thead>
              <tbody>
              {ingredientsPurchased.map(item => {
                const { name, icon, itemId, amount } = item
                return (
                  <tr key={`purchasable-${itemId}`}>
                    <td><img src={icon} alt={name} /></td>
                    <td>{name}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{amount}</td>
                    <td>???</td>
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
              {headings}
              </thead>
              <tbody>
              {ingredientsCrafted.map(item => {
                const name = get(item, 'ItemResult.Name_en')
                const icon = get(item, 'ItemResult.Icon')
                const id = get(item, 'ID')
                const quantity = get(item, 'quantity')
                const craftClass = get(item, 'ClassJob.NameEnglish')
                const craftLevel = get(item, 'RecipeLevelTable.ClassJobLevel')
                return (
                  <tr key={`crafted-${id}`}>
                    <td><img src={getIconUrl(icon)} alt={name} /></td>
                    <td>{name}</td>
                    <td>{craftClass}</td>
                    <td>{craftLevel}</td>
                    <td>{quantity}</td>
                    <td>N/A</td>
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
