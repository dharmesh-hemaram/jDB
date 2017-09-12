import DBDAO from './dao/db-dao';
import Config from './config';

export default class DB {
    constructor() {
        this.xDB;
        this.DBs = {};
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