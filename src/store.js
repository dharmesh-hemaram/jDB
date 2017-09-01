const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    UPDATE: 'put',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};


class StoreIndex {
    constructor(name, unique = false) {
        this.setName = name;
        this._unique = unique;
    }

    set setName(name) {
        if (typeof name === 'string') {
            this._name = name;
        } else {
            throw new Error(this.constructor.name + ' :name should be String')
        }
    }

    static fromJSON(json) {
        return new StoreIndex(json.name, json.unique);
    }
}

class Store {

    constructor(name, keyPath, indexes, autoIncrement = true) {
        this._autoIncrement = autoIncrement;
        this._indexes = [];
        this._;
        this.setName = name;
        this.setKeyPath = keyPath;
        this.setIndexes = indexes;
    }

    set setName(name) {
        Utils.setter.call(this, name, "_name", "string", true);
    }

    set setKeyPath(keyPath) {
        Utils.setter.call(this, keyPath, "_keyPath", "string", false);
    }

    set setIndexes(indexes) {
        if (typeof indexes === 'object' && indexes instanceof Array) {
            indexes.forEach(index => {
                if (!(index instanceof StoreIndex)) {
                    this._indexes.push(StoreIndex.fromJSON(index));
                } else {
                    this._indexes.push(index);
                }
            });
        } else if (indexes !== undefined) {
            Utils.error('indexes', indexes);
        }
    }

    createStore(_db) {
        this._ = _db;
        if (_db.objectStoreNames.contains(this._name)) {
            _db.deleteObjectStore(this._name);
        }
        this._storeInst = _db.createObjectStore(this._name, { "keyPath": this._keyPath, "autoIncrement": this._autoIncrement });
        this._indexes.forEach(index => {
            this._storeInst.createIndex(index._name, index._name, { unique: index._unique });
        });
    }

    clear() {
        return this.action(ACTION.CLEAR, ACCESS.READ_WRITE);
    }

    count() {
        return this.action(ACTION.COUNT, ACCESS.READ_WRITE);
    }

    add(value) {
        return this.action(ACTION.ADD, ACCESS.READ_WRITE, value);
    }

    update(id, value) {
        return this.action(ACTION.GET, ACCESS.READ_WRITE, id, value);
    }

    put(id, value) {
        return this.action(ACTION.GET, ACCESS.READ_WRITE, id, value);
    }

    get(id) {
        return this.action(id !== undefined ? ACTION.GET : ACTION.GET_ALL, ACCESS.READ_ONLY, id);
    }

    delete(id) {
        return this.action(ACTION.DELETE, ACCESS.READ_WRITE, id);
    }

    action(action, access, params, value) {
        return new Promise((resolve, reject) => {
            try {
                let req = this.objectStore(access)[action](params);
                req.onsuccess = event => {
                    //Update Case
                    if (value !== undefined) {
                        this._update(event, value, params, resolve, reject);
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

    objectStore(access) {
        let trans = this._.transaction([this._name], access);
        trans.oncomplete = function (event) {
            //console.info(event.target.result);
        };
        trans.onerror = function (event) {
            //console.error(event.target.error);
        };
        this._store = trans.objectStore(this._name);
        return this._store;
    }

    static fromJSON(json) {
        return new Store(json.name, json.keyPath, json.indexes);
    }

    /**
     * onsuccess
     * @param {*} event 
     * @param {*} resolve 
     */
    onsuccess(event, resolve) {
        resolve(event.target.result);
    }

    /**
     * onerror
     * @param {*} event 
     * @param {*} reject 
     */
    onerror(event, reject) {
        reject(event.target.error);
    }
}