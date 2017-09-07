class XPromise extends Promise {
    constructor(executor, databaseName, xStoreEntity) {
        super(executor);
        if (Utils.isAvail(databaseName) && Utils.isAvail(xStoreEntity)) {
            this.and = new And(this, databaseName, xStoreEntity);
            this.or = new Or(this, databaseName, xStoreEntity);
            this.where = new Where(this, databaseName, xStoreEntity);
        }
    }

    count() {
        return new Promise((resolve, reject) => {
            this.then(result => {
                resolve(result.length);
            }).catch(error => {
                reject(error);
            })
        })
    }
}