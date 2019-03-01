let dbName = 'jDB';
let storeNames = [{
    "name": "categories"
}, {
    "name": "customers"
}, {
    "name": "employees"
}, {
    "name": "orderDetails"
}, {
    "name": "orders"
}, {
    "name": "products"
}, {
    "name": "shippers"
}, {
    "name": "suppliers"
}];
let stores = [];
describe("<< [DBConfig]", function () {
    it("[load Stores] >>", function (done) {
        storeNames.forEach((store) => {
            fetch('base/assets/stores/' + store.name + '.json').then(response => response.json()).then(data => {
                stores.push(data);
                if (storeNames.length == stores.length) {
                    done();
                }
            }).catch(error => {
                fail(error);
                done();
            });
        })
    });
    describe('setup', function () {
        it("[setup] >>", function (done) {
            fetch('base/assets/db.json').then(response => response.json()).then(database => {
                database.stores = stores;
                DB.setup(database).then(_ => {
                    expect(_.error).not.toBeDefined();
                    done();
                });
            }).catch(error => {
                fail(error);
                done();
            });
        });
    });
});