xdescribe("Utils", function () {
    let json;
    beforeEach(function(){
        json = Utils.loadJSON('base/test/db_config.json');  
    });
    it("load json file", function () {
        expect(json).toBeDefined();
    });
    it("isAvail", function () {
        expect(Utils.isAvail(null)).toBeFalsy();
        expect(Utils.isAvail(undefined)).toBeFalsy();
        expect(Utils.isAvail("")).toBeFalsy();
        expect(Utils.isAvail(0)).toBeTruthy();
        expect(Utils.isAvail(1)).toBeTruthy();
        expect(Utils.isAvail("Defined")).toBeTruthy();
    });

    it("Setter", function () {
        let setter = {};
        Utils.setter.call(setter, 'stringValue', 'stringSTkey', "string", true);
        Utils.setter.call(setter, 0, 'numberSTKey', "number", true);
        Utils.setter.call(setter, null, 'stringSFkey', "string", false);
        Utils.setter.call(setter, undefined, 'numberSFkey', "number", false);
        Utils.setter.call(setter, 'numberAsString', 'numberFKey', "number", true);
        
        //Success with proper value and mandatory as yes
        expect(setter.stringSTkey).toBeTruthy();
        expect(setter.numberSTKey).toBe(0);
        //Success with proper value and mandatory as no
        expect(setter.stringSFkey).toBeUndefined();
        expect(setter.stringSFkey).toBeUndefined();
        //Failure
        //expect(Utils.setter.call(setter, null, 'stringFkey', "string", true)).toThrowError(Error);
        expect(setter.numberFKey).toBeUndefined();
    });
});