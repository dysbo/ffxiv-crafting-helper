import React from 'react'
import { Badge, Tab, Tabs } from 'react-bootstrap'
import { connect } from 'react-redux'
import { cloneDeep, find, get, omit, reject, indexOf, toNumber } from 'lodash'
import { recipeSearch } from '../service/xivApi'
import RecipeSearch from './recipes/RecipeSearch'
import MyList from './recipes/MyList'
import * as recipeActions from '../store/recipeList/actions'
import ShoppingList from './recipes/ShoppingList'
import CraftingGatheringCalculator from './calculator/CraftingGatheringCalculator'

class RecipeHelper extends React.Component {
  state = {
    recipeSearchString: '',
    recipeSearchIsInvalid: false,
    searching: false,
    myList: [],
    lastSearch: undefined
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

  async search (page = 1) {
    const { recipeSearchString } = this.state
    const results = await recipeSearch(recipeSearchString, { page })
    this.setState({
      searching: false,
      recipeList: results,
      lastSearch: recipeSearchString
    })
  }

  handleUpdateQuantity (item, event) {
    const newValue = Math.max(1, toNumber(event.target.value))

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

    this.setState({
      searching: true
    }, () => this.search(page))
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
    this.setState({
      key
    })
  }

  toggleListItem (item) {
    console.log('togglin', item)
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
    const { recipeList, recipeSearchIsInvalid, recipeSearchString, searching } = this.state
    const { characterData, craftingClassData, myRecipeList, myShoppingList } = this.props

    return (
      <div className="recipe-list pt3">
        <Tabs
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="calculator" title="Calculations">
            <div className="recipe-tab">
              <CraftingGatheringCalculator characterData={characterData} craftingClassData={craftingClassData} />
            </div>
          </Tab>
          <Tab eventKey="search" title="Recipe Search">
            <div className="recipe-tab">
              <RecipeSearch
                handleChange={this.handleFieldUpdate.bind(this)}
                handlePageChange={this.handlePageChange.bind(this)}
                handleReset={this.handleClear.bind(this)}
                handleSubmit={this.handleSearch.bind(this)}
                handleTabChange={this.handleTabChange.bind(this)}
                handleToggleListItem={this.toggleListItem.bind(this)}
                myList={myRecipeList}
                recipeSearchResults={recipeList}
                recipeSearchIsInvalid={recipeSearchIsInvalid}
                recipeSearchString={recipeSearchString}
                searching={searching}
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
  myShoppingList: get(state, 'recipeList.myShoppingList', [])
})

const mapDispatchToProps = dispatch => ({
  saveMyRecipeList: recipeList => dispatch(recipeActions.saveMyRecipeList(recipeList)),
  clearMyRecipeList: () => dispatch(recipeActions.clearMyRecipeList()),
  createMyShoppingList: recipeList => dispatch(recipeActions.createMyShoppingList(recipeList)),
  clearMyShoppingList: () => dispatch(recipeActions.clearMyShoppingList())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeHelper)
