
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
storeNames.forEach((store) => {
    fetch('/stores/' + store.name + '.json').then(response => response.json()).then(data => {
        stores.push(data);
        console.log(stores);
        if (storeNames.length == stores.length) {
            setup();
        }
    }).catch(error => {
        console.error(error);
    });
})

function setup() {
    fetch('/db.json').then(database => {
        database.stores = stores;
        DB.setup(database).then(_ => {
            query();
        });
    }).catch(error => {
        console.error(error);
    });
}

function query() {
    //STORE
    DB.getInst()[dbName].customers.get().then(result => console.log(result));
    DB.getInst()[dbName].customers.get(['customerName', 'city']).then(result => console.log(result));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result));
    DB.getInst()[dbName].customers.getDist('city', 5).then(result => console.log(result)); //limit = 5;
    DB.getInst()[dbName].customers.getDist('city', 5, 5).then(result => console.log(result)); //limit = 5, start = 5;
    //INDEXES
    DB.getInst()[dbName].customers.country.equal('Mexico').get(['customerName', 'City']);
    DB.getInst()[dbName].customers.country.startsWith('Mex').get(['customerName', 'City']);
    DB.getInst()[dbName].customers.country.endsWith('il').get(['customerName', 'City']);

    DB.getInst()[dbName].customers.customerId.greaterThan(1).get();
    DB.getInst()[dbName].customers.customerId.lesserThan(1).get();
    DB.getInst()[dbName].customers.customerId.greaterThanOrEqual(1).get();
    DB.getInst()[dbName].customers.customerId.lesserThanOrEqual(1).get();
    DB.getInst()[dbName].customers.customerId.between(1, 2).get();



    /**
     * ADD /UPDATE
     */
    // -----STORE
    DB.getInst()[dbName].customers.add(obj);
    DB.getInst()[dbName].customers.update(keyId, obj);

    // -----INDEXES
    DB.getInst()[dbName].customers.customerId.equal(1).update(obj);

    /**
     * DELETE
     */
    // -----STORE
    DB.getInst()[dbName].customers.clear();
    DB.getInst()[dbName].customers.count();
    // -----INDEXES
    DB.getInst()[dbName].customers.customerName.equal('Alfreds Futterkiste').delete();

    /**
     * COLLECT
     */
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.count()));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.avg('price')));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.min('price')));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.max('price')));


    /**
     * VERSION 2.0
     */

    // DB.getInst()[dbName].customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']);
    // DB.getInst()[dbName].customers.country.equal('Mexico').or.city.equal('Berlin').get(['customerName','City']);
    // DB.getInst()[dbName].customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']).orderBy({'country':'DESC','customerName':'ASC'});
    // DB.getInst()[dbName].customers.update({    "country": "Mexico"}, obj);
    // DB.getInst()[dbName].persons.address.isNoNull().get(['lastName']);
}    
