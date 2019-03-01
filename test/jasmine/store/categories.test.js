xdescribe(storeNames[0].name, function () {
    let store = storeNames[0];
    it("DB.getInst()[dbName][store.name].clear()", function (done) {
        DB.getInst()[dbName][store.name].clear()
            .then(result => {
                expect(result).toBeUndefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst()[dbName][store.name].add(store.data)", function (done) {
        fetch('base/assets/data/' + store.name + '.json').then(response => response.json()).then(data => {
            store.data = data;
            DB.getInst()[dbName][store.name].add(data)
                .then(count => {
                    expect(count).toBeDefined();
                    expect(count).toBe(store.data.length);
                    done();
                }).catch((error) => { fail(error); done(); });
        }).catch((error) => { fail(error); done();});
    });
    it("DB.getInst()[dbName][store.name].get()", function (done) {
        DB.getInst()[dbName][store.name].get()
            .then(result => {
                expect(result).toBeDefined();
                expect(result.arr.length).toBe(store.data.length);
                console.log(result.arr[0]);
                expect(result.arr[0].categoryId).toEqual(store.data[0].categoryId);
                expect(result.arr[0].categoryName).toEqual(store.data[0].categoryName);
                expect(result.arr[0].description).toEqual(store.data[0].description);
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst()[dbName][store.name].get(store.data.categoryId)", function (done) {
        DB.getInst()[dbName][store.name].get(store.data[1].categoryId)
            .then(result => {
                expect(result).toBeDefined();
                expect(result.categoryId).toEqual(store.data[1].categoryId);
                expect(result.categoryName).toEqual(store.data[1].categoryName);
                expect(result.description[1]).toEqual(store.data[1].description[1]);
                done();
            }).catch((error) => { fail(error); done(); });
    });
});