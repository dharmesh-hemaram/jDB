import { Utils } from '@dharmesh-hemaram/jUtils';


export default class Collection {
    constructor() {
        this.arr = new Array();
    }
    /**
     * 
     * @param {Boolean} distinct 
     */
    setDistinct(distinct) {
        this.distinct = distinct;
    }
    /**
     * 
     * @param {Object} value 
     */
    push(value) {
        if (this.distinct && this.arr.indexOf(value) !== -1) {
            return;
        }
        this.arr.push(value)
    }
    count() {
        return this.arr.length;
    }
    /**
     * 
     * @param {String} column 
     */
    avg(column) {
        if (!(Utils.isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let avg = 0;
        this.arr.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (Utils.isAvail(value)) {
                avg += Number(value);
            }
        });
        return avg / this.arr.length;
    }
    /**
     * 
     * @param {String} column 
     */
    min(column) {
        if (!(Utils.isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let min;
        this.arr.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!min || min > value) {
                min = value;
            }
        });
        return min;
    }
    /**
     * 
     * @param {String} column 
     */
    max(column) {
        if (!(Utils.isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let max;
        this.arr.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!max || max < value) {
                max = value;
            }
        });
        return max;
    }

    concat(values) {
        this.arr = this.arr.concat(values);
        return this;
    }
}