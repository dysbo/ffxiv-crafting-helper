import {
  filter as _filter,
  find as _find,
  forEach as _forEach,
  get as _get,
  includes as _includes,
  set as _set,
  values as _values
} from 'lodash'

const targetClassJobCategories = [
  'Disciple of the Land',
  'Disciple of the Hand'
]

export function updateStoredDataWithLodestoneData (craftingClassData, characterData) {
  // get class data from lodestone character data and make it into something usable
  const lodestoneClassData = _filter(_values(_get(characterData, 'Character.ClassJobs')),
    classJob => _includes(targetClassJobCategories, _get(classJob, 'Class.ClassJobCategory.Name')))

  _forEach(craftingClassData, craftingClass => {
    const matchingLodestoneClass = _find(lodestoneClassData, c => c.Class.Abbreviation === craftingClass.abbreviation)
    if (matchingLodestoneClass) {
      console.log(matchingLodestoneClass)
      _set(craftingClass, 'currentLevel', _get(matchingLodestoneClass, 'Level'))
      _set(craftingClass, 'currentExperience', _get(matchingLodestoneClass, 'ExpLevel'))
    }
  })

  console.log(craftingClassData)
}