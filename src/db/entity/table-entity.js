import CommonEntity from './common-entity'
import ColumnEntity from './column-entity'

export default class TableEntity extends CommonEntity {
  /**
   *
   * @param {String} name
   * @param {String|Number} keyPath
   * @param {Array[ColumnEntity]} columns
   * @param {Boolean} autoIncrement
   * @param {String} type
   */
  constructor(name, keyPath, columns, autoIncrement = true, type = 'string') {
    super()
    this.autoIncrement = autoIncrement
    this.setter(name, 'name', true)
    this.setter(keyPath, 'keyPath', true)
    this.type = type
    this.setColumns = columns
  }
  /**
   * @param {Array[ColumnEntity]} columns
   */
  set setColumns(columns) {
    this.columns = []
    if (typeof columns === 'object' && columns instanceof Array) {
      columns.forEach(index => {
        if (!(index instanceof ColumnEntity)) {
          index = ColumnEntity.fromJSON(index)
        }
        this.columns.push(index)
      })
    } else if (columns !== undefined) {
      this.error('columns', columns)
    }
  }
  /**
   *
   * @param {Object} json
   */
  static fromJSON(json) {
    return new TableEntity(json.name, json.keyPath, json.columns, json.autoIncrement, json.type)
  }
}
