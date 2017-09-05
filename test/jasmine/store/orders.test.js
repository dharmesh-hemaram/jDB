store = storeNames[4];
describe(store.name, function () {
    beforeEach(function (done) {
        Utils.loadJSON('base/test/data/' + store.name + '.json').then(data => {
            store.data = data;
            done();
        }).catch(error => {
            console.error(error);
            done();
        });
    });
    it("add", function (done) {
        DB.getInst().testDB[store.name].add(store.data)
            .then(count => {
                expect(count).toBeDefined();
                expect(count).toBe(store.data.length);
                done();
            }).catch((error, obj) => {
                console.log(error, obj);
                expect(error).toBeUndefined();
                done();
            });
    })
});