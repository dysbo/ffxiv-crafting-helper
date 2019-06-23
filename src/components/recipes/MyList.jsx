import React from 'react'
import PropTypes from 'prop-types'
import { isEqual, set, toNumber } from 'lodash'
import { Button, Form, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { getIconUrl } from '../../service/xivApi'

export default class MyList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mapping: this.createItemQuantityMapping()
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { list } = this.props
    if (!isEqual(list, prevProps.list)) {
      const mapping = this.createItemQuantityMapping()
      this.setState({
        mapping
      })
    }
  }

  createItemQuantityMapping () {
    const { list } = this.props
    const mapping = {}

    list.forEach(l => {
      mapping[l.ID] = l.quantity
    })

    return mapping
  }

  handleItemQuantityUpdate (i, event) {
    const { mapping } = this.state
    set(mapping, i.ID, event.target.value)
    this.setState({
      mapping
    })
  }

  handleQuantityFieldBlur (item) {
    const { handleUpdateQuantity } = this.props
    const { mapping } = this.state

    const quantity = toNumber(mapping[item.ID]) || 1

    handleUpdateQuantity(item, quantity)
  }

  render () {
    const {
      handleClearList,
      handleTabChange,
      handleToggleListItem,
      list
    } = this.props

    const { mapping } = this.state

    if (!list.length) {
      return (
        <div className="tc">
          No Items in List
          <hr />
          <Button onClick={handleTabChange.bind(this, 'search')}>
            Back to Search
          </Button>
        </div>
      )
    }

    return (
      <Table className="recipes" hover striped>
        <thead>
        <tr>
          <th />
          <th>Crafting Class</th>
          <th>Item Name</th>
          <th>Required Level to Craft</th>
          <th>Quantity</th>
          <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        {list.map((i) => {
          return (
            <tr key={i.ID}>
              <td><img src={getIconUrl(i.Icon)} alt={i.Name} /></td>
              <td>{i.ClassJob.NameEnglish}</td>
              <td>{i.Name}</td>
              <td>{i.RecipeLevelTable.ClassJobLevel}</td>
              <td>
                <Form.Control
                  type="number"
                  value={mapping[i.ID] || 1}
                  onChange={this.handleItemQuantityUpdate.bind(this, i)}
                  onBlur={this.handleQuantityFieldBlur.bind(this, i)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={handleToggleListItem.bind(this, i)}>
                  <FontAwesomeIcon icon={faMinusSquare} />
                </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
        {list.length && (
          <tfoot>
          <tr>
            <td colSpan={6} className="tc">
              <div className="space-between">
                <Button variant="danger" onClick={handleClearList}>
                  Clear Recipe List
                </Button>
                <Button variant="primary" onClick={handleTabChange.bind(this, 'shopping-list')}>
                  View My Shopping List
                </Button>
              </div>
            </td>
          </tr>
          </tfoot>
        )}
      </Table>
    )
  }
}

MyList.propTypes = {
  handleClearList: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleToggleListItem: PropTypes.func.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    ClassJob: PropTypes.shape({
      Abbreviation_en: PropTypes.string.isRequired,
      NameEnglish: PropTypes.string.isRequired
    }),
    Icon: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    RecipeLevelTable: PropTypes.shape({
      ClassJobLevel: PropTypes.number.isRequired
    }).isRequired
  })).isRequired
}

MyList.defaultProps = {
  list: []
}
