
class IndexDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity, xIndexEntity, xPromise) {
        super(databaseName, xStoreEntity.name);
        this.xStoreEntity = xStoreEntity;
        this.xIndexEntity = xIndexEntity;
        this.xPromise = xPromise;
    }

    equalDist(value) {
        return this._action(ACTION.GET, ACCESS.READ_ONLY, value);
    }

    equal(value) {
        return this._action(ACTION.GET_ALL, ACCESS.READ_ONLY, value);
    }

    startsWith(value) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value, value + '\uffff'), value, 'startsWith');
    }

    endsWith(value) {
        throw new Error('Under implementation');
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value, value), value, 'endsWith');
    }

    like(value) {
        throw new Error('Under implementation');
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value[0], value[value.length - 1]), value, 'find');
    }

    _action(action, access, params, value, query) {
        return new XPromise((resolve, reject) => {
            try {
                let cursorResult = new Collection();
                let req = this.objectStore(access).index(this.xIndexEntity.name)[action](params);
                req.onsuccess = event => {
                    if (action === ACTION.CURSOR) { //Cursor
                        let cursor = event.target.result;
                        if (cursor) {
                            cursorResult.push(cursor.value);
                            cursor.continue();
                        } else {
                            this._onsuccess(cursorResult, resolve);
                        }
                    } else {
                        this._onsuccess(event.target.result, resolve);
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

    _onsuccess(result, resolve) {
        if (this.xPromise) {
            this.xPromise.then(values => {
                let response = new Collection();
                if (values instanceof Array) {
                    response = response.concat(values);
                    if (result instanceof Array) {
                        response = response.concat(result);
                    } else {
                        response.push(result);
                    }
                } else {
                    response.push(values);
                    if (result instanceof Array) {
                        response = response.concat(result);
                    } else {
                        response.push(result);
                    }
                }
                resolve(response);
            }).catch(error => {
                throw new Error(error);
            })
        } else {
            resolve(result);
        }
    }
}

class NIndexDAO extends IndexDAO {
    constructor(databaseName, storeName, xIndexEntity, xPromise) {
        super(databaseName, storeName, xIndexEntity, xPromise);
    }
    greaterThan(value) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.lowerBound(value, true), value, undefined);
    }
    lesserThan(value) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.upperBound(value, true), value, undefined);
    }
    greaterThanOrEqual(value) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.lowerBound(value, false), value, undefined);
    }
    lesserThanOrEqual(value) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.upperBound(value, false), value, undefined);
    }
    between(start, end) {
        return this._action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(start, end));
    }
}
