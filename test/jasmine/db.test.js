var db;
xdescribe("DB", function () {
    let dbJSON;
    beforeEach(function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        Utils.loadJSON('base/test/db_config.json').then(data => {
            dbJSON = data;
            done();
        }).catch(error => {
            console.error(error);
            done();
        });
    });
    it("setup", function (done) {
        DB.setup(JSON.parse(dbJSON)).then(_ => {
            db = _;
            expect(db.databaseName).toBeDefined();
            expect(db.error).not.toBeDefined();
            done();
        });
    });
    xit("delete", function (done) {
        db.delete().then(msg => {
            console.log(msg);
            expect(msg).toBe(string);
            done();
        }).catch(error => {
            expect(error).toBeUndefined();
            done();
        });
    });
    describe('Store', function () {
        let student = { name: 'Arjun', rollno: 7, class: '5th Standard' };
        let subject1 = ["English", "Maths", "Biology"];
        let subject2 = ["Maths", "Biology"];
        let subject3 = ["Hindi"];
        let students = [
            { name: 'Dharmesh', rollno: 0, class: '1th Standard', subject: subject1 },
            { name: 'Dharmesh', rollno: 1, class: '1th Standard', subject: subject1 },
            { name: 'Dharu', rollno: 2, class: '2th Standard', subject: subject1 },
            { name: 'Saroj', rollno: 4, class: '4th Standard', subject: subject2 },
            { name: 'Suka', rollno: 5, class: '5th Standard', subject: subject2 },
            { name: 'Manish', rollno: 3, class: '3th Standard', subject: subject3 },
            { name: 'Ramesh', rollno: 6, class: '6th Standard', subject: subject3 }];
        let studentId = 1;
        it('clear', function (done) {
            db.student.clear()
                .then(() => {
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });
        it('bulk insert', function (done) {
            db.student.add(students)
                .then(count => {
                    expect(count).toBeDefined();
                    done();
                }).catch((error, obj) => {
                    console.log(error, obj);
                    expect(error).toBeUndefined();
                    done();
                });
        });
        xit('insert', function (done) {
            db.student.add(student)
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });
        xit('get', function (done) {
            db.student.get(studentId)
                .then(result => {
                    expect(result).toBeDefined();
                    student = result;
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });
        xit('getAll', function (done) {
            db.student.getAll()
                .then(result => {
                    console.log(result);
                    expect(result).toBeDefined();
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });
        xit('cursor', function (done) {
            db.student._getCursor()
                .then(result => {
                    console.log(result);
                    expect(result).toBeDefined();
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });

        xit('update', function (done) {
            student = {};
            student.name = 'Saroj';
            db.student.update(studentId, student)
                .then(result => {
                    expect(result).toBeDefined();
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });
        });
        xit('delete', function (done) {
            db.student.delete(studentId)
                .then(result => {
                    expect(result).not.toBeDefined();
                    done();
                }).catch(error => {
                    expect(error).toBeUndefined();
                    done();
                });

        });
        describe('Index', function () {
            xit('equal', function (done) {
                db.student.name.equal('Dharmesh')
                    .then(result => {
                        console.log(result);
                        expect(result).toBeDefined();
                        done();
                    }).catch(error => {
                        expect(error).toBeUndefined();
                        done();
                    });
            });
            xit('equalDist', function (done) {
                db.student.name.equalDist('Dharmesh')
                    .then(result => {
                        console.log(result);
                        expect(result).toBeDefined();
                        done();
                    }).catch(error => {
                        expect(error).toBeUndefined();
                        done();
                    });
            });
            xit('startsWith with condition', function (done) {
                db.student.name.startsWith('Dh')
                    .then(result => {
                        console.log(result);
                        expect(result).toBeDefined();
                        done();
                    }).catch(error => {
                        expect(error).toBeUndefined();
                        done();
                    });
            });
            xit('endsWith with condition', function (done) {
                db.student.name.endsWith('mesh')
                    .then(result => {
                        console.log(result);
                        expect(result).toBeDefined();
                        done();
                    }).catch(error => {
                        expect(error).toBeUndefined();
                        done();
                    });
            });
        });
    });
});