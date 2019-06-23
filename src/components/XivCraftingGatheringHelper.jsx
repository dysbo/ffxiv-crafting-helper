import React from 'react'
import { connect } from 'react-redux'
import { Container, Toast } from 'react-bootstrap'
import { get, isEqual, set } from 'lodash'
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
  state = {
    toast: {
      show: false
    }
  }

  componentDidMount () {
    this.props.getLocalClassData()
    this.props.getLocalCharacterData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { toast } = this.props

    if (!isEqual(toast, prevProps.toast) && get(toast, 'show')) {
      this.setState({
        toast
      })
    }
  }

  handleToastClose () {
    const { toast } = this.state
    toast.show = false
    this.setState({
      toast
    })
  }

  render () {
    const { characterData, craftingClassData, loading, toast } = this.props

    return (
      <React.Fragment>
        <Navigation
          characterData={characterData}
          craftingClassData={craftingClassData}
        />
        <Container fluid>
          <RecipeHelper characterData={characterData} craftingClassData={craftingClassData} />
          <hr />
          <div className="tc text-muted pb3">
            Created by {externalLink('https://na.finalfantasyxiv.com/lodestone/character/22858010/',
            'Xythyt')} with the help of {externalLink('https://www.xivapi.com', 'XIVAPI')}.
            <br />
            Version {process.env.REACT_APP_VERSION}
          </div>
          <Toast
            show={toast.show}
            onClose={this.handleToastClose.bind(this)}
            style={{
              position: 'absolute',
              top: '5em',
              right: '1em',
              zIndex: 99,
              minWidth: '250px'
            }}
          >
            <Toast.Header>
              <strong className="mr-auto">{toast.title}</strong>
              <small>{toast.time}</small>
            </Toast.Header>
            <Toast.Body>
              {toast.message}
            </Toast.Body>
          </Toast>
        </Container>
        <LoadingOverlay show={loading} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const error = get(state, 'local.error') || get(state, 'recipeList.error')

  const toast = {
    show: false
  }

  if (error) {
    set(toast, 'message', get(error, 'message', error))
    set(toast, 'show', true)
    set(toast, 'title', 'Error')
    set(toast, 'time', new Date().toISOString())
  }

  return {
    craftingClassData: get(state, 'local.classData'),
    characterData: get(state, 'local.characterData'),
    loading: (
      Object.keys(get(state, 'local.loading', {})).length > 0 ||
      Object.keys(get(state, 'recipeList.loading', {})).length > 0
    ),
    toast
  }
}

const mapDispatchToProps = dispatch => ({
  getLocalCharacterData: () => dispatch(actions.getLocalCharacterData()),
  getLocalClassData: () => dispatch(actions.getLocalClassData())
})

export default connect(mapStateToProps, mapDispatchToProps)(XivCraftingGatheringHelper)
