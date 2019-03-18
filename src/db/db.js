import DBDAO from './dao/db-dao';
import DBEntity from './entity/db-entity';
import TableEntity from './entity/table-entity';
import ColumnEntity from './entity/column-entity';

import Config from './config';

const DATABASE_SETUP_SUCCESS = 'Database Setup Successfully !';

export default class DB {

  // In the following line, you should include the prefixes of implementations you want to test.
  static [Symbol.for("indexedDB")]() { return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB };
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  static [Symbol.for("IDBTransaction")]() {
    return window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
      READ_WRITE: "readwrite"
    }
  };
  // This line should only be needed if it is needed to support the object's constants for older browsers
  static [Symbol.for("IDBKeyRange")]() { return window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange };
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

  constructor() {
    this.xDB;
  }

  static getInst() {
    if (!this.xDB) {
      this.xDB = new DB();
    }
    return this.xDB;
  }
  /**
   * 
   * @param {DBEntity|Object} xDBEntity 
   * 
   */
  static setup(xDBEntity) {
    if (!(xDBEntity instanceof DBEntity)) {
      xDBEntity = DBEntity.fromJSON(xDBEntity);
    }
    return new Promise((resolve, reject) => {
      new Config().conifg(xDBEntity).then(_ => {
        this.getInst()[xDBEntity.databaseName] = new DBDAO(_, xDBEntity);
        resolve(DATABASE_SETUP_SUCCESS);
      }).catch(reject);
    })
  }
}
export { DBEntity, TableEntity, ColumnEntity };