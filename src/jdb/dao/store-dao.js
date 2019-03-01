import CommonDAO from './common-dao';
import { IndexDAO, NIndexDAO } from './index-dao';
import { AddDAO, ClearDAO, CountDAO, DeleteDAO, UpdateDAO } from './dao';


export default class StoreDAO extends CommonDAO {
  /**
   * 
   * @param {String} databaseName 
   * @param {StoreEntity} xStoreEntity 
   */
  constructor(databaseName, xStoreEntity) {
    super(databaseName, xStoreEntity);
    this.sBulkAdd = Symbol.for('bulkAdd');
    xStoreEntity.indexes.forEach(xIndexEntity => {
      let xIndexDAO;
      if (xIndexEntity.type === "number") {
        xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity);
      } else {
        xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity);
      }
      this[xIndexEntity.name] = xIndexDAO;
    });
    if (xStoreEntity.type === "number") {
      this[xStoreEntity.keyPath] = new NIndexDAO(databaseName, xStoreEntity);
    } else {
      this[xStoreEntity.keyPath] = new IndexDAO(databaseName, xStoreEntity);
    }
  }
  /**
   * 
   * @param {Object} values 
   */
  add(values) {
    if (values instanceof Array) {
      return new Promise((resolve, reject) => {
        let bulk = {};
        bulk.index = 0;
        bulk.values = values;
        this[this.sBulkAdd](bulk, resolve, reject);
      });
    } else {
      return this[Symbol.for('action')](new AddDAO(values));
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
      this[Symbol.for('action')](new AddDAO(bulk.values[bulk.index])).then(event => {
        bulk.index++;
        this[this.sBulkAdd](bulk, resolve, reject);
      }).catch(event => {
        reject(event, bulk.values[bulk.index]);
      })
    } else {
      resolve(bulk.index);
    }
  }

  clear() {
    return this[Symbol.for('action')](new ClearDAO());
  }

  count() {
    return this[Symbol.for('action')](new CountDAO());
  }
  /**
   * 
   * @param {String|Number} key 
   */
  delete(key) {
    return this[Symbol.for('action')](new DeleteDAO(key));
  }
  /**
   * 
   * @param {String|Number} key 
   * @param {Object} values 
   */
  update(key, values) {
    values[this[Symbol.for('StoreEntity')].keyPath] = key;
    return this[Symbol.for('action')](new UpdateDAO(values));
  }
}