let dbName = 'test';
let tableNames = [{
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
let tables = [];
describe("<< [DBConfig]", function () {
    it("[load tables] >>", function (done) {
        tableNames.forEach((table) => {
            fetch('base/assets/tables/' + table.name + '.json').then(response => response.json()).then(data => {
                tables.push(data);
                if (tableNames.length == tables.length) {
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
                database.tables = tables;
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