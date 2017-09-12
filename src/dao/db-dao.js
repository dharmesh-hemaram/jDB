import StoreDAO from './store-dao';

export default class DBDAO {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    constructor(xDBEntity) {
        this._databaseName = xDBEntity.databaseName;
        xDBEntity.stores.forEach(xStoreEntity => {
            this[xStoreEntity.name] = new StoreDAO(xDBEntity.databaseName, xStoreEntity);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.getDB().close();
            let req = DB.getInst().indexedDB.deleteDatabase(this._databaseName);
            req.onsuccess = (event) => {
                resolve('Database deleted Successfully');
            };
            req.onerror = (event) => {
                reject(event.target.error);
            }
        });
    }
}