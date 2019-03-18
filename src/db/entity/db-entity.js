import CommonEntity from './common-entity';
import TableEntity from './table-entity';

export default class DBEntity extends CommonEntity {
  /**
   * 
   * @param {String} databaseName 
   * @param {Number} version 
   * @param {Array[TableEntity]} tables 
   */
  constructor(databaseName, version, tables) {
    super();
    this.setter(databaseName, "databaseName", true);
    this.setter(version, "version", true, "number");
    this.setTables = tables;
  }
  /**
   * @param {Array[TableEntity]} tables 
   */
  set setTables(tables) {
    this.tables = [];
    if (typeof tables === 'object' && tables instanceof Array) {
      tables.forEach(store => {
        if (!(store instanceof TableEntity)) {
          store = TableEntity.fromJSON(store)
        }
        this.tables.push(store);
      });
    } else if (tables !== undefined) {
      throw new TypeError(tables + " is of not of type [Object|Array]");
    }
  }

  /**
   * 
   * @param {Object} json 
   */
  static fromJSON(json) {
    return new DBEntity(json.databaseName, json.version, json.tables);
  }
}