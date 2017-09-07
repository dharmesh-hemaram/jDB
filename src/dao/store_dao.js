class StoreDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity, filter, operator) {
        super(databaseName, xStoreEntity.name);
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity, filter, operator);
            } else {
                xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity, filter, operator);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });
        //this[xStoreEntity.name] = new KeyPathDAO(databaseName, xStoreEntity);
        this.xStoreEntity = xStoreEntity;
    }

    add(values) {
        if (values instanceof Array) {
            return new Promise((resolve, reject) => {
                let bulk = {};
                bulk.index = 0;
                bulk.values = values;
                this._bulkAdd(bulk, resolve, reject);
            });
        } else {
            return this._action(ACTION.ADD, ACCESS.READ_WRITE, values);
        }
    }

    _bulkAdd(bulk, resolve, reject) {
        if (bulk.index < bulk.values.length) {
            this._action(ACTION.ADD, ACCESS.READ_WRITE, bulk.values[bulk.index]).then(event => {
                bulk.index++;
                this._bulkAdd(bulk, resolve, reject);
            }).catch(event => {
                reject(event, bulk.values[bulk.index]);
            })
        } else {
            resolve(bulk.index);
        }
    }



    update(indexes, values) {
        return this._action(ACTION.GET, ACCESS.READ_WRITE, values, indexes);
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

    _action(action, access, values, indexes, distinct) {
        return new Promise((resolve, reject) => {
            try {

                if (action === ACTION.ADD) {
                    this._check(this.xStoreEntity, values, reject);
                }

                let cursorResult = new Collection();
                cursorResult.setDistinct(distinct);
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

    _update(event, indexes, values, resolve, reject) {
        var dbValue = event.target.result;
        Object.assign(dbValue, indexes);
        let req = this._store[ACTION.PUT](dbValue, values);
        req.onsuccess = event => {
            resolve(event.target.result);
        };
        req.onerror = event => {
            reject(event.target.error);
        };
    }
}