import Utils from './util/utils';
import Collection from './util/collection';

export default class CommonDAO {
    /**
     * @constructor
     * @param {String} databaseName 
     * @param {StoreEntity} xStoreEntity 
     * @param {Filter} filter 
     */
    constructor(databaseName, xStoreEntity, filter) {
        this._databaseName = databaseName;
        if (filter) {
            this._filter = filter;
        }
        if (xStoreEntity) {
            this._xStoreEntity = xStoreEntity;
        }
    }
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    get(columns, limit, start) {
        let dao;
        if (IDBObjectStore.prototype.getAll && columns === undefined) {
            dao = new GetAllDAO();
        } else {
            if (!(columns instanceof Array)) {
                columns = [columns];
            }
            dao = new CursorDAO(columns, limit, start);
        }
        return this._action(dao);
    }
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    getDist(column, limit, start) {
        if (!(Utils.isAvail(column) && typeof column === "string")) {
            throw new ReferenceError(column + ' is either not defined or not typeof string');
        }
        return this._action(new CursorDAO([column], limit, start), true);
    }
    /**
     * 
     * @param {Object} values 
     */
    update(values) {
        return this._action(new CursorUpdateDAO(values));
    }
    /**
     * 
     */
    delete() {
        return this._action(new CursorDeleteDAO());
    }
    /**
     * 
     * @param {DAO} dao 
     * @param {Boolean} distinct 
     */
    _action(dao, distinct) {
        dao.setFilter(this._filter);
        return new Promise((resolve, reject) => {
            try {
                //To check add object before inserting
                if (dao.check(this._xStoreEntity)) {
                    this._req(dao, distinct, resolve, reject);
                } else {
                    reject(dao.error);
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * 
     * @param {DAO} dao 
     * @param {Boolean} distinct 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    _req(dao, distinct, resolve, reject) {
        let objectStore = dao.objectStore(this._databaseName, this._xStoreEntity.name);
        //Create Cursor Object
        let cursorResult = new Collection();
        cursorResult.setDistinct(distinct);
        //request action
        let req = objectStore[dao.action](dao.values);
        req.onsuccess = event => {
            if (dao.action === ACTION.CURSOR) { //Cursor
                this._cursor(event, dao, cursorResult, resolve);
            } else {
                if (event.target.result instanceof Array) {
                    cursorResult = cursorResult.concat(event.target.result)
                } else {
                    cursorResult = event.target.result;
                }
                resolve(cursorResult);
            }
        };
        req.onerror = event => {
            reject(event.target.error);
        };
    }
    /**
     * 
     * @param {Object} event 
     * @param {DAO} dao 
     * @param {Array} cursorResult 
     * @param {Function} resolve 
     */
    _cursor(event, dao, cursorResult, resolve) {
        let cursor = event.target.result;
        if (dao.start) {
            cursor.advance(dao.start);
            dao.start = undefined;
        } else {
            if (cursor && (!dao.limit || cursorResult.length < dao.limit)) {
                let result = {};
                if (dao.columns) {
                    if (dao.columns.length === 1) {
                        if (cursor.value[dao.columns[0]]) {
                            result = cursor.value[dao.columns[0]];
                        }

                    } else {
                        dao.columns.forEach((column) => {
                            if (cursor.value[column]) {
                                result[column] = cursor.value[column];
                            }
                        });
                    }
                } else {
                    result = cursor.value;
                }
                if (dao.filter) {
                    let value = cursor.value[dao.filter.index];
                    if (value) {
                        switch (dao.filter.type) {
                            case 'endsWith':
                                if (!value.endsWith(dao.filter.values)) {
                                    result = undefined;
                                }
                                break;
                            default:
                                console.log(dao.filter.type + " condition is not handled");
                        }
                    }

                }
                if (result) {
                    if (dao.newValues) {
                        let updateData = Object.assign(cursor.value, dao.newValues);
                        let req = cursor.update(updateData);
                        req.onsuccess = event => {
                            cursorResult.push(event.target.result);
                        };
                        req.onerror = event => {
                            reject(event.target.error);
                        };
                    } else if (dao.newAction === ACTION.DELETE) {
                        let req = cursor.delete();
                        req.onsuccess = event => {
                            cursorResult.push(event.target.result);
                        };
                        req.onerror = event => {
                            reject(event.target.error);
                        };
                    } else {
                        cursorResult.push(result);
                    }
                }
                cursor.continue();
            } else {
                if (dao.newAction === ACTION.DELETE) {
                    cursorResult = cursorResult.length;
                }
                resolve(cursorResult);
            }
        }
    }
}