xdescribe(tableNames[0].name, function () {
    let table = tableNames[0];
    it("DB.getInst()[dbName][table.name].clear()", function (done) {
        DB.getInst()[dbName][table.name].clear()
            .then(result => {
                expect(result).toBeUndefined();
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst()[dbName][table.name].add(table.data)", function (done) {
        fetch('base/assets/data/' + table.name + '.json').then(response => response.json()).then(data => {
            table.data = data;
            DB.getInst()[dbName][table.name].add(data)
                .then(count => {
                    expect(count).toBeDefined();
                    expect(count).toBe(table.data.length);
                    done();
                }).catch((error) => { fail(error); done(); });
        }).catch((error) => { fail(error); done();});
    });
    it("DB.getInst()[dbName][table.name].get()", function (done) {
        DB.getInst()[dbName][table.name].get()
            .then(result => {
                expect(result).toBeDefined();
                expect(result.arr.length).toBe(table.data.length);
                console.log(result.arr[0]);
                expect(result.arr[0].categoryId).toEqual(table.data[0].categoryId);
                expect(result.arr[0].categoryName).toEqual(table.data[0].categoryName);
                expect(result.arr[0].description).toEqual(table.data[0].description);
                done();
            }).catch((error) => { fail(error); done(); });
    });
    it("DB.getInst()[dbName][table.name].get(table.data.categoryId)", function (done) {
        DB.getInst()[dbName][table.name].get(table.data[1].categoryId)
            .then(result => {
                expect(result).toBeDefined();
                expect(result.categoryId).toEqual(table.data[1].categoryId);
                expect(result.categoryName).toEqual(table.data[1].categoryName);
                expect(result.description[1]).toEqual(table.data[1].description[1]);
                done();
            }).catch((error) => { fail(error); done(); });
    });
});