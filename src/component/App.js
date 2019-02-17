import React, { Component } from 'react';
import * as xivApi from '../service/xivApi'
import SearchResult from './SearchResult'

class App extends Component {
  state = {
    result: 'Still waiting, please hold ..'
  }

  async componentDidMount() {
    const result = await xivApi.queryForCraftingRecipes('CUL', 1, 20)
    console.log(result)
    this.setState({
      result
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.result ? <SearchResult {...this.state.result} /> : 'Loading ...'}
      </div>
    );
  }
}

export default App;
