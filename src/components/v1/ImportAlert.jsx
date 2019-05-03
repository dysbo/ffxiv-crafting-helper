import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class ImportAlert extends React.Component {
  render () {
    const { characterIsLoaded, characterData, refreshCharacterData } = this.props
    return (
      <React.Fragment>
        {!characterIsLoaded && !!characterData && (
          <div className="alert alert-info text-center">
            <div>
              Your character is being imported for the first time. Congratulations!<br />
              Please wait a few minutes and try your import again.
            </div>
            <div>
              {!!characterData.characterId && (
                <Button variant="info" onClick={refreshCharacterData.bind(this, characterData.characterId)}>
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

ImportAlert.propTypes = {
  characterData: PropTypes.shape({
    characterId: PropTypes.number
  }),
  characterIsLoaded: PropTypes.bool.isRequired,
  refreshCharacterData: PropTypes.func.isRequired
}

export default ImportAlert
