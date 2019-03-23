import React from 'react'
import { get as _get, map as _map } from 'lodash'
import CalculationsRow from './CalculationsRow'
import craftingClasses from '../data/crafting-classes'

class CalculationsTable extends React.Component {
  state = {
    showOption: '',
    craftingClasses: craftingClasses
  }

  handleFilter (event) {
    const showOption = _get(event, 'target.value', event)
    this.setState({
      showOption
    })
  }

  render () {
    const { craftingClasses, showOption } = this.state
    return (
      <table className="table table-responsive table-hover table-condensed">
        <thead>
        <tr>
          <td colSpan={8}>
            <select
              className="fullWidth"
              value={this.state.showOption}
              onChange={this.handleFilter.bind(this)}
            >
              <option value={''}>Show All</option>
              {craftingClasses.map((c, key) => (
                <option key={key} value={c.abbreviation}>{c.name}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <th>Crafting Class</th>
          <th>Current Level</th>
          <th>Current Experience</th>
          <th className="d-none d-md-table-cell">Exp. to Next Level</th>
          <th className="d-none d-md-table-cell">Remaining Experience</th>
          <th>Exp. per Craft Item</th>
          <th>Items to Level Up</th>
          <th className="d-none d-md-table-cell" style={{ minWidth: '200px' }}>Progress</th>
        </tr>
        </thead>
        <tbody>
        {_map(craftingClasses, (c, key) => (
          <CalculationsRow
            key={key}
            craftingClass={c}
            hidden={!!showOption && showOption !== c.abbreviation}
          />
        ))}
        </tbody>
      </table>
    )
  }
}

export default CalculationsTable
