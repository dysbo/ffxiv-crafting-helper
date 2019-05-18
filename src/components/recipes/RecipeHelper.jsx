import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { cloneDeep, find, get, omit, reject, indexOf, toNumber } from 'lodash'
import { recipeSearch } from '../../service/xivApi'
import RecipeSearch from './RecipeSearch'
import MyList from './MyList'
import * as RecipeService from '../../service/recipe'
import ShoppingList from './ShoppingList'

export default class RecipeHelper extends React.Component {
  state = {
    recipeSearchString: 'trout',
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

  async search (page = 1) {
    const { recipeSearchString } = this.state
    const results = await recipeSearch(undefined, recipeSearchString, page)
    this.setState({
      searching: false,
      recipeList: results,
      lastSearch: recipeSearchString
    })
  }

  handleUpdateQuantity (item, event) {
    const newValue = Math.max(1, toNumber(event.target.value))

    const { myList } = this.state
    const idk = indexOf(myList, item)
    myList[idk].quantity = newValue
    this.setState({
      myList
    })
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

  toggleListItem (item) {
    item = omit(item, 'quantity')
    const { myList } = this.state
    let myClonedList = cloneDeep(myList)
    const foundItem = find(myList, i => get(i, 'ID') === get(item, 'ID'))

    if (!!foundItem) {
      myClonedList = reject(myList, item)
    } else {
      item.quantity = 1
      myClonedList.push(item)
    }

    this.setState({
      myList: myClonedList
    })
  }

  async handleGenerateShoppingList () {
    const { myList } = this.state

    const shoppingListResults = await RecipeService.getIngredientListForRecipes(myList)

    this.setState({
      key: 'shopping-list',
      shoppingListResults
    })
  }

  render () {
    const { myList, recipeList, recipeSearchIsInvalid, recipeSearchString, searching, shoppingListResults } = this.state

    return (
      <div className="recipe-list pt3">
        <Tabs
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="search" title="Recipe Search">
            <div className="recipe-tab">
              <RecipeSearch
                handleChange={this.handleFieldUpdate.bind(this)}
                handlePageChange={this.handlePageChange.bind(this)}
                handleReset={this.handleClear.bind(this)}
                handleSubmit={this.handleSearch.bind(this)}
                handleToggleListItem={this.toggleListItem.bind(this)}
                myList={myList}
                recipeSearchResults={recipeList}
                recipeSearchIsInvalid={recipeSearchIsInvalid}
                recipeSearchString={recipeSearchString}
                searching={searching}
              />
            </div>
          </Tab>
          <Tab eventKey="recipe-list" title={`My Recipe List (${myList.length})`}>
            <div className="recipe-tab">
              <MyList
                list={myList}
                handleToggleListItem={this.toggleListItem.bind(this)}
                handleUpdateQuantity={this.handleUpdateQuantity.bind(this)}
                handleGenerateShoppingList={this.handleGenerateShoppingList.bind(this)}
              />
            </div>
          </Tab>
          <Tab eventKey="shopping-list" title={`My Shopping List`}>
            <div className="recipe-tab">
              <ShoppingList shoppingList={shoppingListResults} />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
