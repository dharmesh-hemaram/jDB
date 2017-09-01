var errorFunc = function (error) {
    expect(error).toBeUndefined();
};

var db;
describe("DB", function () {
    let dbJSON;
    beforeEach(function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        Utils.loadJSON('base/test/db_config.json').then(data => {
            dbJSON = data;
            done();
        }).catch(errorFunc);
    });
    it("creation", function (done) {
        db = DB.fromJSON(JSON.parse(dbJSON));
        setTimeout(() => {
            expect(db.isReady).toBe(true);
            expect(db.errorFunc).not.toBeDefined();
            done();
        }, 2000);
    });
    describe('store', function () {
        let student;
        let studentId;
        it('insert', function (done) {
            db.student.add({ name: 'Dharmesh', rollno: new Date().getTime(), class: '5th Standard' })
                .then(result => {
                    expect(result).toBeDefined();
                    studentId = result;
                    done();
                }).catch(errorFunc);
        });
        xit('get', function (done) {
            db.student.get(studentId)
                .then(result => {
                    expect(result).toBeDefined();
                    student = result;
                    done();
                }).catch(errorFunc);
        });
        it('update', function (done) {
            student = {};
            student.name = 'Saroj';
            db.student.update(studentId, student)
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch(errorFunc);
        });
        xit('delete', function (done) {
            db.student.delete(studentId)
                .then(result => {
                    expect(result).not.toBeDefined();
                    done();
                }).catch(errorFunc);

        });
    });
    xit("delete", function (done) {
        db.delete().then(msg => {
            console.log(msg);
            expect(msg).toBe(string);
            done();
        }).catch(errorFunc);
    });
});