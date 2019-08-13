import { filter } from 'lodash'

class LocalStorageService {
  private readonly ACTIVE_CHARACTER = 'active_character'
  private readonly ALL_CHARACTERS = 'all_characters'

  getActiveCharacter () : any {
    const activeCharacter = localStorage.getItem(this.ACTIVE_CHARACTER)
    return !!activeCharacter ? JSON.parse(activeCharacter) : undefined
  }

  getAllCharacters () : [any] {
    const allCharacters = localStorage.getItem(this.ALL_CHARACTERS)
    return !!allCharacters ? JSON.parse(allCharacters) : []
  }

  addCharacter (data : any) : [any] {
    const allCharacters = this.getAllCharacters()
    allCharacters.push(data)
    localStorage.setItem(this.ALL_CHARACTERS, JSON.stringify(allCharacters))
    return this.getAllCharacters()
  }

  removeCharacter (id: string) : [any] {
    const allCharacters = this.getAllCharacters()
    localStorage.setItem(this.ALL_CHARACTERS, JSON.stringify(filter(allCharacters, c => c.ID !== id)))
    return this.getAllCharacters()
  }

  setActiveCharacter (data : any) : void {
    localStorage.setItem(this.ACTIVE_CHARACTER, data)
  }

  clearActiveCharacter () : void {
    localStorage.removeItem(this.ACTIVE_CHARACTER)
  }
}

export const localStorageService = new LocalStorageService()
