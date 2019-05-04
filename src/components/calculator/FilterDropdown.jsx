import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { orderBy } from 'lodash'
import CRAFTING_CLASSES from '../../data/crafting-classes'

export default class FilterDropdown extends React.Component {
  render () {
    const { label, applyFilterFunc } = this.props
    return (
      <DropdownButton title={`Showing ${label}`}>
        <Dropdown.Item onClick={applyFilterFunc.bind(this, c => !!c)}>
          All
        </Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item onClick={applyFilterFunc.bind(this, c => c.type === 'crafting')}>
          Crafting Classes
        </Dropdown.Item>
        <Dropdown.Item onClick={applyFilterFunc.bind(this, c => c.type === 'gathering')}>
          Gathering Classes
        </Dropdown.Item>
        <Dropdown.Divider/>
        {orderBy(CRAFTING_CLASSES, 'name').map((craftingClass, key) => (
          <Dropdown.Item
            key={key}
            onClick={applyFilterFunc.bind(this, c => c.abbreviation === craftingClass.abbreviation)}
          >
            {craftingClass.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    )
  }
}

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  applyFilterFunc: PropTypes.func.isRequired
}
