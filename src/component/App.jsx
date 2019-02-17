import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../store/action'

class App extends Component {
  componentDidMount() {
    const { getCraftingClasses } = this.props

    getCraftingClasses()
  }

  render () {
    return (
      <div className="mh2">
        <h1>Stacy's Cool Crafting Planner</h1>

        <div>
          selector will go here
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    craftingClasses: state.craftingClasses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCraftingClasses: () => dispatch(action.getCraftingClasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
