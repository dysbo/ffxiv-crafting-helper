import React, { Component } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { filter } from 'lodash'
import { connect } from 'react-redux'
import * as action from '../store/action'
import Icon from './Icon'

class App extends Component {
  state = {
    selectedClassId: -1,
    selectedMinimumLevel: 1,
    selectedMaximumLevel: 70
  }

  componentDidMount() {
    const { getCraftingClasses } = this.props

    getCraftingClasses()
  }

  handleClassSelection = event => {
    const selectedClassId = event.target.value

    this.setState({
      selectedClassId
    })
  }

  handleMinimumLevelSelection = event => {
    this.setState({
      selectedMinimumLevel: event.target.value
    })
  }

  handleMaximumLevelSelection = event => {
    this.setState({
      selectedMaximumLevel: event.target.value
    })
  }

  handleClassRender = value => {
    const { craftingClasses } = this.props

    const craftingClass = filter(craftingClasses, c => c.ID === value)
    return (craftingClass[0] || {}).Name
  }

  handleSearch = () => {
    const { getRecipeList } = this.props

    getRecipeList(this.state.selectedClassId, this.state.selectedMinimumLevel, this.state.selectedMaximumLevel)
  }

  retrieveMinimumLevelOptions = () => {
    const { selectedMaximumLevel } = this.state

    const options = []
    for (let i = 1; i <= selectedMaximumLevel; i++) {
      options.push(i)
    }

    return options
  }

  retrieveMaximumLevelOptions = () => {
    const { selectedMinimumLevel } = this.state

    const options = []
    for (let i = selectedMinimumLevel; i <= 70; i++) {
      options.push(i)
    }

    return options
  }

  render () {
    const { craftingClasses, recipeList } = this.props
    const { selectedClassId, selectedMinimumLevel, selectedMaximumLevel } = this.state

    console.log(recipeList)

    return (
      <div className="mh2">
        <h1>Stacy's Cool Crafting Planner</h1>

        <div className="flex flex-row">
          <div className="w-third-l w-50-m pr1">
            <InputLabel>Select a Crafting Class</InputLabel>
            <Select
              className="ttc"
              fullWidth
              onChange={this.handleClassSelection}
              renderValue={this.handleClassRender}
              value={selectedClassId}
            >
              {craftingClasses.map(opt => (
                <MenuItem
                  className="ttc"
                  key={opt.ID}
                  value={opt.ID}
                >
                  <Icon url={opt.Icon} name={opt.Name} />
                  {opt.Name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="w-third-l w-20-m ph1">
            <InputLabel>Minimum Level</InputLabel>
            <Select
              fullWidth
              native
              onChange={this.handleMinimumLevelSelection}
              value={selectedMinimumLevel}
            >
              {this.retrieveMinimumLevelOptions().map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </Select>
          </div>
          <div className="w-third-l w-20-m ph1">
            <InputLabel>Maximum Level</InputLabel>
            <Select
              fullWidth
              native
              onChange={this.handleMaximumLevelSelection}
              value={selectedMaximumLevel}
            >
              {this.retrieveMaximumLevelOptions().map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-100-l w-10-m pv2">
            <Button
              color="primary"
              fullWidth
              onClick={this.handleSearch}
              variant="outlined"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  craftingClasses: state.craftingClasses,
  recipeList: state.recipeList
})

const mapDispatchToProps = dispatch => {
  return {
    getCraftingClasses: () => dispatch(action.getCraftingClasses()),
    getRecipeList: (classId, minLevel, maxLevel) => dispatch(action.getRecipeList(classId, minLevel, maxLevel))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
