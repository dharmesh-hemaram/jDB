class Where{
    constructor(xPromise, databaseName, xStoreEntity) {
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xAndFilter;
            if (xIndexEntity.type === "number") {
                xAndFilter = new NAndFilter(xPromise, databaseName, xStoreEntity, xIndexEntity.name);;
            } else {
                xAndFilter = new AndFilter(xPromise, databaseName, xStoreEntity, xIndexEntity.name);;
            }
            this[xIndexEntity.name] = xAndFilter;
        });
    }
}