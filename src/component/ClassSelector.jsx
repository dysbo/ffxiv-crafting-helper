import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as xivApi from '../service/xivApi'
import Icon from './Icon'

class ClassSelector extends Component {
  state = {
    craftingClasses: []
  }

  async componentDidMount() {
    const craftingClasses = await xivApi.getCraftingClasses()
    this.setState({
      craftingClasses: craftingClasses['Results']
    })
  }

  render () {
    const { craftingClasses } = this.state
    const { handleToggle } = this.props

    return (
      <div>
        {craftingClasses.map(craft => (
          <button
            key={craft.ID}
            className="flex items-center justify-start ttc"
            onClick={handleToggle.bind(this, craft.ID)}
          >
            <Icon url={craft.Icon} name={craft.Name} /> {craft.Name}
          </button>
        ))}
      </div>
    )
  }
}

ClassSelector.propTypes = {
  handleToggle: PropTypes.func.isRequired
}

export default ClassSelector
