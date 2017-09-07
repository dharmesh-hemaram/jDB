class Or extends StoreDAO {
    constructor(databaseName, xStoreEntity, filter) {
        super(databaseName, xStoreEntity, filter, 'or');
    }
}