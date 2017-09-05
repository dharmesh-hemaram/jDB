const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    CURSOR: 'openCursor',
    UPDATE: 'put',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};

const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};

class CommonDAO {
    constructor(databaseName, storeName) {
        this.databaseName = databaseName;
        this.storeName = storeName;
    }

    getDB() {
        return DB.getInst().getDB(this.databaseName);
    }

    objectStore(access) {
        if (!this.storeName) {
            throw new Error('Store is not defined');
        }
        let trans = this.getDB().transaction([this.storeName], access);
        trans.oncomplete = function (event) {
            //console.info(event.target.result);
        };
        trans.onerror = function (event) {
            //console.error(event.target.error);
        };
        return trans.objectStore(this.storeName);
    }
}