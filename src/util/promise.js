class XPromise extends Promise {
    constructor(executor, store) {
        super(executor);
        if (store) {
            this.and = new And(this, store);
            this.or = new Or(this, store);
        }
    }
}