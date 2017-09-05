let count = 0;
let storeNames = [{ "name": "categories" }, { "name": "customers" }, { "name": "employees" }, { "name": "orderDetails" }, { "name": "orders" }, { "name": "products" }, { "name": "shippers" }, { "name": "suppliers" }];
let stores = [];
let _;
describe("DBConfig", function () {
    beforeEach(function (done) {
        storeNames.forEach((store) => {
            Utils.loadJSON('base/test/stores/' + store.name + '.json').then(data => {
                count++;
                stores.push(data);
                if (count == stores.length) {
                    done();
                }
            }).catch(error => {
                console.error(error);
                done();
            });
        })
    });

    it("setup", function (done) {
        Utils.loadJSON('base/test/db.json').then(database => {
            database.stores = stores;
            DB.setup(database).then(_ => {
                _ = _;
                expect(_.databaseName).toBeDefined();
                expect(_.databaseName).toBe(database.databaseName);
                expect(_.error).not.toBeDefined();
                done();
            });
        }).catch(error => {
            console.error(error);
            done();
        });
    });
});