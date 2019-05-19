import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './local/reducer'
import recipeListReducer from './recipeList/reducer'

const rootReducer = combineReducers({
  local: reducer,
  recipeList: recipeListReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)
