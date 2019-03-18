xdescribe("<< [" + tableNames[1].name + "]", function () {
    let table = tableNames[1];
    describe('[clear]', function () {
        it(">> DB.getInst()[dbName][table.name].clear()", function (done) {
            DB.getInst()[dbName][table.name].clear()
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
        it(">> DB.getInst()[dbName][table.name].add(table.data)", function (done) {
            fetch('base/assets/data/' + table.name + '.json').then(response => response.json()).then(data => {
                table.data = data;
                DB.getInst()[dbName][table.name].add(data)
                    .then(count => {
                        expect(count).toBeDefined();
                        expect(count).toBe(table.data.length);
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
        it(">> DB.getInst()[dbName].customers.count()", function (done) {
            DB.getInst()[dbName].customers.count()
                .then(result => {
                    expect(result).toBe(table.data.length);
                    expect(result).toBeDefined();
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
    describe('[get]', function () {
        it(">> DB.getInst()[dbName].customers.get()", function (done) {
            DB.getInst()[dbName].customers.get()
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toEqual(table.data.length);
                    expect(result.arr[0].customerId).toEqual(table.data[0].customerId);
                    expect(result.arr[1].contactName).toEqual(table.data[1].contactName);
                    expect(result.arr[2].country).toEqual(table.data[2].country);
                    expect(result.arr[3].customerName).toEqual(table.data[3].customerName);
                    expect(result.arr[4].pinCode).toEqual(table.data[4].pinCode);
                    expect(result.arr[5].address).toEqual(table.data[5].address);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst()[dbName].customers.get('customerName')", function (done) {
            DB.getInst()[dbName].customers.get('customerName')
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toEqual(table.data.length);
                    expect(result.arr[0]).toEqual(table.data[0].customerName);
                    expect(result.arr[1]).toEqual(table.data[1].customerName);
                    expect(result.arr[2]).toEqual(table.data[2].customerName);
                    expect(result.arr[3]).toEqual(table.data[3].customerName);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst()[dbName].customers.get(['customerName','city'])", function (done) {
            DB.getInst()[dbName].customers.get(['customerName', 'city'])
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toEqual(table.data.length);
                    expect(result.arr[0].customerName).toEqual(table.data[0].customerName);
                    expect(result.arr[1].customerName).toEqual(table.data[1].customerName);
                    expect(result.arr[2].customerName).toEqual(table.data[2].customerName);
                    expect(result.arr[3].customerName).toEqual(table.data[3].customerName);

                    expect(result.arr[0].city).toEqual(table.data[0].city);
                    expect(result.arr[1].city).toEqual(table.data[1].city);
                    expect(result.arr[2].city).toEqual(table.data[2].city);
                    expect(result.arr[3].city).toEqual(table.data[3].city);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });


    });
    describe('[getDist]', function () {
        it(">> DB.getInst()[dbName].customers.getDist('country')", function (done) {
            DB.getInst()[dbName].customers.getDist('country')
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toBeDefined();
                    expect(result.count()).toBeLessThan(table.data.length);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst()[dbName].customers.getDist('country',5)", function (done) {
            DB.getInst()[dbName].customers.getDist('country', 5)
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toEqual(5);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
        it(">> DB.getInst()[dbName].customers.getDist('country',5,5)", function (done) {
            DB.getInst()[dbName].customers.getDist('country', 5, 5)
                .then(result => {
                    expect(result).toBeDefined();
                    expect(result.count()).toEqual(5);
                    done();
                }).catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
    describe('[update]', function () {
        it(">> DB.getInst()[dbName].customers.update(1,{'country':'Dharmesh'})", function (done) {
            DB.getInst()[dbName].customers.update(1, {
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
            it(">> DB.getInst()[dbName].customers.country.equal('Mexico').get()", function (done) {
                DB.getInst()[dbName].customers.country.equal('Mexico').get()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        fail(error);
                        done();
                    });
            });
            it(">> DB.getInst()[dbName].customers.contactName.equal('Berglunds snabbköp').get()", function (done) {
                DB.getInst()[dbName].customers.contactName.equal('Berglunds snabbköp').get()
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
            it(">> DB.getInst()[dbName].customers.country.startsWith('Mex').get()", function (done) {
                DB.getInst()[dbName].customers.country.startsWith('Mex').get()
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
            it(">> DB.getInst()[dbName].customers.country.endsWith('il').get()", function (done) {
                DB.getInst()[dbName].customers.country.endsWith('il').get()
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
            it(">> DB.getInst()[dbName].customers.customerId.greaterThan(50).get()", function (done) {
                DB.getInst()[dbName].customers.customerId.greaterThan(50).get()
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
            it(">> DB.getInst()[dbName].customers.customerId.lesserThan(5).get()", function (done) {
                DB.getInst()[dbName].customers.customerId.lesserThan(5).get()
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
            it(">> DB.getInst()[dbName].customers.customerId.greaterThanOrEqual(1).get()", function (done) {
                DB.getInst()[dbName].customers.customerId.greaterThanOrEqual(1).get()
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
            it(">> DB.getInst()[dbName].customers.customerId.lesserThanOrEqual(5).get()", function (done) {
                DB.getInst()[dbName].customers.customerId.lesserThanOrEqual(5).get()
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
            it(">> DB.getInst()[dbName].customers.customerId.between(1,5).get()", function (done) {
                DB.getInst()[dbName].customers.customerId.between(1, 5).get()
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
            it(">> DB.getInst()[dbName].customers.country.equal('Mexico').update({'country':'Dharmesh'})", function (done) {
                DB.getInst()[dbName].customers.country.equal('Mexico').update({
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
            it(">> DB.getInst()[dbName].customers.country.equal('Dharmesh').delete()", function (done) {
                DB.getInst()[dbName].customers.country.equal('Dharmesh').delete()
                    .then(result => {
                        expect(result).toBeDefined();
                        done();
                    }).catch((error) => {
                        console.log(error);
                        done();
                    });
            });
        });
        describe('[getDist:count|min|max|avg]', function () {
            it(">> DB.getInst()[dbName].customers.get()", function (done) {
                DB.getInst()[dbName].customers.get()
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
            it(">> (- DB.getInst()[dbName].customers.get())", function (done) {
                DB.getInst()[dbName].customers.get('customerId')
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