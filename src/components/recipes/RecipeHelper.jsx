import React from 'react'

export default class RecipeHelper extends React.Component {
  render () {
    return (
      <div>
        <ol>
          <li>Choose a class you would like to search recipes for.</li>
          <li>Select a level range or enter free text to begin your search.</li>
        </ol>
      </div>
    )
  }
}
