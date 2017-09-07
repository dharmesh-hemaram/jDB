class DBDAO extends CommonDAO {

    constructor(xDBEntity) {
        super(xDBEntity.databaseName, null);
        //this.xDBEntity = xDBEntity;
        xDBEntity.stores.forEach(xStoreEntity => {
            this[xStoreEntity.name] = new StoreDAO(xDBEntity.databaseName, xStoreEntity, []);
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            this.getDB().close();
            let req = indexedDB.deleteDatabase(this.databaseName);
            req.onsuccess = (event) => {
                resolve('Database deleted Successfully');
            };
            req.onerror = (event) => {
                reject(event.target.error);
            }
        });
    }
}