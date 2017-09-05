class CommonEntity {
    setter(value, key, mandatory = false, type_of = "string") {
        if (typeof value === type_of) {
            this[key] = value;
        } else if (mandatory && !Utils.isAvail(value)) {
            this.error(key, value);
        }
    }

    error(key, value) {
        throw new Error(this.constructor.name + ' : ' + key + ' is ' + value);
    }
}