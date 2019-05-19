import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { get } from 'lodash'
import * as actions from '../store/local/actions'
import Navigation from './navigation/Navigation'
import CraftingGatheringCalculator from './calculator/CraftingGatheringCalculator'
import RecipeHelper from './recipes/RecipeHelper'

const externalLink = (url, text) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

class XivCraftingGatheringHelper extends React.Component {
  componentDidMount () {
    this.props.getLocalClassData()
    this.props.getLocalCharacterData()
  }

  render () {
    const { characterData, craftingClassData } = this.props

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
            {process.env.NODE_ENV === 'development' && (
              <Route path="/recipes" component={RecipeHelper} />
            )}
          </Switch>
          <hr />
          <div className="tc text-muted">
            Created by {externalLink('https://na.finalfantasyxiv.com/lodestone/character/22858010/',
            'Xythyt')} with the help of {externalLink('https://www.xivapi.com', 'XIVAPI')}.
            <br />
            Version {process.env.REACT_APP_VERSION}
          </div>
        </Container>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return ({
    craftingClassData: get(state, 'local.classData'),
    characterData: get(state, 'local.characterData')
  })
}

const mapDispatchToProps = dispatch => ({
  getLocalCharacterData: () => dispatch(actions.getLocalCharacterData()),
  getLocalClassData: () => dispatch(actions.getLocalClassData())
})

export default connect(mapStateToProps, mapDispatchToProps)(XivCraftingGatheringHelper)
