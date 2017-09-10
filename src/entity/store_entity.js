class StoreEntity extends CommonEntity {

    constructor(name, keyPath, indexes, autoIncrement = true, type = 'string') {
        super();
        this.autoIncrement = autoIncrement;
        this.setter(name, "name", true);
        this.setter(keyPath, "keyPath", true);
        this.type = type;
        this.setIndexes = indexes;
    }

    set setIndexes(indexes) {
        this.indexes = [];
        if (typeof indexes === 'object' && indexes instanceof Array) {
            indexes.forEach(index => {
                if (!(index instanceof IndexEntity)) {
                    index = IndexEntity.fromJSON(index);
                }
                this.indexes.push(index);
            });
        } else if (indexes !== undefined) {
            this.error('indexes', indexes);
        }
    }

    static fromJSON(json) {
        return new StoreEntity(json.name, json.keyPath, json.indexes, json.autoIncrement, json.type);
    }
}