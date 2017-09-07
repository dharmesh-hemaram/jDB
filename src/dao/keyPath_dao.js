
class KeyPathDAO extends CommonDAO {
    constructor(databaseName, xStoreEntity, xIndexEntity, xPromise) {
        super(databaseName, xStoreEntity.name);
        this.xStoreEntity = xStoreEntity;
        this.xIndexEntity = xIndexEntity;
        this.xPromise = xPromise;
    }
}