import TableDAO from './table-dao';
const DATABASE_DELETE_SUCCESS = 'Database deleted Successfully';
export default class DBDAO {
  /**
   * 
   * @param {DBEntity} xDBEntity 
   */
  constructor(_, xDBEntity) {
    this._ = _;
    this[Symbol.for('databaseName')] = xDBEntity.databaseName;
    xDBEntity.tables.forEach(xStoreEntity => {
      this[xStoreEntity.name] = new TableDAO(_, xDBEntity.databaseName, xStoreEntity);
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      this._.close();
      let req = DB[Symbol.for("IDBKeyRange")]().deleteDatabase(this[Symbol.for('databaseName')]);
      req.onsuccess = () => {
        resolve(DATABASE_DELETE_SUCCESS);
      };
      req.onerror = (event) => {
        reject(event.target.error);
      }
    });
  }
}