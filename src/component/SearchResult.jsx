import React from 'react'
import PropTypes from 'prop-types'
import SearchResultRecord from './SearchResultRecord'

class SearchResult extends React.Component {
  render () {
    const { Results } = this.props

    return (
      <div>
        <h2>Search Results</h2>
        <table>
          <thead>
          <tr>
            <th>Level</th>
            <th>Icon</th>
            <th className="tl">Name</th>
          </tr>
          </thead>
          <tbody>
          {Results.map(result => <SearchResultRecord key={result.ID} {...result} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

SearchResult.propTypes = {
  Pagination: PropTypes.shape(),
  Results: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  SpeedMs: PropTypes.number
}

SearchResult.defaultProps = {
  Results: []
}

export default SearchResult
