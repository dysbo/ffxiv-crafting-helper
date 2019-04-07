import { get as _get, values as _values } from 'lodash'

export function updateStoredDataWithLodestoneData (craftingClassData, characterData) {
  // get class data from lodestone character data and make it into something usable
  const lodestoneClassData = _values(_get(characterData, 'ClassJobs'))
}