class Collection extends Array {
    constructor() {
        super();
    }

    setDistinct(distinct) {
        this.distinct = distinct;
    }

    push(value) {
        if (this.distinct && this.indexOf(value) !== -1) {
            return;
        }
        super.push(value)
    }

    count() {
        return this.length;
    }
}