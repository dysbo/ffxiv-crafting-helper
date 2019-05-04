import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { get } from 'lodash'
import * as actions from '../store/actions'
import Navigation from './Navigation'
import CraftingGatheringCalculator from './calculator/CraftingGatheringCalculator'

class XivCraftingGatheringHelper extends React.Component {
  componentDidMount () {
    this.props.getLocalClassData()
    this.props.getLocalCharacterData()
  }

  render () {
    const { characterData, craftingClassData } = this.props
    const DummyComponent = props => (
      <div>
        hi here are my props<br />
        {JSON.stringify(props)}
      </div>
    )

    const Calculator = props => (
      <CraftingGatheringCalculator
        characterData={characterData}
        craftingClassData={craftingClassData}
        {...props}
      />
    )

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Navigation
          characterData={characterData}
          craftingClassData={craftingClassData}
        />
        <Container fluid>
          <Switch>
            <Route exact path="/" render={Calculator} />
            <Route path="/calculations" render={Calculator} />
            <Route path="/recipes/:craftingClass" render={DummyComponent} />
          </Switch>
        </Container>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  craftingClassData: get(state, 'classData'),
  characterData: get(state, 'characterData')
})

const mapDispatchToProps = dispatch => ({
  getLocalCharacterData: () => dispatch(actions.getLocalCharacterData()),
  getLocalClassData: () => dispatch(actions.getLocalClassData())
})

export default connect(mapStateToProps, mapDispatchToProps)(XivCraftingGatheringHelper)
