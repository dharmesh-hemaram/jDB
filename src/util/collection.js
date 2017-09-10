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

    avg(column) {
        if (!Utils.isAvail(column) && typeof column === 'string') {
            throw new Error('Please provide column to find min')
        }
        let avg = 0;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (Utils.isAvail(value)) {
                avg += Number(value);
            }
        });
        return avg / this.length;
    }

    min(column) {
        if (!Utils.isAvail(column) && typeof column === 'string') {
            throw new Error('Please provide column to find min')
        }
        let min;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!min || min > value) {
                min = value;
            }
        });
        return min;
    }

    max(column) {

        if (!Utils.isAvail(column) && typeof column === 'string') {
            throw new Error('Please provide column to find min')
        }
        let max;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!max || max < value) {
                max = value;
            }
        });
        return max;
    }
}