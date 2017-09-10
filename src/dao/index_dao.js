class IndexDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity, xIndexEntity) {
        super(databaseName, xStoreEntity);
        this.xIndexEntity = xIndexEntity;
    }

    equalDist(value) {
        return this._action(ACTION.GET, ACCESS.READ_ONLY, value);
    }

    _createFilter(type, value) {
        let filter = {};
        filter.type = type;
        filter.values = value;
        filter.index = this.xIndexEntity.name;
        return filter;
    }

    equal(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('equal', value));
    }

    startsWith(value) {
        //return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value, value + '\uffff'), value, 'startsWith');
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('startsWith', value));
    }

    endsWith(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('endsWith', value));
    }
}

class NIndexDAO extends IndexDAO {
    constructor(databaseName, storeName, xIndexEntity, xPromise) {
        super(databaseName, storeName, xIndexEntity, xPromise);
    }
    greaterThan(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('greaterThan', value));
    }
    lesserThan(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('lesserThan', value));
    }
    greaterThanOrEqual(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('greaterThanOrEqual', value));
    }
    lesserThanOrEqual(value) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('lesserThanOrEqual', value));
    }
    between(start, end) {
        return new CommonDAO(this.databaseName, this.xStoreEntity, this._createFilter('between', start + "~" + end));
    }
}