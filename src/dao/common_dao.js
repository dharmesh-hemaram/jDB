const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    CURSOR: 'openCursor',
    UPDATE: 'put',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};

const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};

class CommonDAO {
    constructor(databaseName, storeName) {
        this.databaseName = databaseName;
        if (storeName) {
            this.storeName = storeName;
        }
    }

    getDB() {
        return DB.getInst().getDB(this.databaseName);
    }

    objectStore(access) {
        if (!this.storeName) {
            throw new Error('Store is not defined');
        }
        let trans = this.getDB().transaction([this.storeName], access);
        trans.oncomplete = function (event) {
            //console.info(event.target.result);
        };
        trans.onerror = function (event) {
            //console.error(event.target.error);
        };
        return trans.objectStore(this.storeName);
    }

    _check(entity, value, reject) {
        if (!entity.autoIncrement && !value[entity.keyPath]) {
            reject(entity.keyPath + ' is not defined in ' + entity.name);
        }
        entity.indexes.forEach((index) => {
            if (index.nullable === false && !value[index.name]) {
                reject(index.name + ' is not defined in ' + entity.name);
            }
        });
        return true;
    }

    get(indexes) {
        if (IDBObjectStore.prototype.getAll && indexes === undefined) {
            return this._action(ACTION.GET_ALL, ACCESS.READ_ONLY, undefined);
        } else {
            if (!(indexes instanceof Array)) {
                indexes = [indexes];
            }
            return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, undefined, indexes);
        }
    }

    getDist(index) {
        if (!(Utils.isAvail(index) && typeof index === "string")) {
            throw new ReferenceError(index + ' is either not defined or not typeof string');
        }
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, undefined, [index], true);
    }

    _action(action, access, values, indexes, distinct) {
        return new Promise((resolve, reject) => {
            try {
                if (action === ACTION.ADD) {
                    this._check(this.xStoreEntity, values, reject);
                }
                let cursorResult = new Collection();
                cursorResult.setDistinct(distinct);

                console.log(this.filter);

                let req = this.objectStore(access)[action](values);
                req.onsuccess = event => {
                    if (action === ACTION.CURSOR) { //Cursor
                        let cursor = event.target.result;
                        if (cursor) {
                            let result = {};
                            if (indexes.length === 1 && cursor.value[indexes[0]]) {
                                result = cursor.value[indexes[0]];
                            } else {
                                indexes.forEach((index) => {
                                    if (cursor.value[index]) {
                                        result[index] = cursor.value[index];
                                    }
                                });
                            }
                            cursorResult.push(result);;
                            cursor.continue();
                        } else {
                            resolve(cursorResult);
                        }
                    } else if (indexes !== undefined) { //Update Case
                        if (event.target.result) {
                            this._update(event, indexes, values, resolve, reject);
                        } else {
                            reject('No record found with key:' + values);
                        }
                    } else {
                        resolve(event.target.result);
                    }
                };
                req.onerror = event => {
                    reject(event.target.error);
                };
            } catch (e) {
                reject(e);
            }
        });
    }
}