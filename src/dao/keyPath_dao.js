class KeyPathDAO extends IndexDAO {
    constructor(databaseName, xStoreEntity) {
        super(databaseName, xStoreEntity);
    }

    _createFilter(type, value) {
        let filter = {};
        filter.type = type;
        filter.values = value;
        return filter;
    }
}

class NKeyPathDAO extends NIndexDAO {
    constructor(databaseName, xStoreEntity) {
        super(databaseName, xStoreEntity);
    }

    _createFilter(type, value) {
        let filter = {};
        filter.type = type;
        filter.values = value;
        return filter;
    }
}