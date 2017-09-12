xdescribe(storeNames[2].name, function () {
    let store = storeNames[2];
    it("DB.getInst().testDB[store.name].clear()", function (done) {
        DB.getInst().testDB[store.name].clear()
            .then(result => {
                expect(result).toBeUndefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst().testDB[store.name].add(store.data)", function (done) {
        Utils.loadJSON('base/assets/data/' + store.name + '.json').then(data => {
            store.data = data;
            DB.getInst().testDB[store.name].add(data)
                .then(count => {
                    expect(count).toBeDefined();
                    expect(count).toBe(store.data.length);
                    done();
                }).catch((error) => { fail(error); done(); });
        }).catch((error) => { fail(error);done(); });
    });
});