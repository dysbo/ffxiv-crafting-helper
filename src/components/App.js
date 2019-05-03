import React from 'react'
import XivCraftingGatheringHelper from './XivCraftingGatheringHelper'
import Provider from 'react-redux/es/components/Provider'
import store from '../store'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <XivCraftingGatheringHelper />
      </Provider>
    )
  }
}

export default App
