class AndFilter {
    constructor(promise, index) {
        this._p = promise;
        this.index = index;
    }

    contains(filterValue) {
        let contains = (value) => {
            let indexValue = value[this.index];
            if (indexValue instanceof Array) {
                return this._array(indexValue);
            } else {
                return this._object(indexValue);
            }
        };
        return this.filter(filterValue, contains);
    }

    filter(filterValue, filterFunc) {
        this.filterValue = filterValue;
        return new Promise((resolve, reject) => {
            this._p.then(values => {
                let result = values.filter(filterFunc);
                resolve(result);
            }).catch(error => {
                reject(error);
            })
        });
    }

    _array(indexValue) {
        let isAvail = false;
        indexValue.forEach(element => {
            if (this._object(element)) {
                isAvail = true;
            }
        });
        return isAvail;
    }

    _object(indexValue) {
        if (indexValue.indexOf(this.filterValue) !== -1) {
            return true;
        }
        return false;
    }


}