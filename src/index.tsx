import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import store from './store'

import './styles/index.scss'
import { Provider } from 'react-redux'

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
