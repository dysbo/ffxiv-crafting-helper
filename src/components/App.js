import React, { Component } from 'react'
import CalculationsTable from './calculations-table'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>
          FFXIV Crafting Calculator
        </h1>
        <CalculationsTable />
      </div>
    )
  }
}

export default App
