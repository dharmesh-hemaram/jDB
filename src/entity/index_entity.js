class IndexEntity extends CommonEntity {
    constructor(name, unique = false, multiEntry = false, nullable = true, type = 'string') {
        super();
        this.setter(name, 'name');
        this.unique = unique;
        this.multiEntry = multiEntry;
        this.type = type;
        this.nullable = nullable;
    }

    static fromJSON(json) {
        return new IndexEntity(json.name, json.unique, json.multiEntry, json.nullable, json.type);
    }
}