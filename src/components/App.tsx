import React, { ReactElement } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'

class App extends React.Component {
  render () : ReactElement {
    return (
      <div>
        Hi, this is a placeholder.
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(App)
