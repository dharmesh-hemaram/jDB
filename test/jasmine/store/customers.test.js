describe("<< [" + storeNames[1].name + "]", function () {
    let store = storeNames[1];
    describe('[clear]', function () {
        it(">> DB.getInst().testDB[store.name].clear()", function (done) {
            DB.getInst().testDB[store.name].clear()
                .then(result => {
                    expect(result).toBeUndefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
    describe('[add]', function () {
        it(">> DB.getInst().testDB[store.name].add(store.data)", function (done) {
            Utils.loadJSON('base/assets/data/' + store.name + '.json').then(data => {
                store.data = data;
                DB.getInst().testDB[store.name].add(data)
                    .then(count => {
                        expect(count).toBeDefined();
                        expect(count).toBe(store.data.length);
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });
    describe('[count]', function () {
        it(">> DB.getInst().testDB.customers.count()", function (done) {
            DB.getInst().testDB.customers.count()
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
    describe('[get]', function () {
        it(">> DB.getInst().testDB.customers.get()", function (done) {
            DB.getInst().testDB.customers.get()
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst().testDB.customers.get('customerName')", function (done) {
            DB.getInst().testDB.customers.get('customerName')
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst().testDB.customers.get(['customerName','city'])", function (done) {
            DB.getInst().testDB.customers.get(['customerName', 'city'])
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });


    });
    describe('[getDist]', function () {
        it(">> DB.getInst().testDB.customers.getDist('country')", function (done) {
            DB.getInst().testDB.customers.getDist('country')
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst().testDB.customers.getDist('country',5)", function (done) {
            DB.getInst().testDB.customers.getDist('country', 5)
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst().testDB.customers.getDist('country',5,5)", function (done) {
            DB.getInst().testDB.customers.getDist('country', 5, 5)
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
    describe('[update]', function () {
        it(">> DB.getInst().testDB.customers.update(1,{'country':'Dharmesh'})", function (done) {
            DB.getInst().testDB.customers.update(1, {
                    'country': 'Dharmesh'
                })
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    })
    describe('[index]', function () {
        describe('[get:equal]', function () {
            it(">> DB.getInst().testDB.customers.country.equal('Mexico').get()", function (done) {
                DB.getInst().testDB.customers.country.equal('Mexico').get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
            it(">> DB.getInst().testDB.customers.contactName.equal('Berglunds snabbköp').get()", function (done) {
                DB.getInst().testDB.customers.contactName.equal('Berglunds snabbköp').get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:startsWith]', function () {
            it(">> DB.getInst().testDB.customers.country.startsWith('Mex').get()", function (done) {
                DB.getInst().testDB.customers.country.startsWith('Mex').get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:endsWith]', function () {
            it(">> DB.getInst().testDB.customers.country.endsWith('il').get()", function (done) {
                DB.getInst().testDB.customers.country.endsWith('il').get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:greaterThan]', function () {
            it(">> DB.getInst().testDB.customers.customerId.greaterThan(50).get()", function (done) {
                DB.getInst().testDB.customers.customerId.greaterThan(50).get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:lesserThan]', function () {
            it(">> DB.getInst().testDB.customers.customerId.lesserThan(5).get()", function (done) {
                DB.getInst().testDB.customers.customerId.lesserThan(5).get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:greaterThanOrEqual]', function () {
            it(">> DB.getInst().testDB.customers.customerId.greaterThanOrEqual(1).get()", function (done) {
                DB.getInst().testDB.customers.customerId.greaterThanOrEqual(1).get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:lesserThanOrEqual]', function () {
            it(">> DB.getInst().testDB.customers.customerId.lesserThanOrEqual(5).get()", function (done) {
                DB.getInst().testDB.customers.customerId.lesserThanOrEqual(5).get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[get:between]', function () {
            it(">> DB.getInst().testDB.customers.customerId.between(1,5).get()", function (done) {
                DB.getInst().testDB.customers.customerId.between(1, 5).get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
        describe('[update]', function () {
            it(">> DB.getInst().testDB.customers.country.equal('Mexico').update({'country':'Dharmesh'})", function (done) {
                DB.getInst().testDB.customers.country.equal('Mexico').update({
                    'country': 'Dharmesh'
                }).then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    console.log(error);
                    done();
                });
            });
        })
        describe('[delete]', function () {
            it(">> DB.getInst().testDB.customers.country.equal('Dharmesh').delete()", function (done) {
                DB.getInst().testDB.customers.country.equal('Dharmesh').delete()
                    .then(result => {
                        expect(result).toBeUndefined();
                        done();
                    }).catch((error) => {
                        console.log(error);
                        done();
                    });
            });
        });
        describe('[getDist:count|min|max|avg]', function () {
            it(">> DB.getInst().testDB.customers.get()", function (done) {
                DB.getInst().testDB.customers.get()
                    .then(result => {
                        expect(result).toBeDefined();
                        expect(result.count()).toBeDefined();
                        expect(result.min('customerId')).toBeDefined();
                        expect(result.max('customerId')).toBeDefined();
                        expect(result.avg('customerId')).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
            it(">> (- DB.getInst().testDB.customers.get())", function (done) {
                DB.getInst().testDB.customers.get('customerId')
                    .then(result => {
                        expect(result).toBeDefined();
                        expect(result.count()).toBeDefined();
                        expect(result.min('customerId')).toBeDefined();
                        expect(result.max('customerId')).toBeDefined();
                        expect(result.avg('customerId')).toBeDefined();
                        expect(result.min).toThrowError(TypeError);
                        expect(result.max).toThrowError(TypeError);
                        expect(result.avg).toThrowError(TypeError);
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
        });
    });
});