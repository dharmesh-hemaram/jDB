import CommonDAO from './common-dao'
import { ColumnDAO, NColumnDAO } from './column-dao'
import { AddDAO, ClearDAO, CountDAO, DeleteDAO, UpdateDAO } from './dao'
import CommonEntity from '../entity/common-entity'
import ColumnEntity from '../entity/column-entity'

export default class TableDAO extends CommonDAO {
  /**
   *
   * @param {String} databaseName
   * @param {TableEntity} xTableEntity
   */
  constructor(_, databaseName, xTableEntity) {
    super(_, databaseName, xTableEntity)
    this.sBulkAdd = Symbol.for('bulkAdd')
    xTableEntity.columns.forEach(xColumnEntity => {
      let xColumnDAO
      if (xColumnEntity.type === 'number') {
        xColumnDAO = new NColumnDAO(this._, databaseName, xTableEntity, xColumnEntity)
      } else {
        xColumnDAO = new ColumnDAO(this._, databaseName, xTableEntity, xColumnEntity)
      }
      this[xColumnEntity.name] = xColumnDAO
    })

    let xColumnEntity = new ColumnEntity(xTableEntity.keyPath, true, false, false, xTableEntity.type)
    if (xTableEntity.type === 'number') {
      this[xTableEntity.keyPath] = new NColumnDAO(this._, databaseName, xTableEntity, xColumnEntity)
    } else {
      this[xTableEntity.keyPath] = new ColumnDAO(this._, databaseName, xTableEntity, xColumnEntity)
    }
  }
  /**
   *
   * @param {Object} values
   */
  add(values) {
    if (values instanceof Array) {
      return new Promise((resolve, reject) => {
        let bulk = {}
        bulk.index = 0
        bulk.values = values
        this[this.sBulkAdd](bulk, resolve, reject)
      })
    } else {
      return this[Symbol.for('action')](new AddDAO(this._, values))
    }
  }
  /**
   *
   * @param {Object} bulk
   * @param {Function} resolve
   * @param {Function} reject
   */
  [Symbol.for('bulkAdd')](bulk, resolve, reject) {
    if (bulk.index < bulk.values.length) {
      this[Symbol.for('action')](new AddDAO(this._, bulk.values[bulk.index]))
        .then(event => {
          bulk.index++
          this[this.sBulkAdd](bulk, resolve, reject)
        })
        .catch(event => {
          reject(event, bulk.values[bulk.index])
        })
    } else {
      resolve(bulk.index)
    }
  }

  clear() {
    return this[Symbol.for('action')](new ClearDAO(this._))
  }

  count() {
    return this[Symbol.for('action')](new CountDAO(this._))
  }
  /**
   *
   * @param {String|Number} key
   */
  delete(key) {
    return this[Symbol.for('action')](new DeleteDAO(this._, key))
  }
  /**
   *
   * @param {String|Number} key
   * @param {Object} values
   */
  update(key, values) {
    values[this[Symbol.for('TableEntity')].keyPath] = key
    return this[Symbol.for('action')](new UpdateDAO(this._, values))
  }
}
