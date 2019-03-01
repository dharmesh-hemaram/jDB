import CommonDAO from './common-dao';
import { Filter, FILTER_TYPE, FILTER_SPLITTER } from './filter';


class IndexDAO extends CommonDAO {
  /**
   * 
   * @param {String} databaseName 
   * @param {StoreEntity} xStoreEntity 
   * @param {IndexEntity} xIndexEntity 
   */
  constructor(databaseName, xStoreEntity, xIndexEntity) {
    super(databaseName, xStoreEntity);
    this[Symbol.for('IndexEntity')] = xIndexEntity;
  }
  /**
   * 
   * @param {String|Number} value 
   */
  equalDist(value) {
    return this[Symbol.for('action')](ACTION.GET, ACCESS.READ_ONLY, value);
  }
  /**
   * 
   * @param {String|Number} value 
   */
  equal(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.EQUAL, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} value 
   */
  startsWith(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.STARTS_WITH, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} value 
   */
  endsWith(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.ENDS_WITH, value, this[Symbol.for('IndexEntity')]));
  }
}

class NIndexDAO extends IndexDAO {
  constructor(databaseName, storeName, xIndexEntity) {
    super(databaseName, storeName, xIndexEntity);
  }
  /**
   * 
   * @param {String|Number} value 
   */
  greaterThan(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.GREATER_THAN, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} value 
   */
  lesserThan(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.LESSER_THAN, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} value 
   */
  greaterThanOrEqual(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.GREATER_THAN_OR_EQUAL, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} value 
   */
  lesserThanOrEqual(value) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.LESSER_THAN_OR_EQUAL, value, this[Symbol.for('IndexEntity')]));
  }
  /**
   * 
   * @param {String|Number} start 
   * @param {String|Number} end 
   */
  between(start, end) {
    return new CommonDAO(this[Symbol.for('databaseName')], this[Symbol.for('StoreEntity')], new Filter(FILTER_TYPE.BETWEEN, start + FILTER_SPLITTER + end, this[Symbol.for('IndexEntity')]));
  }
}

export { IndexDAO, NIndexDAO };