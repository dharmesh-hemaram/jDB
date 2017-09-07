class Operators extends CommonDAO {
    constructor(databaseName, xStoreEntity, filter) {
        super(databaseName, xStoreEntity.name);
        this.filter = filter;
        this.and = new And(databaseName, xStoreEntity, filter);
        this.or = new Or(databaseName, xStoreEntity, filter);
    }
}