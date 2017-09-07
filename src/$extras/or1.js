class Or1 {
    constructor(xPromise, databaseName, xStoreEntity) {
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity, xPromise);
            } else {
                xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity, xPromise);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });
    }
}