import Filter from './filter';

export const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    CURSOR: 'openCursor',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};
export const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};
export default class DAO {
    /**
     * 
     * @param {ACCESS} access 
     * @param {String} index 
     * @param {ACTION} action 
     * @param {String|Number} key 
     * @param {Array[Object]|Object} values 
     * @param {Array[String]|String} columns 
     */
    constructor(access, index, action, key, values, columns, limit, start) {
        this.access = access;
        this.index = index;
        this.action = action;
        this._key = key;
        this.values = values;
        this.columns = columns;
        this.limit = limit;
        this.start = start;
    }
    /**
     * Ckeck typeof key before setting to object
     */
    set _key(key) {
        if (Utils.isAvail(key)) {
            if (typeof key === "string" || typeof key === "number") {
                this.key = key;
            } else {
                throw new Error(key + " should be of type string | number only");
            }
        }
    }
    /**
     * 
     * @param {String} databaseName 
     */
    getDB(databaseName) {
        return DB.getInst().getDB(databaseName);
    }
    /**
     * 
     * @param {String} databaseName 
     * @param {String} storeName 
     */
    objectStore(databaseName, storeName) {
        if (!storeName) {
            throw new Error('Store is not defined');
        }
        let trans = this.getDB(databaseName).transaction([storeName], this.access);
        trans.oncomplete = function (event) {
            //console.info(event.target.result);
        };
        trans.onerror = function (event) {
            //console.error(event.target.error);
        };

        let objectStore = trans.objectStore(storeName);
        if (this.index) {
            if (typeof this.index === "string" || typeof this.index === "number") {
                objectStore = objectStore.index(this.index);
            } else {
                reject('Only one key is alowed in update');
            }
        }
        return objectStore;
    }
    /**
     * 
     * @param {Object} entity 
     */
    check(entity) {
        if (this.action === ACTION.ADD) {
            if (!entity.autoIncrement && !this.values[entity.keyPath]) {
                this.error = entity.keyPath + ' is not defined in ' + entity.name;
                return false;
            }
            entity.indexes.forEach((index) => {
                if (index.nullable === false && !this.values[index.name]) {
                    this.error = index.name + ' is not defined in ' + entity.name;
                    return false;
                }
            });
        } else if (this.action === ACTION.CURSOR && Utils.isAvail(this.newValues)) {

        }
        return true;
    }
    /**
     * 
     * @param {Filter} filter 
     */
    setFilter(filter) {
        if (filter && filter.type) {
            this.index = filter.index;
            switch (filter.type) {
                case FILTER_TYPE.EQUAL:
                    this.values = IDBKeyRange.only(filter.value);
                    break;
                case FILTER_TYPE.STARTS_WITH:
                    this.values = IDBKeyRange.bound(filter.value, filter.value + '\uffff');
                    break;
                case FILTER_TYPE.GREATER_THAN:
                    this.values = IDBKeyRange.lowerBound(filter.value, true);
                    break;
                case FILTER_TYPE.LESSER_THAN:
                    this.values = IDBKeyRange.upperBound(filter.value, true);
                    break;
                case FILTER_TYPE.GREATER_THAN_OR_EQUAL:
                    this.values = IDBKeyRange.lowerBound(filter.value, false);
                    break;
                case FILTER_TYPE.LESSER_THAN_OR_EQUAL:
                    this.values = IDBKeyRange.upperBound(filter.value, false);
                    break;
                case FILTER_TYPE.BETWEEN:
                    let bounds = filter.value.split('~');
                    this.values = IDBKeyRange.bound(Number(bounds[0]), Number(bounds[1]));
                    break;
                default:
                    this.index = undefined;
                    this.filter = filter;
                    this.action = ACTION.CURSOR;
            }
        }
    }
}
export default class AddDAO extends DAO {
    /**
     * 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.ADD, undefined, values);
    }
}
export default class ClearDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CLEAR);
    }
}
export default class CountDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.COUNT);
    }
}
export default class DeleteDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_WRITE, undefined, ACTION.DELETE, key);
    }
}
export default class UpdateDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.PUT, undefined, values);
    }
}
export default class GetDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET, key);
    }
}
export default class GetAllDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET_ALL);
    }
}
export default class CursorDAO extends DAO {
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    constructor(columns, limit, start) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR, undefined, undefined, columns, limit, start);
    }
}
export default class CursorUpdateDAO extends DAO {
    /**
     * 
     * @param {Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newValues = values;
    }
}
export default class CursorDeleteDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newAction = ACTION.DELETE;
    }
}