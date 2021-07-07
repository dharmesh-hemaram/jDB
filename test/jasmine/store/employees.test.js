describe(tableNames[2].name, function () {
    let table = tableNames[2];
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
        }).catch((error) => { fail(error);done(); });
    });
});