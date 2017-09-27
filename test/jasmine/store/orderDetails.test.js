xdescribe(storeNames[3].name, function () {
    let store = storeNames[3];
    it("DB.getInst()[dbName][store.name].clear()", function (done) {
        DB.getInst()[dbName][store.name].clear()
            .then(result => {
                expect(result).toBeUndefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst()[dbName][store.name].add(store.data)", function (done) {
        Utils.loadJSON('base/test/data/' + store.name + '.json').then(data => {
            store.data = data;
            DB.getInst()[dbName][store.name].add(data)
                .then(count => {
                    expect(count).toBeDefined();
                    expect(count).toBe(store.data.length);
                    done();
                }).catch((error) => { fail(error); done(); });
        }).catch((error) => { fail(error); done();});
    });
});