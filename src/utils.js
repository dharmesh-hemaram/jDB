class Utils {
    static isAvail(value) {
        if (value !== null && value !== undefined) {
            if (typeof value === 'string' && value.length > 0) {
                return true;
            } else if (typeof value === 'number') {
                return true;
            }
        }
        return false;
    }

    static setter(value, key, type_of = "string", mandatory = true) {
        if (this instanceof Utils.constructor) {
            throw new Error('Call like Utils.setter.call(this,value,key,type_of,mandatory)');
        }
        if (typeof value === type_of) {
            this[key] = value;
        } else if (mandatory && !Utils.isAvail(value)) {
            Utils.error.call(this, key, value);
        }
    }

    static error(key, value) {
        throw new Error(this.constructor.name + ' : ' + key + ' is ' + value);
    }

    static loadJSON(url) {
        return new Promise((resolve, reject) => {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");

            url = url ? url : "db_config.json";
            xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    resolve(xobj.responseText);
                }
            };
            xobj.send(null);
        });

    }
}