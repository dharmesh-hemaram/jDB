import CommonEntity from './common-entity';
import StoreEntity from './store-entity';

export default class DBEntity extends CommonEntity {
  /**
   * 
   * @param {String} databaseName 
   * @param {Number} version 
   * @param {Array[StoreEntity]} stores 
   */
  constructor(databaseName, version, stores) {
    super();
    this.setter(databaseName, "databaseName", true);
    this.setter(version, "version", true, "number");
    this.setStores = stores;
  }
  /**
   * @param {Array[StoreEntity]} stores 
   */
  set setStores(stores) {
    this.stores = [];
    if (typeof stores === 'object' && stores instanceof Array) {
      stores.forEach(store => {
        if (!(store instanceof StoreEntity)) {
          store = StoreEntity.fromJSON(store)
        }
        this.stores.push(store);
      });
    } else if (stores !== undefined) {
      throw new TypeError(stores + " is of not of type [Object|Array]");
    }
  }

  /**
   * 
   * @param {Object} json 
   */
  static fromJSON(json) {
    return new DBEntity(json.databaseName, json.version, json.stores);
  }
}