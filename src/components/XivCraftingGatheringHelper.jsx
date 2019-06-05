import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { get } from 'lodash'
import * as actions from '../store/local/actions'
import Navigation from './navigation/Navigation'
import RecipeHelper from './RecipeHelper'
import LoadingOverlay from './common/LoadingOverlay'

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
    const { characterData, craftingClassData, loading } = this.props

    return (
      <React.Fragment>
        <Navigation
          characterData={characterData}
          craftingClassData={craftingClassData}
        />
        <Container fluid>
          <RecipeHelper characterData={characterData} craftingClassData={craftingClassData} />
          <hr />
          <div className="tc text-muted">
            Created by {externalLink('https://na.finalfantasyxiv.com/lodestone/character/22858010/',
            'Xythyt')} with the help of {externalLink('https://www.xivapi.com', 'XIVAPI')}.
            <br />
            Version {process.env.REACT_APP_VERSION}
          </div>
        </Container>
        <LoadingOverlay show={loading} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  craftingClassData: get(state, 'local.classData'),
  characterData: get(state, 'local.characterData'),
  loading: (
    Object.keys(get(state, 'local.loading', {})).length > 0 ||
    Object.keys(get(state, 'recipeList.loading', {})).length > 0
  )
})

const mapDispatchToProps = dispatch => ({
  getLocalCharacterData: () => dispatch(actions.getLocalCharacterData()),
  getLocalClassData: () => dispatch(actions.getLocalClassData())
})

export default connect(mapStateToProps, mapDispatchToProps)(XivCraftingGatheringHelper)
