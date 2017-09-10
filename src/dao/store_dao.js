class StoreDAO extends CommonDAO {

    constructor(databaseName, xStoreEntity) {
        super(databaseName, xStoreEntity);
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new NIndexDAO(databaseName, xStoreEntity, xIndexEntity);
            } else {
                xIndexDAO = new IndexDAO(databaseName, xStoreEntity, xIndexEntity);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });

        let keyPathEntity = new IndexEntity(xStoreEntity.name, true, false, false, xStoreEntity.type);
        if (xStoreEntity.type === "number") {
            this[xStoreEntity.keyPath] = new NKeyPathDAO(databaseName, xStoreEntity, keyPathEntity);
        } else {
            this[xStoreEntity.keyPath] = new KeyPathDAO(databaseName, xStoreEntity, keyPathEntity);
        }
    }

    add(values) {
        if (values instanceof Array) {
            return new Promise((resolve, reject) => {
                let bulk = {};
                bulk.index = 0;
                bulk.values = values;
                this._bulkAdd(bulk, resolve, reject);
            });
        } else {
            return this._action(new AddDAO(values));
        }
    }

    _bulkAdd(bulk, resolve, reject) {
        if (bulk.index < bulk.values.length) {
            this._action(new AddDAO(bulk.values[bulk.index])).then(event => {
                bulk.index++;
                this._bulkAdd(bulk, resolve, reject);
            }).catch(event => {
                reject(event, bulk.values[bulk.index]);
            })
        } else {
            resolve(bulk.index);
        }
    }

    clear() {
        return this._action(new ClearDAO());
    }

    count() {
        return this._action(new CountDAO());
    }

    delete(key) {
        return this._action(new DeleteDAO(key));
    }

    /**
     * 
     * @param {String|Number} key 
     * @param {Object} values 
     */
    update(key, values) {
        values[this.xStoreEntity.keyPath] = key;
        return this._action(new UpdateDAO(values));
    }
}