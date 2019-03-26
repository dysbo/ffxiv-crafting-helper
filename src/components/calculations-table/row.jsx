import React from 'react'
import PropTypes from 'prop-types'
import CraftingClassCell from './cells/CraftingClassCell'
import CurrentLevelCell from './cells/CurrentLevelCell'
import CurrentExperienceCell from './cells/CurrentExperienceCell'
import ExperiencePerItemCell from './cells/ExperiencePerItemCell'
import ProgressCell from './cells/ProgressCell'
import NumericDisplay from './cells/NumericDisplay'

class CalculationsTableRow extends React.Component {
  render () {
    const {
      className,
      data: {
        abbreviation,
        name,
        currentLevel,
        currentExperience,
        totalExperience,
        experiencePerItem
      },
      handleCurrentLevelSelection,
      handleCurrentExperienceChange,
      handleExperiencePerItemChange,
      handleProgressChange
    } = this.props

    const remainingExperience = Math.max(totalExperience - currentExperience, 0)

    return (
      <tr className={className}>
        <CraftingClassCell
          name={name}
          abbreviation={abbreviation}
        />
        <CurrentLevelCell
          currentLevel={currentLevel}
          handleCurrentLevelSelection={handleCurrentLevelSelection}
        />
        <CurrentExperienceCell
          currentExperience={currentExperience}
          handleCurrentExperienceChange={handleCurrentExperienceChange}
          totalExperience={totalExperience}
        />
        <td className="d-none d-sm-table-cell">
          <NumericDisplay value={totalExperience} />
        </td>
        <td className="d-none d-sm-table-cell">
          <NumericDisplay value={Math.max(totalExperience - currentExperience, 0)} />
        </td>
        <ExperiencePerItemCell
          experiencePerItem={experiencePerItem}
          handleExperiencePerItemChange={handleExperiencePerItemChange}
        />
        <td>
          <NumericDisplay value={Math.ceil(remainingExperience / experiencePerItem)} />
        </td>
        <ProgressCell
          currentExperience={currentExperience}
          totalExperience={totalExperience}
          handleProgressChange={handleProgressChange}
        />
      </tr>
    )
  }
}

CalculationsTableRow.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string.isRequired,
    currentLevel: PropTypes.number.isRequired,
    currentExperience: PropTypes.number.isRequired,
    experiencePerItem: PropTypes.number.isRequired
  }).isRequired,
  handleCurrentLevelSelection: PropTypes.func.isRequired,
  handleCurrentExperienceChange: PropTypes.func.isRequired,
  handleExperiencePerItemChange: PropTypes.func.isRequired,
  handleProgressChange: PropTypes.func.isRequired
}

export default CalculationsTableRow