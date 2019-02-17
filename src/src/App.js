import React, { Component } from 'react';
import * as xivApi from '../service/xivApi'

class App extends Component {
  state = {
    result: 'Still waiting, please hold ..'
  }

  async componentDidMount() {
    const result = await xivApi.queryForCraftingRecipes('CUL', 1, 5)
    console.log(result)
    this.setState({
      result
    })
  }

  render() {
    return (
      <div className="App">
        Hey here is my JSON result for the POC call: {JSON.stringify(this.state.result)}
      </div>
    );
  }
}

export default App;
