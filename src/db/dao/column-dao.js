import CommonDAO from './common-dao'
import { Filter, FILTER_TYPE, FILTER_SPLITTER } from './filter'

class ColumnDAO extends CommonDAO {
  /**
   *
   * @param {String} databaseName
   * @param {TableEntity} xTableEntity
   * @param {ColumnEntity} xColumnEntity
   */
  constructor(_, databaseName, xTableEntity, xColumnEntity) {
    super(_, databaseName, xTableEntity)
    this[Symbol.for('ColumnEntity')] = xColumnEntity
  }
  /**
   *
   * @param {String|Number} value
   */
  equalDist(value) {
    return this[Symbol.for('action')](ACTION.GET, ACCESS.READ_ONLY, value)
  }
  /**
   *
   * @param {String|Number} value
   */
  equal(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.EQUAL, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} value
   */
  startsWith(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.STARTS_WITH, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} value
   */
  endsWith(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.ENDS_WITH, value, this[Symbol.for('ColumnEntity')]))
  }
}

class NColumnDAO extends ColumnDAO {
  constructor(_, databaseName, storeName, xColumnEntity) {
    super(_, databaseName, storeName, xColumnEntity)
  }
  /**
   *
   * @param {String|Number} value
   */
  greaterThan(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.GREATER_THAN, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} value
   */
  lesserThan(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.LESSER_THAN, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} value
   */
  greaterThanOrEqual(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.GREATER_THAN_OR_EQUAL, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} value
   */
  lesserThanOrEqual(value) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.LESSER_THAN_OR_EQUAL, value, this[Symbol.for('ColumnEntity')]))
  }
  /**
   *
   * @param {String|Number} start
   * @param {String|Number} end
   */
  between(start, end) {
    return new CommonDAO(this._, this[Symbol.for('databaseName')], this[Symbol.for('TableEntity')], new Filter(FILTER_TYPE.BETWEEN, start + FILTER_SPLITTER + end, this[Symbol.for('ColumnEntity')]))
  }
}

export { ColumnDAO, NColumnDAO }
