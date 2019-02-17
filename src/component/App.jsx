import React, { Component } from 'react';
import ClassSelector from './ClassSelector'

class App extends Component {
  state = {
    selectedClassId: undefined
  }

  handleClassSelectionToggle (selectedClassId) {
    this.setState({
      selectedClassId
    })
  }

  render () {
    const { selectedClassId } = this.state

    return (
      <div className="mh2">
        <h1>Stacy's Cool Crafting Planner</h1>

        <div>
          <ClassSelector handleToggle={this.handleClassSelectionToggle.bind(this)} />
        </div>

        {!!selectedClassId && (
          <div>
            options here?
          </div>
        )}
      </div>
    )
  }
}

export default App;
