import React, { Component } from 'react'
import CalculationsTable from './calculations-table/CalculationsTable'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>
          FFXIV Crafting & Gathering Calculator
        </h1>
        <CalculationsTable />
        <hr />
        <div className="text-center text-muted text-lowercase">
          Version {process.env.REACT_APP_VERSION}
        </div>
      </div>
    )
  }
}

export default App
