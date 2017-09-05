class DB {
    constructor() {
        this.xDB;
        this.DBs = {};
    }

    setDB(name, _) {
        this.DBs[name] = _;
    }

    getDB(name) {
        return this.DBs[name];
    }

    static getInst() {
        if (!this.xDB) {
            this.xDB = new DB();
        }
        return this.xDB;
    }

    static setup(xDBEntity) {
        if (!(xDBEntity instanceof DBEntity)) {
            xDBEntity = DBEntity.fromJSON(xDBEntity);
        }
        return new Promise((resolve, reject) => {
            new DBConfig().conifg(xDBEntity).then(_ => {
                this.getInst().setDB(xDBEntity.databaseName, _);
                resolve(this.getInst()[xDBEntity.databaseName] = new DBDAO(xDBEntity));
            }).catch(error => reject(error));
        })
    }
}