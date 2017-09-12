export default class Config {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    conifg(xDBEntity) {
        return new Promise((resolve, reject) => {
            let req = DB.getInst().indexedDB.open(xDBEntity.databaseName, xDBEntity.version);
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