class AndFilter {
    constructor(xPromise, databaseName, xStoreEntity, index) {
        this._p = xPromise;
        this.index = index;
        this.databaseName = databaseName;
        this.xStoreEntity = xStoreEntity;
    }

    like(filter) {
        let like = (indexValue) => {
            if (typeof indexValue === 'string') {
                if (indexValue.indexOf(this.filter) !== -1) {
                    return true;
                }
            } else if (typeof indexValue === 'number') {
                if (Number(this.filter) === NaN) {
                    throw new Error('value is of type number');
                }
                if (indexValue === Number(this.filter)) {
                    return true;
                }
            } else {
                throw new Error('Object not yet supported');
            }
            return false;
        };
        return this._action(filter, like);
    }

    equal(filter) {
        let equal = (indexValue) => {
            if (typeof indexValue === 'string') {
                if (indexValue === String(this.filter)) {
                    return true;
                }
            } else if (typeof indexValue === 'number') {
                if (Number(this.filter) === NaN) {
                    throw new Error('value is of type number');
                }
                if (indexValue === Number(this.filter)) {
                    return true;
                }
            } else {
                throw new Error('Object not yet supported');
            }
            return false;
        };
        return this._action(filter, equal);
    }

    equalDist(filter) {
        this.isEqualDist = true;
        let equal = (indexValue) => {
            if (typeof indexValue === 'string') {
                if (indexValue === String(this.filter)) {
                    return true;
                }
            } else if (typeof indexValue === 'number') {
                if (Number(this.filter) === NaN) {
                    throw new Error('value is of type number');
                }
                if (indexValue === Number(this.filter)) {
                    return true;
                }
            } else {
                throw new Error('Object not yet supported');
            }
            return false;
        };
        return this._action(filter, equal);
    }

    startsWith(filter) {
        let startsWith = (indexValue) => {
            if (typeof indexValue === 'string') {
                if (indexValue.startsWith(String(this.filter))) {
                    return true;
                }
            } else {
                throw new Error('Object & Number not yet supported');
            }
            return false;
        };
        return this._action(filter, startsWith);
    }

    endsWith(filter) {
        let endsWith = (indexValue) => {
            if (typeof indexValue === 'string') {
                if (indexValue.endsWith(String(this.filter))) {
                    return true;
                }
            } else {
                throw new Error('Object & Number not yet supported');
            }
            return false;
        };
        return this._action(filter, endsWith);
    }

    _action(filter, action) {
        this.filter = filter;
        return new XPromise((resolve, reject) => {
            this._p.then(result => {
                let filterResult = result.filter((value) => {
                    let indexValue = value[this.index];
                    if (indexValue instanceof Array) {
                        return this._array(indexValue, action);
                    } else {
                        return action(indexValue);
                    }
                });
                if (this.isEqualDist) {
                    this.isEqualDist = undefined;
                    if (filterResult instanceof Array) {
                        filterResult = result[0];
                    }
                }
                resolve(filterResult);
            }).catch(error => {
                this.isEqualDist = undefined;
                reject(error);
            })
        }, this.databaseName, this.xStoreEntity);
    }

    _array(indexValues, action) {
        let isAvail = false;
        indexValues.forEach(indexValue => {
            if (action(indexValue)) {
                isAvail = true;
            }
        });
        return isAvail;
    }
}

class NAndFilter extends AndFilter {
    constructor(xPromise, databaseName, xStoreEntity, index) {
        super(xPromise, databaseName, xStoreEntity, index);
        this.multiFilter = (indexValue) => {
            if (typeof indexValue === 'number') {
                let result = false;
                switch (this.filterType) {
                    case 'greaterThan':
                        if (indexValue > Number(this.filter)) {
                            result = true;
                        }
                        break;
                    case 'greaterThanOrEqual':
                        if (indexValue >= Number(this.filter)) {
                            result = true;
                        }
                        break;
                    case 'lesserThan':
                        if (indexValue < Number(this.filter)) {
                            result = true;
                        }
                        break;
                    case 'lesserThanOrEqual':
                        if (indexValue <= Number(this.filter)) {
                            result = true;
                        }
                        break;
                    case 'between':
                        if (indexValue <= Number(this.filter) || indexValue > Number(this.end)) {
                            result = true;
                        }
                        break;
                    case 'in':
                        if (this.filter instanceof Array) {
                            if (this.filter.indexOf(indexValue) !== -1) {
                                result = true;
                            }
                        } else {
                            throw new Error('filter should be of type Array');
                        }
                        break;
                    default:
                        throw new Error('Not yet supported');
                }
                return result;

            } else {
                throw new Error('Object & Number not yet supported');
            }
            return false;
        }
    }

    greaterThan(filter) {
        this.filterType = 'greaterThan';
        return this._action(filter, this.multiFilter);
    }

    lesserThan(filter) {
        this.filterType = 'lesserThan';
        return this._action(filter, this.multiFilter);
    }

    greaterThanOrEqual(filter) {
        this.filterType = 'greaterThanOrEqual';
        return this._action(filter, this.multiFilter);
    }

    lesserThanOrEqual(filter) {
        this.filterType = 'lesserThanOrEqual';
        return this._action(filter, this.multiFilter);
    }

    between(start, end) {
        this.filterType = 'between';
        return this._action(start, this.multiFilter, end);
    }

    in(array) {
        this.filterType = 'in'
        return this._action(array, this.multiFilter);
    }

}