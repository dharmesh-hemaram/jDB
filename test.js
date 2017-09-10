//[MODEL] DB.getInst().getDB('testDB').transaction('customers','readonly').objectStore('customers').getAll().onsuccess = x => console.log(x);
//DB.getInst().getDB('testDB').transaction('customers','readonly').objectStore('customers').getAll(IDBKeyRange.bound(1,2)).onsuccess = x => console.log(x.target.result);
/**
 * VERSION 1.0
 */

/**
 * GET
 */
//STORE
DB.getInst().testDB.customers.get().then(result => console.log(result));
DB.getInst().testDB.customers.get(['customerName', 'city']).then(result => console.log(result));
DB.getInst().testDB.customers.getDist('city').then(result => console.log(result));
DB.getInst().testDB.customers.getDist('city', 5).then(result => console.log(result)); //limit = 5;
DB.getInst().testDB.customers.getDist('city', 5, 5).then(result => console.log(result)); //limit = 5, start = 5;
//INDEXES
DB.getInst().testDB.customers.country.equal('Mexico').get(['customerName', 'City']);
DB.getInst().testDB.customers.country.startsWith('Mex').get(['customerName', 'City']);
DB.getInst().testDB.customers.country.endsWith('il').get(['customerName', 'City']);

DB.getInst().testDB.customers.customerId.greaterThan(1).get();
DB.getInst().testDB.customers.customerId.lesserThan(1).get();
DB.getInst().testDB.customers.customerId.greaterThanOrEqual(1).get();
DB.getInst().testDB.customers.customerId.lesserThanOrEqual(1).get();
DB.getInst().testDB.customers.customerId.between(1,2).get();



/**
 * ADD /UPDATE
 */
// -----STORE
DB.getInst().testDB.customers.add(obj);
DB.getInst().testDB.customers.update(keyId, obj);

// -----INDEXES
DB.getInst().testDB.customers.customerId.equal(1).update(obj);

/**
 * DELETE
 */
// -----STORE
DB.getInst().testDB.customers.clear();
DB.getInst().testDB.customers.count();
// -----INDEXES
DB.getInst().testDB.customers.customerName.equal('Alfreds Futterkiste').delete();

/**
 * COLLECT
 */
DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.count()));
DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.avg('price')));
DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.min('price')));
DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.max('price')));


/**
 * VERSION 2.0
 */

// DB.getInst().testDB.customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']);
// DB.getInst().testDB.customers.country.equal('Mexico').or.city.equal('Berlin').get(['customerName','City']);
// DB.getInst().testDB.customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']).orderBy({'country':'DESC','customerName':'ASC'});
// DB.getInst().testDB.customers.update({    "country": "Mexico"}, obj);
// DB.getInst().testDB.persons.address.isNoNull().get(['lastName']);