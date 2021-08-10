import DB from "./db";

export default class Config {

  /**
   * 
   * @param {DBEntity} xDBEntity 
   */
  conifg(xDBEntity) {
    return new Promise((resolve, reject) => {
      let req = DB[Symbol.for("indexedDB")]().open(xDBEntity.databaseName, xDBEntity.version);
      req.onupgradeneeded = event => {
        xDBEntity.tables.forEach(xTable => {
          this.createTable(event.target.result, xTable);
        });
        event.target.result.onversionchange = event => {
          event.target.result.close();
          alert("A new version of this page is ready. Please reload!");
        };
      };
      req.onblocked = () => {
        alert("Please close all other tabs with this site open!");
      };
      req.onsuccess = event => {
        resolve(event.target.result);
      };
      req.onerror = event => {
        reject(event.target.error);
      }
    });
  }
  /**
   * 
   * @param {IDBDatabase} _ 
   * @param {IDBObjectStore} xTable 
   */
  createTable(_, xTable) {
    if (_.objectStoreNames.contains(xTable.name)) {
      _.deleteObjectStore(xTable.name);
    }
    let tableInst = _.createObjectStore(xTable.name, { "keyPath": xTable.keyPath, "autoIncrement": xTable.autoIncrement });
    xTable.columns.forEach(xColumn => {
      tableInst.createIndex(xColumn.name, xColumn.name, { unique: xColumn.unique, multiEntry: xColumn.multiEntry });
    });
  }
}