const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    CURSOR: 'openCursor',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};

const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};


class DAO {
    /**
     * 
     * @param {ACCESS} access 
     * @param {Index} index 
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

    set _key(key) {
        if (Utils.isAvail(key)) {
            if (typeof key === "string" || typeof key === "number") {
                this.key = key;
            } else {
                throw new Error(key + " should be of type string | number only");
            }
        }
    }

    getDB(databaseName) {
        return DB.getInst().getDB(databaseName);
    }

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

    setFilter(filter) {
        if (filter && filter.type) {
            this.index = filter.index;
            switch (filter.type) {
                case 'equal':
                    this.values = IDBKeyRange.only(filter.values);
                    break;
                case 'startsWith':
                    this.values = IDBKeyRange.bound(filter.values, filter.values + '\uffff');
                    break;
                case 'greaterThan':
                    this.values = IDBKeyRange.lowerBound(filter.values, true);
                    break;
                case 'lesserThan':
                    this.values = IDBKeyRange.upperBound(filter.values, true);
                    break;
                case 'greaterThanOrEqual':
                    this.values = IDBKeyRange.lowerBound(filter.values, false);
                    break;
                case 'lesserThanOrEqual':
                    this.values = IDBKeyRange.upperBound(filter.values, false);
                    break;
                case 'between':
                    let bounds = filter.values.split('~');
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

class AddDAO extends DAO {
    /**
     * 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.ADD, undefined, values);
    }
}


class ClearDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CLEAR);
    }
}

class CountDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.COUNT);
    }
}

class DeleteDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_WRITE, undefined, ACTION.DELETE, key);
    }
}

class UpdateDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.PUT, undefined, values);
    }
}

class GetDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET, key);
    }
}

class GetAllDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET_ALL);
    }
}

class CursorDAO extends DAO {
    constructor(columns, limit, start) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR, undefined, undefined, columns, limit, start);
    }
}

class CursorUpdateDAO extends DAO {
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newValues = values;
    }
}

class CursorDeleteDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newAction = ACTION.DELETE;
    }
}