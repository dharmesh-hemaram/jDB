class And {
    constructor(promise, store) {
        for (let index in store.indexes) {
            this[store.indexes[index].name] = new AndFilter(promise, store.indexes[index].name);
        }
    }
}