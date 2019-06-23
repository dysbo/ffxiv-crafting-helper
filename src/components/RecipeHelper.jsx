import React from 'react'
import { Badge, Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { cloneDeep, find, get, includes, indexOf, omit, reject, sortBy, toNumber } from 'lodash'
import { getCurrentTab, storeCurrentTab } from '../service/localStorage'
import RecipeSearch from './recipes/RecipeSearch'
import MyList from './recipes/MyList'
import * as recipeActions from '../store/recipeList/actions'
import ShoppingList from './recipes/ShoppingList'
import CraftingGatheringCalculator from './calculator/CraftingGatheringCalculator'

class RecipeHelper extends React.Component {
  state = {
    recipeSearchClasses: [],
    recipeSearchExact: false,
    recipeSearchString: '',
    recipeSearchIncludeMaster: false,
    recipeSearchIsInvalid: false,
    myList: [],
    lastSearch: undefined
  }

  componentDidMount () {
    this.setState({
      key: getCurrentTab()
    })
  }

  handleToggleRecipeSearchClass (event) {
    const recipeSearchClasses = cloneDeep(get(this.state, 'recipeSearchClasses', []))
    const abbreviation = get(event, 'target.value', event)

    if (includes(recipeSearchClasses, abbreviation)) {
      recipeSearchClasses.splice(recipeSearchClasses.indexOf(abbreviation), 1)
    } else {
      recipeSearchClasses.push(abbreviation)
    }

    this.setState({
      recipeSearchClasses: sortBy(recipeSearchClasses, s => s.toLowerCase())
    })
  }

  handleToggleRecipeSearchExact (event) {
    const recipeSearchExact = get(event, 'target.checked', false)
    this.setState({
      recipeSearchExact
    })
  }

  handleToggleRecipeIncludeMaster (event) {
    const checked = get(event, 'target.checked')

    this.setState({
      recipeSearchIncludeMaster: checked
    })
  }

  handleFieldUpdate (event) {
    const { target: { name, value } } = event

    let recipeSearchIsInvalid = false
    if (!value) {
      recipeSearchIsInvalid = true
    }

    this.setState({
      [name]: value,
      recipeSearchIsInvalid
    })
  }

  handleClearList () {
    const { clearMyRecipeList } = this.props
    clearMyRecipeList()
    this.handleTabChange('search')
  }

  search (page = 1) {
    const { searchRecipes } = this.props
    const { recipeSearchClasses, recipeSearchExact, recipeSearchIncludeMaster, recipeSearchString } = this.state
    const params = {
      page,
      abbreviation: recipeSearchClasses,
      exact: recipeSearchExact,
      includeMasterRecipes: recipeSearchIncludeMaster
    }

    searchRecipes(recipeSearchString, params)
  }

  handleUpdateQuantity (item, value) {
    const newValue = Math.max(1, toNumber(value))

    const { myRecipeList, saveMyRecipeList } = this.props
    const myListItemIndex = indexOf(myRecipeList, item)
    myRecipeList[myListItemIndex].quantity = newValue
    saveMyRecipeList(myRecipeList)
  }

  handleSearch (event) {
    event.preventDefault()
    const page = get(event, 'target.value', 1)
    const { recipeSearchString } = this.state
    if (!recipeSearchString) {
      document.getElementsByName('recipeSearchString')[0].focus()
      this.setState({
        recipeSearchIsInvalid: true
      })
      return
    }

    this.search(page)
  }

  handleClear () {
    document.getElementsByName('recipeSearchString')[0].focus()
    this.setState({
      recipeSearchIsInvalid: false,
      recipeSearchString: ''
    })
  }

  handlePageChange (event) {
    this.handleSearch(event)
  }

  handleTabChange (key) {
    storeCurrentTab(key)
    this.setState({ key })
  }

  toggleListItem (item) {
    item = omit(item, 'quantity')
    const { myRecipeList, saveMyRecipeList } = this.props
    let myClonedList = cloneDeep(myRecipeList)
    const foundItem = find(myRecipeList, i => get(i, 'ID') === get(item, 'ID'))

    if (!!foundItem) {
      myClonedList = reject(myRecipeList, item)
    } else {
      item.quantity = 1
      myClonedList.push(item)
    }

    saveMyRecipeList(myClonedList)
  }

  render () {
    const {
      recipeSearchExact,
      recipeSearchClasses,
      recipeSearchIncludeMaster,
      recipeSearchIsInvalid,
      recipeSearchString
    } = this.state

    const {
      characterData,
      clearRecipeSearch,
      craftingClassData,
      myRecipeList,
      myShoppingList,
      recipeSearchResults
    } = this.props

    return (
      <div className="recipe-list pt3">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleTabChange.bind(this)}
        >
          <Tab eventKey="calculator" title="Calculations">
            <div className="recipe-tab">
              <CraftingGatheringCalculator characterData={characterData} craftingClassData={craftingClassData} />
            </div>
          </Tab>
          <Tab eventKey="search" title="Recipe Search">
            <div className="recipe-tab">
              <RecipeSearch
                clearRecipeSearch={clearRecipeSearch.bind(this)}
                handleChange={this.handleFieldUpdate.bind(this)}
                handlePageChange={this.handlePageChange.bind(this)}
                handleReset={this.handleClear.bind(this)}
                handleSubmit={this.handleSearch.bind(this)}
                handleTabChange={this.handleTabChange.bind(this)}
                handleToggleRecipeIncludeMaster={this.handleToggleRecipeIncludeMaster.bind(this)}
                handleToggleListItem={this.toggleListItem.bind(this)}
                handleToggleRecipeSearchClass={this.handleToggleRecipeSearchClass.bind(this)}
                handleToggleRecipeSearchExact={this.handleToggleRecipeSearchExact.bind(this)}
                myList={myRecipeList}
                recipeSearchIncludeMaster={recipeSearchIncludeMaster}
                recipeSearchClasses={recipeSearchClasses}
                recipeSearchExact={recipeSearchExact}
                recipeSearchResults={recipeSearchResults}
                recipeSearchIsInvalid={recipeSearchIsInvalid}
                recipeSearchString={recipeSearchString}
              />
            </div>
          </Tab>
          <Tab eventKey="recipe-list" title={`My Recipe List (${myRecipeList.length})`}>
            <div className="recipe-tab">
              <MyList
                list={myRecipeList}
                handleClearList={this.handleClearList.bind(this)}
                handleTabChange={this.handleTabChange.bind(this)}
                handleToggleListItem={this.toggleListItem.bind(this)}
                handleUpdateQuantity={this.handleUpdateQuantity.bind(this)}
              />
            </div>
          </Tab>
          <Tab eventKey="shopping-list" title={(
            <span>
              Shopping List <Badge variant="primary">Beta</Badge>
            </span>
          )}>
            <div className="recipe-tab">
              <ShoppingList
                shoppingList={myShoppingList}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  myRecipeList: get(state, 'recipeList.myRecipeList', []),
  myShoppingList: get(state, 'recipeList.myShoppingList', {}),
  recipeSearchResults: get(state, 'recipeList.recipeSearchResults', {})
})

const mapDispatchToProps = dispatch => ({
  saveMyRecipeList: recipeList => dispatch(recipeActions.saveMyRecipeList(recipeList)),
  clearMyRecipeList: () => dispatch(recipeActions.clearMyRecipeList()),
  createMyShoppingList: recipeList => dispatch(recipeActions.createMyShoppingList(recipeList)),
  clearMyShoppingList: () => dispatch(recipeActions.clearMyShoppingList()),
  searchRecipes: (string, params) => dispatch(recipeActions.searchRecipes(string, params)),
  clearRecipeSearch: () => dispatch(recipeActions.clearRecipeSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeHelper)
