import React, { Component } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { filter, get } from 'lodash'
import { connect } from 'react-redux'
import * as action from '../store/action'
import Icon from './Icon'

const MINIMUM_LEVEL = 1
const MAXIMUM_LEVEL = 70

class App extends Component {
  state = {
    selectedClassId: -1,
    selectedMinimumLevel: MINIMUM_LEVEL,
    selectedMaximumLevel: MAXIMUM_LEVEL
  }

  componentDidMount() {
    const { getCraftingClasses } = this.props

    getCraftingClasses()
  }

  handleClassSelection = event => {
    const { clearRecipeList } = this.props
    const selectedClassId = event.target.value

    this.setState({
      selectedClassId
    }, () => clearRecipeList())
  }

  handleMinimumLevelSelection = event => {
    const { target: { value } } = event
    const { selectedMaximumLevel } = this.state

    let newMinimumLevel = value

    if (!!value.length) {
      if (isNaN(value)) {
        return
      }

      if (newMinimumLevel < MINIMUM_LEVEL) {
        newMinimumLevel = MINIMUM_LEVEL
      }

      if (newMinimumLevel > selectedMaximumLevel) {
        newMinimumLevel = selectedMaximumLevel
      }
    }

    this.setState({
      selectedMinimumLevel: newMinimumLevel
    })
  }

  handleMaximumLevelSelection = event => {
    const { target: { value } } = event
    const { selectedMinimumLevel } = this.state

    let newMaximumLevel = value

    if (!!value.length) {
      if (isNaN(value)) {
        return
      }

      if (newMaximumLevel > MAXIMUM_LEVEL) {
        newMaximumLevel = MAXIMUM_LEVEL
      }

      if (newMaximumLevel < selectedMinimumLevel) {
        newMaximumLevel = selectedMinimumLevel
      }
    }

    this.setState({
      selectedMaximumLevel: newMaximumLevel
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

  render () {
    const { craftingClasses, recipeList, thinking } = this.props
    const { selectedClassId, selectedMinimumLevel, selectedMaximumLevel } = this.state

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
            <InputLabel htmlFor="tbMin">Minimum Level</InputLabel>
            <TextField
              id="tbMin"
              fullWidth
              min={MINIMUM_LEVEL}
              max={selectedMaximumLevel}
              onChange={this.handleMinimumLevelSelection}
              value={selectedMinimumLevel}
            />
          </div>
          <div className="w-third-l w-20-m ph1">
            <InputLabel htmlFor="tbMax">Maximum Level</InputLabel>
            <TextField
              id="tbMax"
              fullWidth
              min={selectedMinimumLevel}
              max={MAXIMUM_LEVEL}
              onChange={this.handleMaximumLevelSelection}
              value={selectedMaximumLevel}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-100-l w-10-m pv2">
            <Button
              color="primary"
              disabled={selectedClassId < 0 || !selectedMinimumLevel || !selectedMaximumLevel || !!thinking}
              fullWidth
              onClick={this.handleSearch}
              variant="outlined"
            >
              {thinking ? 'Thinking ... ' : 'Search'}
            </Button>
          </div>
        </div>

        {!!get(recipeList, 'length') && (
          <table>
            <thead>
            <tr>
              <th>Recipe Level</th>
              <th>Icon</th>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {recipeList.map((recipe, key) => (
              <tr key={key}>
                <td className="tc">
                  {get(recipe, 'RecipeLevelTable.ClassJobLevel')}
                </td>
                <td className="tc">
                  <Icon url={get(recipe, 'Icon')} name={get(recipe, 'Name')} />
                </td>
                <td className="tl">
                  {get(recipe, 'Name')}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  craftingClasses: state.craftingClasses,
  recipeList: state.recipeList,
  thinking: state.thinking
})

const mapDispatchToProps = dispatch => {
  return {
    getCraftingClasses: () => dispatch(action.getCraftingClasses()),
    getRecipeList: (classId, minLevel, maxLevel) => dispatch(action.getRecipeList(classId, minLevel, maxLevel)),
    clearRecipeList: () => dispatch(action.clearRecipeList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
