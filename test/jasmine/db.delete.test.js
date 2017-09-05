describe("DB", function () {
    it("delete", function (done) {
        DB.getInst().testDB.delete().then(msg => {
            expect(msg).toBe('Database deleted Successfully');
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
});