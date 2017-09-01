// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};

class DB {
    constructor(databaseName, version, stores) {
        this.setDatabaseName = databaseName;
        this.setVersion = version;
        this.setStores = stores;
        this.isReady = false;
        this.create().then(_ => {
            this._ = _;
            this.isReady = true;
        }).catch(error => this.error = error);
    }

    set setDatabaseName(databaseName) {
        Utils.setter.call(this, databaseName, "_databaseName", "string", true);
    }

    set setVersion(version) {
        Utils.setter.call(this, version, "_version", "number", true);
    }

    set setStores(stores) {
        if (typeof stores === 'object' && stores instanceof Array) {
            stores.forEach(index => {
                if (!(index instanceof Store)) {
                    this[index.name] = Store.fromJSON(index);
                } else {
                    this[index.name] = index;
                }
            });
        } else if (stores !== undefined) {
            Utils.error('stores', stores);
        }
    }

    static fromJSON(json) {
        return new DB(json.databaseName, json.version, json.stores);
    }

    create() {
        return new Promise((resolve, reject) => {
            let _request = indexedDB.open(this._databaseName, this._version);
            _request.onupgradeneeded = event => {
                Object.keys(this).filter(key => this[key] instanceof Store).forEach(store => {
                    this[store].createStore(event.target.result)
                });
                event.target.result.onversionchange = event => {
                    event.target.result.close();
                    alert("A new version of this page is ready. Please reload!");
                };
            };
            _request.onblocked = event => {
                // If some other tab is loaded with the database, then it needs to be closed
                // before we can proceed.
                alert("Please close all other tabs with this site open!");
            };
            _request.onsuccess = event => {
                Object.keys(this).filter(key => this[key] instanceof Store).forEach(store => {
                    this[store]._ = event.target.result;
                });
                resolve(event.target.result);
            };
            _request.onerror = event => {
                reject(event.target.error);
            }
        });
    }

    delete() {
        if (!this.isReady) {
            throw new Error('Database is not ready');
        }
        return new Promise((resolve, reject) => {
            this._.close();
            let _request = indexedDB.deleteDatabase(this._databaseName);
            _request.onsuccess = (event) => {
                resolve('Database deleted Successfully');
            };
            _request.onerror = (event) => {
                reject(event.target.error);
            }
        });
    }

    getDB(databaseName) {
        return new Promise((resolve, reject) => {
            //get db from cache
            if (this.DBs[databaseName]) {
                resolve(this.DBs[databaseName]);
            } else {
                reject('Database not created yet');
            }
        });
    }
}