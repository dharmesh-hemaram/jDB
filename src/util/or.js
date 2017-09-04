class Or {
    constructor(promise, xStoreEntity) {
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity);
            } else {
                xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });
    }
}