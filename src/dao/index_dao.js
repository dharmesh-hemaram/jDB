
class IndexDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity, xIndexEntity) {
        super(databaseName, xStoreEntity.name);
        this.xStoreEntity = xStoreEntity;
        this.xIndexEntity = xIndexEntity;
    }

    equalDist(value) {
        return this.action(ACTION.GET, ACCESS.READ_ONLY, value);
    }

    equal(value) {
        return this.action(ACTION.GET_ALL, ACCESS.READ_ONLY, value);
    }

    startsWith(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value, value + '\uffff'), value, 'startsWith');
    }

    endsWith(value) {
        throw new Error('Under implementation');
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value, value), value, 'endsWith');
    }

    find(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(value[0], value[value.length - 1]), value, 'find');
    }

    action(action, access, params, value, query) {
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
                            resolve(cursorResult);
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
        }, this.xStoreEntity);
    }
}

class NIndexDAO extends IndexDAO {
    constructor(databaseName, storeName, xIndexEntity) {
        super(databaseName, storeName, xIndexEntity);
    }
    greaterThan(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.lowerBound(value, true), value, undefined);
    }
    lesserThan(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.upperBound(value, true), value, undefined);
    }
    greaterThanOrEqual(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.lowerBound(value, false), value, undefined);
    }
    lesserThanOrEqual(value) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.upperBound(value, false), value, undefined);
    }
    between(start, end) {
        return this.action(ACTION.CURSOR, ACCESS.READ_ONLY, IDBKeyRange.bound(start, end));
    }
}
