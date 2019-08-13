export default class TypeStrings {
  private readonly type : string

  constructor (type : string) {
    this.type = type
  }

  REQUEST = `${this.type}_REQUEST`
  SUCCESS = `${this.type}_SUCCESS`
  FAILURE = `${this.type}_FAILURE`
}
