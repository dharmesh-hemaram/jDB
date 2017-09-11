// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
class DBConfig {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    conifg(xDBEntity) {
        return new Promise((resolve, reject) => {
            let req = indexedDB.open(xDBEntity.databaseName, xDBEntity.version);
            req.onupgradeneeded = event => {
                xDBEntity.stores.forEach(xStore => {
                    this.createStore(event.target.result, xStore);
                });
                event.target.result.onversionchange = event => {
                    event.target.result.close();
                    alert("A new version of this page is ready. Please reload!");
                };
            };
            req.onblocked = event => {
                alert("Please close all other tabs with this site open!");
            };
            req.onsuccess = event => {
                resolve(event.target.result);
            };
            req.onerror = event => {
                reject(event.target.error);
            }
        });
    }
    /**
     * 
     * @param {IDBDatabase} _ 
     * @param {IDBObjectStore} xStore 
     */
    createStore(_, xStore) {
        if (_.objectStoreNames.contains(xStore.name)) {
            _.deleteObjectStore(xStore.name);
        }
        let storeInst = _.createObjectStore(xStore.name, { "keyPath": xStore.keyPath, "autoIncrement": xStore.autoIncrement });
        xStore.indexes.forEach(xIndexEntity => {
            storeInst.createIndex(xIndexEntity.name, xIndexEntity.name, { unique: xIndexEntity.unique, multiEntry: xIndexEntity.multiEntry });
        });
    } 
}