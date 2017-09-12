xdescribe(storeNames[0].name, function () {
    let store = storeNames[0];
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
        }).catch((error) => { fail(error); done();});
    });
    xit("DB.getInst().testDB[store.name].get()", function (done) {
        DB.getInst().testDB[store.name].get()
            .then(result => {
                expect(result).toBeDefined();
                expect(result.length).toBe(store.data.length);
                expect(result[0].categoryId).toEqual(store.data[0].categoryId);
                expect(result[0].categoryName).toEqual(store.data[0].categoryName);
                expect(result[0].description).toEqual(store.data[0].description);
                done();
            }).catch((error) => { fail(error); done(); });
    });
    xit("DB.getInst().testDB[store.name].get(store.data.categoryId)", function (done) {
        DB.getInst().testDB[store.name].get(store.data[1].categoryId)
            .then(result => {
                expect(result).toBeDefined();
                expect(result.categoryId).toEqual(store.data[1].categoryId);
                expect(result.categoryName).toEqual(store.data[1].categoryName);
                expect(result.description[1]).toEqual(store.data[1].description[1]);
                done();
            }).catch((error) => { fail(error); done(); });
    });
});