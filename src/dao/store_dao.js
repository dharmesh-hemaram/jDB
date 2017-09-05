class StoreDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity) {
        super(databaseName, xStoreEntity.name);
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity);
            } else {
                xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });
        this.xStoreEntity = xStoreEntity;
    }

    add(value) {
        if (value instanceof Array) {
            return new Promise((resolve, reject) => {
                let bulk = {};
                bulk.index = 0;
                bulk.value = value;
                this._bulkAdd(bulk, resolve, reject);
            });
        } else {
            return this._action(ACTION.ADD, ACCESS.READ_WRITE, value);
        }
    }

    _bulkAdd(bulk, resolve, reject) {
        if (bulk.index < bulk.value.length) {
            this._action(ACTION.ADD, ACCESS.READ_WRITE, bulk.value[bulk.index]).then(event => {
                bulk.index++;
                this._bulkAdd(bulk, resolve, reject);
            }).catch(event => {
                reject(event, bulk.value[bulk.index]);
            })
        } else {
            resolve(bulk.index);
        }
    }

    get(id) {
        if (id !== undefined) {
            return this._action(ACTION.GET, ACCESS.READ_ONLY, id);
        } else {
            return getAll();
        }

    }

    getAll() {
        if (IDBObjectStore.prototype.getAll) {
            return this._action(ACTION.GET_ALL, ACCESS.READ_ONLY, undefined);
        } else {
            console.info('getAll API is not supported by browser');
            return this._getCursor();
        }
    }

    _getCursor() {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, undefined);
    }

    update(id, value) {
        return this._action(ACTION.GET, ACCESS.READ_WRITE, id, value);
    }

    clear() {
        return this._action(ACTION.CLEAR, ACCESS.READ_WRITE);
    }

    count() {
        return this._action(ACTION.COUNT, ACCESS.READ_WRITE);
    }


    delete(id) {
        return this._action(ACTION.DELETE, ACCESS.READ_WRITE, id);
    }

    _action(action, access, params, value) {
        return new XPromise((resolve, reject) => {
            try {
                let cursorResult = [];
                let req = this.objectStore(access)[action](params);
                req.onsuccess = event => {
                    if (action === ACTION.CURSOR) { //Cursor
                        let cursor = event.target.result;
                        if (cursor) {
                            cursorResult.push(cursor.value);
                            cursor.continue();
                        } else {
                            resolve(cursorResult);
                        }
                    } else if (value !== undefined) { //Update Case
                        if (event.target.result) {
                            this._update(event, value, params, resolve, reject);
                        } else {
                            reject('No record found with key:' + params);
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
        }, this.databaseName, this.xStoreEntity);
    }

    _update(event, value, params, resolve, reject) {
        var dbValue = event.target.result;
        Object.assign(dbValue, value);
        let req = this._store[ACTION.PUT](dbValue, params);
        req.onsuccess = event => {
            resolve(event.target.result);
        };
        req.onerror = event => {
            reject(event.target.error);
        };
    }
}