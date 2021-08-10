import { GetAllDAO, CursorDAO, CursorUpdateDAO, CursorDeleteDAO, ACTION } from './dao'
import Collection from './../util/collection'

export default class CommonDAO {
  /**
   * @constructor
   * @param {String} databaseName
   * @param {StoreEntity} xStoreEntity
   * @param {Filter} xFilter
   */
  constructor(_, databaseName, xStoreEntity, xFilter) {
    this._ = _
    this[Symbol.for('databaseName')] = databaseName
    if (xFilter) {
      this[Symbol.for('filter')] = xFilter
    }
    if (xStoreEntity) {
      this[Symbol.for('TableEntity')] = xStoreEntity
    }
  }
  /**
   *
   * @param {Array[String]|String} columns
   * @param {Number} limit
   * @param {Number} start
   */
  get(columns, limit, start) {
    let xColumnEntity = this[Symbol.for('ColumnEntity')]
    let dao
    if (!xColumnEntity && IDBObjectStore.prototype.getAll && columns === undefined && limit === undefined && start === undefined) {
      dao = new GetAllDAO(this._)
    } else {
      if (xColumnEntity !== undefined) {
        columns = [xColumnEntity.name]
      }
      if (!(columns instanceof Array)) {
        columns = [columns]
      }
      dao = new CursorDAO(this._, columns, limit, start)
    }
    return this[Symbol.for('action')](dao)
  }
  /**
   *
   * @param {Array[String]|String} columns
   * @param {Number} limit
   * @param {Number} start
   */
  getDist(column, limit, start) {
    if (column !== undefined && !(column instanceof Array)) {
      column = [column]
    }

    let isDistinct = false
    if (column && typeof colsmn === 'string') {
      isDistinct = true
    } else if (column instanceof Array && column.length === 1) {
      isDistinct = true
    }

    return this[Symbol.for('action')](new CursorDAO(this._, column, limit, start), isDistinct)
  }
  /**
   *
   * @param {Object} values
   */
  update(values) {
    return this[Symbol.for('action')](new CursorUpdateDAO(this._, values))
  }
  /**
   *
   */
  delete() {
    return this[Symbol.for('action')](new CursorDeleteDAO(this._))
  }
  /**
   *
   * @param {DAO} dao
   * @param {Boolean} distinct
   */
  [Symbol.for('action')](dao, distinct) {
    dao.setFilter(this[Symbol.for('filter')])
    return new Promise((resolve, reject) => {
      try {
        //To check add object before inserting
        if (dao.check(this[Symbol.for('TableEntity')])) {
          this[Symbol.for('req')](dao, distinct, resolve, reject)
        } else {
          reject(dao.error)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  /**
   *
   * @param {DAO} dao
   * @param {Boolean} distinct
   * @param {Function} resolve
   * @param {Function} reject
   */
  [Symbol.for('req')](dao, distinct, resolve, reject) {
    let objectStore = dao.objectStore(this[Symbol.for('TableEntity')].name)
    //Create Cursor Object
    let cursorResult = new Array()
    //request action
    let req = objectStore[dao.action](dao.values)
    req.onsuccess = event => {
      if (dao.action === ACTION.CURSOR) {
        //Cursor
        this[Symbol.for('cursor')](event, dao, cursorResult, resolve, distinct)
      } else {
        if (event.target.result instanceof Array) {
          cursorResult = cursorResult.concat(event.target.result)
        } else {
          cursorResult = event.target.result
        }
        resolve(cursorResult)
      }
    }
    req.onerror = event => {
      reject(event.target.error)
    }
  }
  /**
   *
   * @param {Object} event
   * @param {DAO} dao
   * @param {Array} cursorResult
   * @param {Function} resolve
   */
  [Symbol.for('cursor')](event, dao, cursorResult, resolve, distinct) {
    let cursor = event.target.result
    if (dao.start) {
      cursor.advance(dao.start)
      dao.start = undefined
    } else {
      if (cursor && (!dao.limit || cursorResult.length < dao.limit)) {
        let result = {}
        if (dao.columns) {
          if (dao.columns.length === 1) {
            if (cursor.value[dao.columns[0]]) {
              result = cursor.value[dao.columns[0]]
            }
          } else {
            dao.columns.forEach(column => {
              if (cursor.value[column]) {
                result[column] = cursor.value[column]
              }
            })
          }
        } else {
          result = cursor.value
        }
        if (dao.filter) {
          let value = cursor.value[dao.filter.index]
          if (value) {
            switch (dao.filter.type) {
              case 'endsWith':
                if (!value.endsWith(dao.filter.values)) {
                  result = undefined
                }
                break
              default:
                console.log(dao.filter.type + ' condition is not handled')
            }
          }
        }

        if (result) {
          if (dao.newValues) {
            let updateData = Object.assign(cursor.value, dao.newValues)
            let req = cursor.update(updateData)
            req.onsuccess = event => {
              cursorResult.push(event.target.result)
            }
            req.onerror = event => {
              reject(event.target.error)
            }
          } else if (dao.newAction === ACTION.DELETE) {
            let req = cursor.delete()
            req.onsuccess = event => {
              cursorResult.push(event.target.result)
            }
            req.onerror = event => {
              reject(event.target.error)
            }
          } else {
            cursorResult.push(result)
          }
        }
        cursor.continue()
      } else {
        if (dao.newAction === ACTION.DELETE) {
          cursorResult = cursorResult.arr.length
        }
        resolve(distinct ? [...new Set(cursorResult)] : cursorResult)
      }
    }
  }
}
