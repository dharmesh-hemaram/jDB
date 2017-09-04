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