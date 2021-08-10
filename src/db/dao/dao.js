import DB from '../db'
import { Filter, FILTER_TYPE, FILTER_SPLITTER } from './filter'
export const ACTION = {
  ADD: 'add',
  GET: 'get',
  GET_ALL: 'getAll',
  CURSOR: 'openCursor',
  PUT: 'put',
  DELETE: 'delete',
  CLEAR: 'clear',
  COUNT: 'count'
}
export const ACCESS = {
  READ_WRITE: 'readwrite',
  READ_ONLY: 'readonly'
}
class DAO {
  /**
   *
   * @param {ACCESS} access
   * @param {String} index
   * @param {ACTION} action
   * @param {String|Number} key
   * @param {Array[Object]|Object} values
   * @param {Array[String]|String} columns
   */
  constructor(_, access, index, action, key, values, columns, limit, start) {
    this._ = _
    this.sKey = Symbol.for('key')
    this.access = access
    this.index = index
    this.action = action
    this[this.sKey] = key
    this.values = values
    this.columns = columns
    this.limit = limit
    this.start = start
  }

  /**
   * Ckeck typeof key before setting to object
   * @param {String|Number}  : key
   */
  set [Symbol.for('key')](key) {
    if (key) {
      if (typeof key === 'string' || typeof key === 'number') {
        this.key = key
      } else {
        throw new Error(key + ' should be of type string | number only')
      }
    }
  }

  /**
   *
   * @param {String} databaseName
   * @param {String} storeName
   */
  objectStore(storeName) {
    if (!storeName) {
      throw new Error('Store is not defined')
    }
    let trans = this._.transaction([storeName], this.access)
    trans.oncomplete = function (event) {
      //console.info(event.target.result);
    }
    trans.onerror = function (event) {
      //console.error(event.target.error);
    }

    let objectStore = trans.objectStore(storeName)
    if (this.index) {
      if (typeof this.index === 'string' || typeof this.index === 'number') {
        objectStore = objectStore.index(this.index)
      } else {
        reject('Only one key is alowed in update')
      }
    }
    return objectStore
  }
  /**
   *
   * @param {Object} table
   */
  check(table) {
    if (this.action === ACTION.ADD) {
      if (!table.autoIncrement && !this.values[table.keyPath]) {
        this.error = table.keyPath + ' is not defined in ' + table.name
        return false
      }
      table.columns.forEach(index => {
        if (index.nullable === false && !this.values[index.name]) {
          this.error = index.name + ' is not defined in ' + table.name
          return false
        }
      })
    } else if (this.action === ACTION.CURSOR && this.newValues) {
    }
    return true
  }
  /**
   *
   * @param {Filter} filter
   */
  setFilter(filter) {
    if (filter && filter.type) {
      this.index = filter.index
      switch (filter.type) {
        case FILTER_TYPE.EQUAL:
          this.values = DB[Symbol.for('IDBKeyRange')]().only(filter.value)
          break
        case FILTER_TYPE.STARTS_WITH:
          this.values = DB[Symbol.for('IDBKeyRange')]().bound(filter.value, filter.value + '\uffff')
          break
        case FILTER_TYPE.GREATER_THAN:
          this.values = DB[Symbol.for('IDBKeyRange')]().lowerBound(filter.value, true)
          break
        case FILTER_TYPE.LESSER_THAN:
          this.values = DB[Symbol.for('IDBKeyRange')]().upperBound(filter.value, true)
          break
        case FILTER_TYPE.GREATER_THAN_OR_EQUAL:
          this.values = DB[Symbol.for('IDBKeyRange')]().lowerBound(filter.value, false)
          break
        case FILTER_TYPE.LESSER_THAN_OR_EQUAL:
          this.values = DB[Symbol.for('IDBKeyRange')]().upperBound(filter.value, false)
          break
        case FILTER_TYPE.BETWEEN:
          let bounds = filter.value.split(FILTER_SPLITTER)
          this.values = DB[Symbol.for('IDBKeyRange')]().bound(Number(bounds[0]), Number(bounds[1]))
          break
        default:
          this.index = undefined
          this.filter = filter
          this.action = ACTION.CURSOR
      }
    }
  }
}
class AddDAO extends DAO {
  /**
   *
   * @param {Array[Object]|Object} values
   */
  constructor(_, values) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.ADD, undefined, values)
  }
}
class ClearDAO extends DAO {
  constructor(_) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.CLEAR)
  }
}
class CountDAO extends DAO {
  constructor(_) {
    super(_, ACCESS.READ_ONLY, undefined, ACTION.COUNT)
  }
}
class DeleteDAO extends DAO {
  /**
   *
   * @param {String|Number} key
   */
  constructor(_, key) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.DELETE, key)
  }
}
class UpdateDAO extends DAO {
  /**
   *
   * @param {String|Number} key
   * @param {Array[Object]|Object} values
   */
  constructor(_, values) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.PUT, undefined, values)
  }
}
class GetDAO extends DAO {
  /**
   *
   * @param {String|Number} key
   */
  constructor(_, key) {
    super(_, ACCESS.READ_ONLY, undefined, ACTION.GET, key)
  }
}
class GetAllDAO extends DAO {
  constructor(_) {
    super(_, ACCESS.READ_ONLY, undefined, ACTION.GET_ALL)
  }
}
class CursorDAO extends DAO {
  /**
   *
   * @param {Array[String]|String} columns
   * @param {Number} limit
   * @param {Number} start
   */
  constructor(_, columns, limit, start) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.CURSOR, undefined, undefined, columns, limit, start)
  }
}
class CursorUpdateDAO extends DAO {
  /**
   *
   * @param {Object} values
   */
  constructor(_, values) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.CURSOR)
    this.newValues = values
  }
}
class CursorDeleteDAO extends DAO {
  constructor(_) {
    super(_, ACCESS.READ_WRITE, undefined, ACTION.CURSOR)
    this.newAction = ACTION.DELETE
  }
}

export { DAO, GetDAO, GetAllDAO, AddDAO, ClearDAO, CountDAO, UpdateDAO, DeleteDAO, CursorDAO, CursorDeleteDAO, CursorUpdateDAO }
