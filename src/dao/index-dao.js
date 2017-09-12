import CommonDAO from './common_dao';
import Filter from './filter';


export default class IndexDAO extends CommonDAO {
    /**
     * 
     * @param {String} databaseName 
     * @param {StoreEntity} xStoreEntity 
     * @param {IndexEntity} xIndexEntity 
     */
    constructor(databaseName, xStoreEntity, xIndexEntity) {
        super(databaseName, xStoreEntity);
        this._xIndexEntity = xIndexEntity;
    }
    /**
     * 
     * @param {String|Number} value 
     */
    equalDist(value) {
        return this._action(ACTION.GET, ACCESS.READ_ONLY, value);
    }
    /**
     * 
     * @param {String|Number} value 
     */
    equal(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    startsWith(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.STARTS_WITH, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    endsWith(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.ENDS_WITH, value, this._xIndexEntity));
    }
}

export default class NIndexDAO extends IndexDAO {
    constructor(databaseName, storeName, xIndexEntity) {
        super(databaseName, storeName, xIndexEntity);
    }
    /**
     * 
     * @param {String|Number} value 
     */
    greaterThan(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.GREATER_THAN, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    lesserThan(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.LESSER_THAN, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    greaterThanOrEqual(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.GREATER_THAN_OR_EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    lesserThanOrEqual(value) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.LESSER_THAN_OR_EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} start 
     * @param {String|Number} end 
     */
    between(start, end) {
        return new CommonDAO(this._databaseName, this._xStoreEntity, new Filter(FILTER_TYPE.BETWEEN, start + FILTER_SPLITTER + end, this._xIndexEntity));
    }
}