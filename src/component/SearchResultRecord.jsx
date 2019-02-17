import React from 'react'
import PropTypes from 'prop-types'

class SearchResultRecord extends React.Component {
  baseUrl = 'https://xivapi.com'

  render () {
    const { Icon, RecipeLevelTable: { ClassJobLevel }, Name } = this.props

    return (
      <tr>
        <td className="tc">{ClassJobLevel}</td>
        <td className="tc">
          <img src={Icon.indexOf(this.baseUrl) === 0 ? Icon : `${this.baseUrl}${Icon}`} alt={Name} />
        </td>
        <td>{Name}</td>
      </tr>
    )
  }
}

SearchResultRecord.propTypes = {
  ID: PropTypes.number.isRequired,
  Icon: PropTypes.string.isRequired,
  RecipeLevelTable: PropTypes.shape({
    ClassJobLevel: PropTypes.number.isRequired
  }),
  Name: PropTypes.string.isRequired
}

export default SearchResultRecord
