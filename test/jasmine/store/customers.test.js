describe(storeNames[1].name, function () {
    let store = storeNames[1];
    it("DB.getInst().testDB[store.name].clear()", function (done) {
        DB.getInst().testDB[store.name].clear()
            .then(result => {
                expect(result).toBeUndefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst().testDB[store.name].add(store.data)", function (done) {
        Utils.loadJSON('base/test/data/' + store.name + '.json').then(data => {
            store.data = data;
            DB.getInst().testDB[store.name].add(data)
                .then(count => {
                    expect(count).toBeDefined();
                    expect(count).toBe(store.data.length);
                    done();
                }).catch((error) => { fail(error); done(); });
        }).catch((error) => { fail(error); done();});
    });
    describe('get', function () {
        it("DB.getInst().testDB.customers.get()", function (done) {
            DB.getInst().testDB.customers.get()
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => { fail(error); done(); });
        });
        it("DB.getInst().testDB.customers.get('customerName')", function (done) {
            DB.getInst().testDB.customers.get('customerName')
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => { fail(error); done(); });
        });
        it("DB.getInst().testDB.customers.get(['customerName','city'])", function (done) {
            DB.getInst().testDB.customers.get(['customerName', 'city'])
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => { fail(error); done(); });
        });
        it("DB.getInst().testDB.customers.getDist('country')", function (done) {
            DB.getInst().testDB.customers.getDist('country')
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toBeDefined();
                    done();
                }).catch((error) => { fail(error); done(); });
        });
    });
    xdescribe('where', function () {
        it("DB.getInst().testDB.customers.get().where.country.equal('Mexico')", function (done) {
            DB.getInst().testDB.customers.get().where.country.equal('Mexico')
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => { fail(error); done(); });
        });
    })
    xit("DB.getInst().testDB.customers.country.equal('Mexico')", function (done) {
        DB.getInst().testDB.customers.country.equal('Mexico')
            .then(result => {
                expect(result).toBeDefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    xit("DB.getInst().testDB.customers.customerId.equal('1')", function (done) {
        DB.getInst().testDB.customers.get(1)
            .then(result => {
                expect(result).toBeDefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    xit("DB.getInst().testDB.customers.contactName.equal('Berglunds snabbköp')", function (done) {
        DB.getInst().testDB.customers.contactName.equal('Berglunds snabbköp')
            .then(result => {
                expect(result).toBeDefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
});