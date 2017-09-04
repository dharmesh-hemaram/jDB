


class DBEntity extends CommonEntity {
    constructor(databaseName, version, stores) {
        super();
        this.setter(databaseName, "databaseName", true);
        this.setter(version, "version", true, "number");
        this.setStores = stores;
    }

    set setStores(stores) {
        this.stores = [];
        if (typeof stores === 'object' && stores instanceof Array) {
            stores.forEach(store => {
                if (!(store instanceof StoreEntity)) {
                    store = StoreEntity.fromJSON(store)
                }
                this.stores.push(store);
            });
        } else if (stores !== undefined) {
            this.error('stores', stores);
        }
    }

    static fromJSON(json) {
        return new DBEntity(json.databaseName, json.version, json.stores);
    }
}