import React, { Component } from 'react'
import CalculationsTable from './CalculationsTable'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>
          Crafting Calculator
        </h1>
        <CalculationsTable />
      </div>
    )
  }
}

export default App
