import DBDAO from './dao/db-dao';
import DBEntity from './entity/db-entity';
import Config from './config';

export default class DB {
    constructor() {
        this.xDB;
        this.DBs = {};
        // In the following line, you should include the prefixes of implementations you want to test.
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        // DON'T use "var indexedDB = ..." if you're not in a function.
        // Moreover, you may need references to some window.IDB* objects:
        this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
            READ_WRITE: "readwrite"
        };
        // This line should only be needed if it is needed to support the object's constants for older browsers
        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    }
    /**
     * 
     * @param {String} name 
     * @param {IDBDatabase } _ 
     */
    setDB(name, _) {
        this.DBs[name] = _;
    }
    /**
     * 
     * @param {String} name 
     */
    getDB(name) {
        return this.DBs[name];
    }

    static getInst() {
        if (!this.xDB) {
            this.xDB = new DB();
        }
        return this.xDB;
    }
    /**
     * 
     * @param {DBEntity|Object} xDBEntity 
     * 
     */
    static setup(xDBEntity) {
        if (!(xDBEntity instanceof DBEntity)) {
            xDBEntity = DBEntity.fromJSON(xDBEntity);
        }
        return new Promise((resolve, reject) => {
            new Config().conifg(xDBEntity).then(_ => {
                this.getInst().setDB(xDBEntity.databaseName, _);
                resolve(this.getInst()[xDBEntity.databaseName] = new DBDAO(xDBEntity));
            }).catch(error => reject(error));
        })
    }
}