class DBDAO extends CommonDAO {

    constructor(xDBEntity) {
        super(xDBEntity.databaseName, null);
        this.xDBEntity = xDBEntity;
        xDBEntity.stores.forEach(xStoreEntity => {
            this[xStoreEntity.name] = new StoreDAO(xDBEntity.databaseName, xStoreEntity);
        });
    }

    delete() {
        if (!this.isReady) {
            throw new Error('Database is not ready');
        }
        return new Promise((resolve, reject) => {
            this._.close();
            let _req = indexedDB.deleteDatabase(this._databaseName);
            _req.onsuccess = (event) => {
                resolve('Database deleted Successfully');
            };
            _req.onerror = (event) => {
                reject(event.target.error);
            }
        });
    }
}