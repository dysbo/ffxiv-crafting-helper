import React from 'react'
import PropTypes from 'prop-types'

const TIME_TO_WAIT = 15

export default class FirstTimeImport extends React.Component {
  state = {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { show } = this.props
    const { timer } = this.state

    if (show !== prevProps.show) {
      if (!timer && show) {
        this.startTimer()
      } else {
        this.endTimer()
      }
    }
  }

  async executeTimer () {
    const { getLodestoneCharacterData } = this.props
    const { timeLeft = 0 } = this.state

    if (!timeLeft) {
      this.endTimer()
      await getLodestoneCharacterData()
      if (this.props.show) {
        this.startTimer()
      }
    } else {
      this.setState({
        timeLeft: timeLeft - 1
      })
    }
  }


  startTimer () {
    this.setState({
      timeLeft: TIME_TO_WAIT,
      timer: setInterval(this.executeTimer.bind(this), 1000)
    })
  }

  endTimer () {
    const { timer } = this.state
    if (!!timer) {
      this.setState({
        timer: clearInterval(timer)
      })
    }
  }

  render () {
    const { show } = this.props
    const { timeLeft } = this.state

    if (!show) {
      return null
    }

    const timeLeftMessage = `Your data is currently being loaded.  Please wait ${timeLeft} `
      + `second${timeLeft > 1 ? 's' : ''} while the import processes, after which your data will attempt to load `
      + `automatically.  If you are experiencing continued difficulty, please try your import again.`
    const doneMessage = `Checking your import for completeness, please wait...`

    return (
      <div className="w-100 pb3 tc alert alert-info">
        Thanks for importing! {timeLeft ? timeLeftMessage : doneMessage}
      </div>
    )
  }
}

FirstTimeImport.propTypes = {
  show: PropTypes.bool.isRequired,
  getLodestoneCharacterData: PropTypes.func.isRequired
}

FirstTimeImport.defaultProps = {
  show: false
}
