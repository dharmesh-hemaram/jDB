(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DB"] = factory();
	else
		root["DB"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Utils {
    /**
     * 
     * @param {Object} value 
     */
    static isAvail(value) {
        if (value !== null && value !== undefined) {
            if (typeof value === 'string' && value.length > 0) {
                return true;
            } else if (typeof value === 'number') {
                return true;
            } else if (typeof value === 'object') {
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @param {String} url 
     */
    static loadJSON(url) {
        return new Promise((resolve, reject) => {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");

            url = url ? url : "db_config.json";
            xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    resolve(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);
        });

    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Utils;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FILTER_SPLITTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FILTER_TYPE; });
const FILTER_TYPE = {
    EQUAL: 'equal',
    STARTS_WITH: 'startsWith',
    ENDS_WITH: 'endsWith',
    GREATER_THAN: 'greaterThan',
    GREATER_THAN_OR_EQUAL: 'greaterThanOrEqual',
    LESSER_THAN: 'lesserThan',
    LESSER_THAN_OR_EQUAL: 'lesserThanOrEqual',
    BETWEEN: 'between'
};

const FILTER_SPLITTER = '~';

class Filter {
    /**
     * 
     * @param {String} type 
     * @param {String} value 
     * @param {String} index 
     */
    constructor(type, value, xEntity) {
        this.type = type;
        this.value = value;
        if (xEntity) {
            this.index = xEntity.name;
        }
    }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_utils__ = __webpack_require__(0);


class CommonEntity {
    /**
     * 
     * @param {String} value 
     * @param {String} key 
     * @param {Boolean} mandatory 
     * @param {String} type_of 
     */
    setter(value, key, mandatory = false, type_of = "string") {
        if (typeof value === type_of) {
            this[key] = value;
        } else if (mandatory && !__WEBPACK_IMPORTED_MODULE_0__util_utils__["default"].isAvail(value)) {
            this.error(key, value);
        }
    }
    /**
     * 
     * @param {String} key 
     * @param {String} value 
     */
    error(key, value) {
        throw new Error(this.constructor.name + ' : ' + key + ' is ' + value);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommonEntity;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dao_db_dao__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_db_entity__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(13);




class DB {
    constructor() {
        this.xDB;
        this.DBs = {};
        // In the following line, you should include the prefixes of implementations you want to test.
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        // DON'T use "var indexedDB = ..." if you're not in a function.
        // Moreover, you may need references to some window.IDB* objects:
        this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
            READ_WRITE: "readwrite"
        };
        // This line should only be needed if it is needed to support the object's constants for older browsers
        this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    }
    /**
     * 
     * @param {String} name 
     * @param {IDBDatabase } _ 
     */
    setDB(name, _) {
        this.DBs[name] = _;
    }
    /**
     * 
     * @param {String} name 
     */
    getDB(name) {
        return this.DBs[name];
    }

    static getInst() {
        if (!this.xDB) {
            this.xDB = new DB();
        }
        return this.xDB;
    }
    /**
     * 
     * @param {DBEntity|Object} xDBEntity 
     * 
     */
    static setup(xDBEntity) {
        if (!(xDBEntity instanceof __WEBPACK_IMPORTED_MODULE_1__entity_db_entity__["a" /* default */])) {
            xDBEntity = __WEBPACK_IMPORTED_MODULE_1__entity_db_entity__["a" /* default */].fromJSON(xDBEntity);
        }
        return new Promise((resolve, reject) => {
            new __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */]().conifg(xDBEntity).then(_ => {
                this.getInst().setDB(xDBEntity.databaseName, _);
                resolve(this.getInst()[xDBEntity.databaseName] = new __WEBPACK_IMPORTED_MODULE_0__dao_db_dao__["a" /* default */](xDBEntity));
            }).catch(error => reject(error));
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = DB;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dao__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_collection__ = __webpack_require__(8);






class CommonDAO {
    /**
     * @constructor
     * @param {String} databaseName 
     * @param {StoreEntity} xStoreEntity 
     * @param {Filter} filter 
     */
    constructor(databaseName, xStoreEntity, filter) {
        this._databaseName = databaseName;
        if (filter) {
            this._filter = filter;
        }
        if (xStoreEntity) {
            this._xStoreEntity = xStoreEntity;
        }
    }
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    get(columns, limit, start) {
        let dao;
        if (IDBObjectStore.prototype.getAll && columns === undefined) {
            dao = new __WEBPACK_IMPORTED_MODULE_0__dao__["i" /* GetAllDAO */]();
        } else {
            if (!(columns instanceof Array)) {
                columns = [columns];
            }
            dao = new __WEBPACK_IMPORTED_MODULE_0__dao__["e" /* CursorDAO */](columns, limit, start);
        }
        return this._action(dao);
    }
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    getDist(column, limit, start) {
        if (!(__WEBPACK_IMPORTED_MODULE_1__util_utils__["default"].isAvail(column) && typeof column === "string")) {
            throw new ReferenceError(column + ' is either not defined or not typeof string');
        }
        return this._action(new __WEBPACK_IMPORTED_MODULE_0__dao__["e" /* CursorDAO */]([column], limit, start), true);
    }
    /**
     * 
     * @param {Object} values 
     */
    update(values) {
        return this._action(new __WEBPACK_IMPORTED_MODULE_0__dao__["g" /* CursorUpdateDAO */](values));
    }
    /**
     * 
     */
    delete() {
        return this._action(new __WEBPACK_IMPORTED_MODULE_0__dao__["f" /* CursorDeleteDAO */]());
    }
    /**
     * 
     * @param {DAO} dao 
     * @param {Boolean} distinct 
     */
    _action(dao, distinct) {
        dao.setFilter(this._filter);
        return new Promise((resolve, reject) => {
            try {
                //To check add object before inserting
                if (dao.check(this._xStoreEntity)) {
                    this._req(dao, distinct, resolve, reject);
                } else {
                    reject(dao.error);
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    /**
     * 
     * @param {DAO} dao 
     * @param {Boolean} distinct 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    _req(dao, distinct, resolve, reject) {
        let objectStore = dao.objectStore(this._databaseName, this._xStoreEntity.name);
        //Create Cursor Object
        let cursorResult = new __WEBPACK_IMPORTED_MODULE_2__util_collection__["a" /* default */]();
        //cursorResult.setDistinct(distinct);
        //request action
        let req = objectStore[dao.action](dao.values);
        req.onsuccess = event => {
            if (dao.action === __WEBPACK_IMPORTED_MODULE_0__dao__["a" /* ACTION */].CURSOR) { //Cursor
                this._cursor(event, dao, cursorResult, resolve);
            } else {
                if (event.target.result instanceof Array) {
                    cursorResult = cursorResult.concat(event.target.result)
                } else {
                    cursorResult = event.target.result;
                }
                resolve(cursorResult);
            }
        };
        req.onerror = event => {
            reject(event.target.error);
        };
    }
    /**
     * 
     * @param {Object} event 
     * @param {DAO} dao 
     * @param {Array} cursorResult 
     * @param {Function} resolve 
     */
    _cursor(event, dao, cursorResult, resolve) {
        let cursor = event.target.result;
        if (dao.start) {
            cursor.advance(dao.start);
            dao.start = undefined;
        } else {
            if (cursor && (!dao.limit || cursorResult.length < dao.limit)) {
                let result = {};
                if (dao.columns) {
                    if (dao.columns.length === 1) {
                        if (cursor.value[dao.columns[0]]) {
                            result = cursor.value[dao.columns[0]];
                        }

                    } else {
                        dao.columns.forEach((column) => {
                            if (cursor.value[column]) {
                                result[column] = cursor.value[column];
                            }
                        });
                    }
                } else {
                    result = cursor.value;
                }
                if (dao.filter) {
                    let value = cursor.value[dao.filter.index];
                    if (value) {
                        switch (dao.filter.type) {
                            case 'endsWith':
                                if (!value.endsWith(dao.filter.values)) {
                                    result = undefined;
                                }
                                break;
                            default:
                                console.log(dao.filter.type + " condition is not handled");
                        }
                    }

                }
                if (result) {
                    if (dao.newValues) {
                        let updateData = Object.assign(cursor.value, dao.newValues);
                        let req = cursor.update(updateData);
                        req.onsuccess = event => {
                            cursorResult.push(event.target.result);
                        };
                        req.onerror = event => {
                            reject(event.target.error);
                        };
                    } else if (dao.newAction === __WEBPACK_IMPORTED_MODULE_0__dao__["a" /* ACTION */].DELETE) {
                        let req = cursor.delete();
                        req.onsuccess = event => {
                            cursorResult.push(event.target.result);
                        };
                        req.onerror = event => {
                            reject(event.target.error);
                        };
                    } else {
                        cursorResult.push(result);
                    }
                }
                cursor.continue();
            } else {
                if (dao.newAction === __WEBPACK_IMPORTED_MODULE_0__dao__["a" /* ACTION */].DELETE) {
                    cursorResult = cursorResult.length;
                }
                resolve(cursorResult);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CommonDAO;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DAO */
/* unused harmony export GetDAO */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GetAllDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AddDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ClearDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CountDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UpdateDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return DeleteDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CursorDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CursorDeleteDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CursorUpdateDAO; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__db__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_utils__ = __webpack_require__(0);




const ACTION = {
    ADD: 'add',
    GET: 'get',
    GET_ALL: 'getAll',
    CURSOR: 'openCursor',
    PUT: 'put',
    DELETE: 'delete',
    CLEAR: 'clear',
    COUNT: 'count'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = ACTION;

const ACCESS = {
    READ_WRITE: 'readwrite',
    READ_ONLY: 'readonly'
};
/* unused harmony export ACCESS */

class DAO {
    /**
     * 
     * @param {ACCESS} access 
     * @param {String} index 
     * @param {ACTION} action 
     * @param {String|Number} key 
     * @param {Array[Object]|Object} values 
     * @param {Array[String]|String} columns 
     */
    constructor(access, index, action, key, values, columns, limit, start) {
        this.access = access;
        this.index = index;
        this.action = action;
        this._key = key;
        this.values = values;
        this.columns = columns;
        this.limit = limit;
        this.start = start;
    }
    /**
     * Ckeck typeof key before setting to object
     */
    set _key(key) {
        if (__WEBPACK_IMPORTED_MODULE_2__util_utils__["default"].isAvail(key)) {
            if (typeof key === "string" || typeof key === "number") {
                this.key = key;
            } else {
                throw new Error(key + " should be of type string | number only");
            }
        }
    }
    /**
     * 
     * @param {String} databaseName 
     */
    getDB(databaseName) {
        return __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().getDB(databaseName);
    }
    /**
     * 
     * @param {String} databaseName 
     * @param {String} storeName 
     */
    objectStore(databaseName, storeName) {
        if (!storeName) {
            throw new Error('Store is not defined');
        }
        let trans = this.getDB(databaseName).transaction([storeName], this.access);
        trans.oncomplete = function (event) {
            //console.info(event.target.result);
        };
        trans.onerror = function (event) {
            //console.error(event.target.error);
        };

        let objectStore = trans.objectStore(storeName);
        if (this.index) {
            if (typeof this.index === "string" || typeof this.index === "number") {
                objectStore = objectStore.index(this.index);
            } else {
                reject('Only one key is alowed in update');
            }
        }
        return objectStore;
    }
    /**
     * 
     * @param {Object} entity 
     */
    check(entity) {
        if (this.action === ACTION.ADD) {
            if (!entity.autoIncrement && !this.values[entity.keyPath]) {
                this.error = entity.keyPath + ' is not defined in ' + entity.name;
                return false;
            }
            entity.indexes.forEach((index) => {
                if (index.nullable === false && !this.values[index.name]) {
                    this.error = index.name + ' is not defined in ' + entity.name;
                    return false;
                }
            });
        } else if (this.action === ACTION.CURSOR && __WEBPACK_IMPORTED_MODULE_2__util_utils__["default"].isAvail(this.newValues)) {

        }
        return true;
    }
    /**
     * 
     * @param {Filter} filter 
     */
    setFilter(filter) {
        if (filter && filter.type) {
            this.index = filter.index;
            switch (filter.type) {
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].EQUAL:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.only(filter.value);
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].STARTS_WITH:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.bound(filter.value, filter.value + '\uffff');
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].GREATER_THAN:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.lowerBound(filter.value, true);
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].LESSER_THAN:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.upperBound(filter.value, true);
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].GREATER_THAN_OR_EQUAL:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.lowerBound(filter.value, false);
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].LESSER_THAN_OR_EQUAL:
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.upperBound(filter.value, false);
                    break;
                case __WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].BETWEEN:
                    let bounds = filter.value.split('~');
                    this.values = __WEBPACK_IMPORTED_MODULE_0__db__["default"].getInst().IDBKeyRange.bound(Number(bounds[0]), Number(bounds[1]));
                    break;
                default:
                    this.index = undefined;
                    this.filter = filter;
                    this.action = ACTION.CURSOR;
            }
        }
    }
}
class AddDAO extends DAO {
    /**
     * 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.ADD, undefined, values);
    }
}
class ClearDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CLEAR);
    }
}
class CountDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.COUNT);
    }
}
class DeleteDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_WRITE, undefined, ACTION.DELETE, key);
    }
}
class UpdateDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     * @param {Array[Object]|Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.PUT, undefined, values);
    }
}
class GetDAO extends DAO {
    /**
     * 
     * @param {String|Number} key 
     */
    constructor(key) {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET, key);
    }
}
class GetAllDAO extends DAO {
    constructor() {
        super(ACCESS.READ_ONLY, undefined, ACTION.GET_ALL);
    }
}
class CursorDAO extends DAO {
    /**
     * 
     * @param {Array[String]|String} columns 
     * @param {Number} limit 
     * @param {Number} start 
     */
    constructor(columns, limit, start) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR, undefined, undefined, columns, limit, start);
    }
}
class CursorUpdateDAO extends DAO {
    /**
     * 
     * @param {Object} values 
     */
    constructor(values) {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newValues = values;
    }
}
class CursorDeleteDAO extends DAO {
    constructor() {
        super(ACCESS.READ_WRITE, undefined, ACTION.CURSOR);
        this.newAction = ACTION.DELETE;
    }
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_dao__ = __webpack_require__(7);


class DBDAO {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    constructor(xDBEntity) {
        this._databaseName = xDBEntity.databaseName;
        xDBEntity.stores.forEach(xStoreEntity => {
            this[xStoreEntity.name] = new __WEBPACK_IMPORTED_MODULE_0__store_dao__["a" /* default */](xDBEntity.databaseName, xStoreEntity);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            this.getDB().close();
            let req = DB.getInst().indexedDB.deleteDatabase(this._databaseName);
            req.onsuccess = (event) => {
                resolve('Database deleted Successfully');
            };
            req.onerror = (event) => {
                reject(event.target.error);
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DBDAO;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_dao__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_dao__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dao__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter__ = __webpack_require__(1);







class StoreDAO extends __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */] {
    /**
     * 
     * @param {String} databaseName 
     * @param {StoreEntity} xStoreEntity 
     */
    constructor(databaseName, xStoreEntity) {
        super(databaseName, xStoreEntity);
        xStoreEntity.indexes.forEach(xIndexEntity => {
            let xIndexDAO;
            if (xIndexEntity.type === "number") {
                xIndexDAO = new __WEBPACK_IMPORTED_MODULE_1__index_dao__["b" /* NIndexDAO */](databaseName, xStoreEntity, xIndexEntity);
            } else {
                xIndexDAO = new __WEBPACK_IMPORTED_MODULE_1__index_dao__["a" /* IndexDAO */](databaseName, xStoreEntity, xIndexEntity);
            }
            this[xIndexEntity.name] = xIndexDAO;
        });
        if (xStoreEntity.type === "number") {
            this[xStoreEntity.keyPath] = new __WEBPACK_IMPORTED_MODULE_1__index_dao__["b" /* NIndexDAO */](databaseName, xStoreEntity);
        } else {
            this[xStoreEntity.keyPath] = new __WEBPACK_IMPORTED_MODULE_1__index_dao__["a" /* IndexDAO */](databaseName, xStoreEntity);
        }
    }
    /**
     * 
     * @param {Object} values 
     */
    add(values) {
        if (values instanceof Array) {
            return new Promise((resolve, reject) => {
                let bulk = {};
                bulk.index = 0;
                bulk.values = values;
                this._bulkAdd(bulk, resolve, reject);
            });
        } else {
            return this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["b" /* AddDAO */](values));
        }
    }
    /**
     * 
     * @param {Object} bulk 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    _bulkAdd(bulk, resolve, reject) {
        if (bulk.index < bulk.values.length) {
            this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["b" /* AddDAO */](bulk.values[bulk.index])).then(event => {
                bulk.index++;
                this._bulkAdd(bulk, resolve, reject);
            }).catch(event => {
                reject(event, bulk.values[bulk.index]);
            })
        } else {
            resolve(bulk.index);
        }
    }

    clear() {
        return this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["c" /* ClearDAO */]());
    }

    count() {
        return this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["d" /* CountDAO */]());
    }
    /**
     * 
     * @param {String|Number} key 
     */
    delete(key) {
        return this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["h" /* DeleteDAO */](key));
    }
    /**
     * 
     * @param {String|Number} key 
     * @param {Object} values 
     */
    update(key, values) {
        values[this._xStoreEntity.keyPath] = key;
        return this._action(new __WEBPACK_IMPORTED_MODULE_2__dao__["j" /* UpdateDAO */](values));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StoreDAO;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Collection */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_utils__ = __webpack_require__(0);


class Collection extends Array {
    constructor(){
        super();
    }
    /**
     * 
     * @param {Boolean} distinct 
     */
    setDistinct(distinct) {
        this.distinct = distinct;
    }
    /**
     * 
     * @param {Object} value 
     */
    push(value) {
        if (this.distinct && this.indexOf(value) !== -1) {
            return;
        }
        super.push(value)
    }
    count() {
        return this.length;
    }
    /**
     * 
     * @param {String} column 
     */
    avg(column) {
        if (!(__WEBPACK_IMPORTED_MODULE_0__util_utils__["default"].isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let avg = 0;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (__WEBPACK_IMPORTED_MODULE_0__util_utils__["default"].isAvail(value)) {
                avg += Number(value);
            }
        });
        return avg / this.length;
    }
    /**
     * 
     * @param {String} column 
     */
    min(column) {
        if (!(__WEBPACK_IMPORTED_MODULE_0__util_utils__["default"].isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let min;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!min || min > value) {
                min = value;
            }
        });
        return min;
    }
    /**
     * 
     * @param {String} column 
     */
    max(column) {
        if (!(__WEBPACK_IMPORTED_MODULE_0__util_utils__["default"].isAvail(column) && typeof column === 'string')) {
            throw new TypeError('Please provide column to find min')
        }
        let max;
        this.forEach(value => {
            value = typeof value === "object" ? value[column] : value;
            if (!max || max < value) {
                max = value;
            }
        });
        return max;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collection;




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexDAO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NIndexDAO; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_dao__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(1);




class IndexDAO extends __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */] {
    /**
     * 
     * @param {String} databaseName 
     * @param {StoreEntity} xStoreEntity 
     * @param {IndexEntity} xIndexEntity 
     */
    constructor(databaseName, xStoreEntity, xIndexEntity) {
        super(databaseName, xStoreEntity);
        this._xIndexEntity = xIndexEntity;
    }
    /**
     * 
     * @param {String|Number} value 
     */
    equalDist(value) {
        return this._action(ACTION.GET, ACCESS.READ_ONLY, value);
    }
    /**
     * 
     * @param {String|Number} value 
     */
    equal(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    startsWith(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].STARTS_WITH, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    endsWith(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].ENDS_WITH, value, this._xIndexEntity));
    }
}

class NIndexDAO extends IndexDAO {
    constructor(databaseName, storeName, xIndexEntity) {
        super(databaseName, storeName, xIndexEntity);
    }
    /**
     * 
     * @param {String|Number} value 
     */
    greaterThan(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].GREATER_THAN, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    lesserThan(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].LESSER_THAN, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    greaterThanOrEqual(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].GREATER_THAN_OR_EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} value 
     */
    lesserThanOrEqual(value) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].LESSER_THAN_OR_EQUAL, value, this._xIndexEntity));
    }
    /**
     * 
     * @param {String|Number} start 
     * @param {String|Number} end 
     */
    between(start, end) {
        return new __WEBPACK_IMPORTED_MODULE_0__common_dao__["a" /* default */](this._databaseName, this._xStoreEntity, new __WEBPACK_IMPORTED_MODULE_1__filter__["c" /* Filter */](__WEBPACK_IMPORTED_MODULE_1__filter__["b" /* FILTER_TYPE */].BETWEEN, start + __WEBPACK_IMPORTED_MODULE_1__filter__["a" /* FILTER_SPLITTER */] + end, this._xIndexEntity));
    }
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_entity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_entity__ = __webpack_require__(11);



class DBEntity extends __WEBPACK_IMPORTED_MODULE_0__common_entity__["a" /* default */] {
    /**
     * 
     * @param {String} databaseName 
     * @param {Number} version 
     * @param {Array[StoreEntity]} stores 
     */
    constructor(databaseName, version, stores) {
        super();
        this.setter(databaseName, "databaseName", true);
        this.setter(version, "version", true, "number");
        this.setStores = stores;
    }
    /**
     * @param {Array[StoreEntity]} stores 
     */
    set setStores(stores) {
        this.stores = [];
        if (typeof stores === 'object' && stores instanceof Array) {
            stores.forEach(store => {
                if (!(store instanceof __WEBPACK_IMPORTED_MODULE_1__store_entity__["a" /* default */])) {
                    store = __WEBPACK_IMPORTED_MODULE_1__store_entity__["a" /* default */].fromJSON(store)
                }
                this.stores.push(store);
            });
        } else if (stores !== undefined) {
            throw new TypeError(stores + " is of not of type [Object|Array]");
        }
    }

    /**
     * 
     * @param {Object} json 
     */
    static fromJSON(json) {
        return new DBEntity(json.databaseName, json.version, json.stores);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DBEntity;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_entity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_entity__ = __webpack_require__(12);




class StoreEntity extends __WEBPACK_IMPORTED_MODULE_0__common_entity__["a" /* default */] {
    /**
     * 
     * @param {String} name 
     * @param {String|Number} keyPath 
     * @param {Array[IndexEntity]} indexes 
     * @param {Boolean} autoIncrement 
     * @param {String} type 
     */
    constructor(name, keyPath, indexes, autoIncrement = true, type = 'string') {
        super();
        this.autoIncrement = autoIncrement;
        this.setter(name, "name", true);
        this.setter(keyPath, "keyPath", true);
        this.type = type;
        this.setIndexes = indexes;
    }
    /**
     * @param {Array[IndexEntity]} indexes 
     */
    set setIndexes(indexes) {
        this.indexes = [];
        if (typeof indexes === 'object' && indexes instanceof Array) {
            indexes.forEach(index => {
                if (!(index instanceof __WEBPACK_IMPORTED_MODULE_1__index_entity__["a" /* default */])) {
                    index = __WEBPACK_IMPORTED_MODULE_1__index_entity__["a" /* default */].fromJSON(index);
                }
                this.indexes.push(index);
            });
        } else if (indexes !== undefined) {
            this.error('indexes', indexes);
        }
    }
    /**
     * 
     * @param {Object} json 
     */
    static fromJSON(json) {
        return new StoreEntity(json.name, json.keyPath, json.indexes, json.autoIncrement, json.type);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StoreEntity;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_entity__ = __webpack_require__(2);


class IndexEntity extends __WEBPACK_IMPORTED_MODULE_0__common_entity__["a" /* default */] {
    /**
     * 
     * @param {String} name 
     * @param {Boolean} unique 
     * @param {Boolean} multiEntry 
     * @param {Boolean} nullable 
     * @param {String} type 
     */
    constructor(name, unique = false, multiEntry = false, nullable = true, type = 'string') {
        super();
        this.setter(name, 'name');
        this.unique = unique;
        this.multiEntry = multiEntry;
        this.type = type;
        this.nullable = nullable;
    }
    /**
     * 
     * @param {Object} json 
     */
    static fromJSON(json) {
        return new IndexEntity(json.name, json.unique, json.multiEntry, json.nullable, json.type);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IndexEntity;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Config {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    conifg(xDBEntity) {
        return new Promise((resolve, reject) => {
            let req = DB.getInst().indexedDB.open(xDBEntity.databaseName, xDBEntity.version);
            req.onupgradeneeded = event => {
                xDBEntity.stores.forEach(xStore => {
                    this.createStore(event.target.result, xStore);
                });
                event.target.result.onversionchange = event => {
                    event.target.result.close();
                    alert("A new version of this page is ready. Please reload!");
                };
            };
            req.onblocked = event => {
                alert("Please close all other tabs with this site open!");
            };
            req.onsuccess = event => {
                resolve(event.target.result);
            };
            req.onerror = event => {
                reject(event.target.error);
            }
        });
    }
    /**
     * 
     * @param {IDBDatabase} _ 
     * @param {IDBObjectStore} xStore 
     */
    createStore(_, xStore) {
        if (_.objectStoreNames.contains(xStore.name)) {
            _.deleteObjectStore(xStore.name);
        }
        let storeInst = _.createObjectStore(xStore.name, { "keyPath": xStore.keyPath, "autoIncrement": xStore.autoIncrement });
        xStore.indexes.forEach(xIndexEntity => {
            storeInst.createIndex(xIndexEntity.name, xIndexEntity.name, { unique: xIndexEntity.unique, multiEntry: xIndexEntity.multiEntry });
        });
    } 
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Config;


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YTE0YTdmZDY3NjEwMDQ0M2U0OSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGFvL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXR5L2NvbW1vbi1lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiLmpzIiwid2VicGFjazovLy8uL3NyYy9kYW8vY29tbW9uLWRhby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGFvL2Rhby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGFvL2RiLWRhby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGFvL3N0b3JlLWRhby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9kYW8vaW5kZXgtZGFvLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkvZGItZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkvc3RvcmUtZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkvaW5kZXgtZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEM7Ozs7Ozs7Ozs7O0FDckNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDM0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsQzs7Ozs7Ozs7Ozs7O0FDekR5RTs7QUFFekU7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsWUFBWTtBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEMsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsSUFBSTtBQUNuQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZUFBZSxJQUFJO0FBQ25CLGVBQWUsUUFBUTtBQUN2QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUErQztBQUMvQztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxJQUFJO0FBQ25CLGVBQWUsTUFBTTtBQUNyQixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaE1BO0FBQytDO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsY0FBYztBQUM3QixlQUFlLHFCQUFxQjtBQUNwQyxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGVBQWUscUJBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDOzs7Ozs7Ozs7Ozs7O0FDekJBO0FBQzhCOztBQUU2Qjs7QUFFN0I7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN4RkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7OztBQzdFQTtBQUMrQzs7O0FBRy9DO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFlBQVk7QUFDM0IsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QixlQUFlLGNBQWM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN4Q0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsY0FBYztBQUM3QixlQUFlLG1CQUFtQjtBQUNsQyxlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7OztBQzVDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELG1FQUFtRTtBQUM3SDtBQUNBLHlFQUF5RSxtRUFBbUU7QUFDNUksU0FBUztBQUNULEs7QUFDQSxDIiwiZmlsZSI6InhEQi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkRCXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkRCXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdhMTRhN2ZkNjc2MTAwNDQzZTQ5IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQXZhaWwodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRKU09OKHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciB4b2JqID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhvYmoub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcblxyXG4gICAgICAgICAgICB1cmwgPSB1cmwgPyB1cmwgOiBcImRiX2NvbmZpZy5qc29uXCI7XHJcbiAgICAgICAgICAgIHhvYmoub3BlbignR0VUJywgdXJsLCB0cnVlKTsgLy8gUmVwbGFjZSAnbXlfZGF0YScgd2l0aCB0aGUgcGF0aCB0byB5b3VyIGZpbGVcclxuICAgICAgICAgICAgeG9iai5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeG9iai5yZWFkeVN0YXRlID09IDQgJiYgeG9iai5zdGF0dXMgPT0gXCIyMDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4b2JqLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4b2JqLnNlbmQobnVsbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXRpbC91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IEZJTFRFUl9UWVBFID0ge1xyXG4gICAgRVFVQUw6ICdlcXVhbCcsXHJcbiAgICBTVEFSVFNfV0lUSDogJ3N0YXJ0c1dpdGgnLFxyXG4gICAgRU5EU19XSVRIOiAnZW5kc1dpdGgnLFxyXG4gICAgR1JFQVRFUl9USEFOOiAnZ3JlYXRlclRoYW4nLFxyXG4gICAgR1JFQVRFUl9USEFOX09SX0VRVUFMOiAnZ3JlYXRlclRoYW5PckVxdWFsJyxcclxuICAgIExFU1NFUl9USEFOOiAnbGVzc2VyVGhhbicsXHJcbiAgICBMRVNTRVJfVEhBTl9PUl9FUVVBTDogJ2xlc3NlclRoYW5PckVxdWFsJyxcclxuICAgIEJFVFdFRU46ICdiZXR3ZWVuJ1xyXG59O1xyXG5cclxuY29uc3QgRklMVEVSX1NQTElUVEVSID0gJ34nO1xyXG5cclxuY2xhc3MgRmlsdGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodHlwZSwgdmFsdWUsIHhFbnRpdHkpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAoeEVudGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0geEVudGl0eS5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgRmlsdGVyLCBGSUxURVJfU1BMSVRURVIsIEZJTFRFUl9UWVBFIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGFvL2ZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi8uLi91dGlsL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1vbkVudGl0eSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFuZGF0b3J5IFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVfb2YgXHJcbiAgICAgKi9cclxuICAgIHNldHRlcih2YWx1ZSwga2V5LCBtYW5kYXRvcnkgPSBmYWxzZSwgdHlwZV9vZiA9IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSB0eXBlX29mKSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWFuZGF0b3J5ICYmICFVdGlscy5pc0F2YWlsKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBlcnJvcihrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiAnICsga2V5ICsgJyBpcyAnICsgdmFsdWUpO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZW50aXR5L2NvbW1vbi1lbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERCREFPIGZyb20gJy4vZGFvL2RiLWRhbyc7XHJcbmltcG9ydCBEQkVudGl0eSBmcm9tICcuL2VudGl0eS9kYi1lbnRpdHknO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERCIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMueERCO1xyXG4gICAgICAgIHRoaXMuREJzID0ge307XHJcbiAgICAgICAgLy8gSW4gdGhlIGZvbGxvd2luZyBsaW5lLCB5b3Ugc2hvdWxkIGluY2x1ZGUgdGhlIHByZWZpeGVzIG9mIGltcGxlbWVudGF0aW9ucyB5b3Ugd2FudCB0byB0ZXN0LlxyXG4gICAgICAgIHRoaXMuaW5kZXhlZERCID0gd2luZG93LmluZGV4ZWREQiB8fCB3aW5kb3cubW96SW5kZXhlZERCIHx8IHdpbmRvdy53ZWJraXRJbmRleGVkREIgfHwgd2luZG93Lm1zSW5kZXhlZERCO1xyXG4gICAgICAgIC8vIERPTidUIHVzZSBcInZhciBpbmRleGVkREIgPSAuLi5cIiBpZiB5b3UncmUgbm90IGluIGEgZnVuY3Rpb24uXHJcbiAgICAgICAgLy8gTW9yZW92ZXIsIHlvdSBtYXkgbmVlZCByZWZlcmVuY2VzIHRvIHNvbWUgd2luZG93LklEQiogb2JqZWN0czpcclxuICAgICAgICB0aGlzLklEQlRyYW5zYWN0aW9uID0gd2luZG93LklEQlRyYW5zYWN0aW9uIHx8IHdpbmRvdy53ZWJraXRJREJUcmFuc2FjdGlvbiB8fCB3aW5kb3cubXNJREJUcmFuc2FjdGlvbiB8fCB7XHJcbiAgICAgICAgICAgIFJFQURfV1JJVEU6IFwicmVhZHdyaXRlXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFRoaXMgbGluZSBzaG91bGQgb25seSBiZSBuZWVkZWQgaWYgaXQgaXMgbmVlZGVkIHRvIHN1cHBvcnQgdGhlIG9iamVjdCdzIGNvbnN0YW50cyBmb3Igb2xkZXIgYnJvd3NlcnNcclxuICAgICAgICB0aGlzLklEQktleVJhbmdlID0gd2luZG93LklEQktleVJhbmdlIHx8IHdpbmRvdy53ZWJraXRJREJLZXlSYW5nZSB8fCB3aW5kb3cubXNJREJLZXlSYW5nZTtcclxuICAgICAgICAvLyAoTW96aWxsYSBoYXMgbmV2ZXIgcHJlZml4ZWQgdGhlc2Ugb2JqZWN0cywgc28gd2UgZG9uJ3QgbmVlZCB3aW5kb3cubW96SURCKilcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7SURCRGF0YWJhc2UgfSBfIFxyXG4gICAgICovXHJcbiAgICBzZXREQihuYW1lLCBfKSB7XHJcbiAgICAgICAgdGhpcy5EQnNbbmFtZV0gPSBfO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBnZXREQihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuREJzW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy54REIpIHtcclxuICAgICAgICAgICAgdGhpcy54REIgPSBuZXcgREIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueERCO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7REJFbnRpdHl8T2JqZWN0fSB4REJFbnRpdHkgXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldHVwKHhEQkVudGl0eSkge1xyXG4gICAgICAgIGlmICghKHhEQkVudGl0eSBpbnN0YW5jZW9mIERCRW50aXR5KSkge1xyXG4gICAgICAgICAgICB4REJFbnRpdHkgPSBEQkVudGl0eS5mcm9tSlNPTih4REJFbnRpdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBuZXcgQ29uZmlnKCkuY29uaWZnKHhEQkVudGl0eSkudGhlbihfID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW5zdCgpLnNldERCKHhEQkVudGl0eS5kYXRhYmFzZU5hbWUsIF8pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmdldEluc3QoKVt4REJFbnRpdHkuZGF0YWJhc2VOYW1lXSA9IG5ldyBEQkRBTyh4REJFbnRpdHkpKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RiLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEdldEFsbERBTywgQ3Vyc29yREFPLCBDdXJzb3JVcGRhdGVEQU8sIEN1cnNvckRlbGV0ZURBTywgQUNUSU9OIH0gZnJvbSAnLi9kYW8nO1xyXG5cclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vLi4vdXRpbC91dGlscyc7XHJcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vLi4vdXRpbC9jb2xsZWN0aW9uJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tb25EQU8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhYmFzZU5hbWUgXHJcbiAgICAgKiBAcGFyYW0ge1N0b3JlRW50aXR5fSB4U3RvcmVFbnRpdHkgXHJcbiAgICAgKiBAcGFyYW0ge0ZpbHRlcn0gZmlsdGVyIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhYmFzZU5hbWUsIHhTdG9yZUVudGl0eSwgZmlsdGVyKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YWJhc2VOYW1lID0gZGF0YWJhc2VOYW1lO1xyXG4gICAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeFN0b3JlRW50aXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3hTdG9yZUVudGl0eSA9IHhTdG9yZUVudGl0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheVtTdHJpbmddfFN0cmluZ30gY29sdW1ucyBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaW1pdCBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBcclxuICAgICAqL1xyXG4gICAgZ2V0KGNvbHVtbnMsIGxpbWl0LCBzdGFydCkge1xyXG4gICAgICAgIGxldCBkYW87XHJcbiAgICAgICAgaWYgKElEQk9iamVjdFN0b3JlLnByb3RvdHlwZS5nZXRBbGwgJiYgY29sdW1ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRhbyA9IG5ldyBHZXRBbGxEQU8oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIShjb2x1bW5zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zID0gW2NvbHVtbnNdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbyA9IG5ldyBDdXJzb3JEQU8oY29sdW1ucywgbGltaXQsIHN0YXJ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbihkYW8pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXlbU3RyaW5nXXxTdHJpbmd9IGNvbHVtbnMgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGltaXQgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgXHJcbiAgICAgKi9cclxuICAgIGdldERpc3QoY29sdW1uLCBsaW1pdCwgc3RhcnQpIHtcclxuICAgICAgICBpZiAoIShVdGlscy5pc0F2YWlsKGNvbHVtbikgJiYgdHlwZW9mIGNvbHVtbiA9PT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGNvbHVtbiArICcgaXMgZWl0aGVyIG5vdCBkZWZpbmVkIG9yIG5vdCB0eXBlb2Ygc3RyaW5nJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb24obmV3IEN1cnNvckRBTyhbY29sdW1uXSwgbGltaXQsIHN0YXJ0KSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKHZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb24obmV3IEN1cnNvclVwZGF0ZURBTyh2YWx1ZXMpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIGRlbGV0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uKG5ldyBDdXJzb3JEZWxldGVEQU8oKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtEQU99IGRhbyBcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzdGluY3QgXHJcbiAgICAgKi9cclxuICAgIF9hY3Rpb24oZGFvLCBkaXN0aW5jdCkge1xyXG4gICAgICAgIGRhby5zZXRGaWx0ZXIodGhpcy5fZmlsdGVyKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy9UbyBjaGVjayBhZGQgb2JqZWN0IGJlZm9yZSBpbnNlcnRpbmdcclxuICAgICAgICAgICAgICAgIGlmIChkYW8uY2hlY2sodGhpcy5feFN0b3JlRW50aXR5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcShkYW8sIGRpc3RpbmN0LCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZGFvLmVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtEQU99IGRhbyBcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzdGluY3QgXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IFxyXG4gICAgICovXHJcbiAgICBfcmVxKGRhbywgZGlzdGluY3QsIHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGxldCBvYmplY3RTdG9yZSA9IGRhby5vYmplY3RTdG9yZSh0aGlzLl9kYXRhYmFzZU5hbWUsIHRoaXMuX3hTdG9yZUVudGl0eS5uYW1lKTtcclxuICAgICAgICAvL0NyZWF0ZSBDdXJzb3IgT2JqZWN0XHJcbiAgICAgICAgbGV0IGN1cnNvclJlc3VsdCA9IG5ldyBDb2xsZWN0aW9uKCk7XHJcbiAgICAgICAgLy9jdXJzb3JSZXN1bHQuc2V0RGlzdGluY3QoZGlzdGluY3QpO1xyXG4gICAgICAgIC8vcmVxdWVzdCBhY3Rpb25cclxuICAgICAgICBsZXQgcmVxID0gb2JqZWN0U3RvcmVbZGFvLmFjdGlvbl0oZGFvLnZhbHVlcyk7XHJcbiAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhby5hY3Rpb24gPT09IEFDVElPTi5DVVJTT1IpIHsgLy9DdXJzb3JcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnNvcihldmVudCwgZGFvLCBjdXJzb3JSZXN1bHQsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5yZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc3VsdCA9IGN1cnNvclJlc3VsdC5jb25jYXQoZXZlbnQudGFyZ2V0LnJlc3VsdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yUmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoY3Vyc29yUmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IFxyXG4gICAgICogQHBhcmFtIHtEQU99IGRhbyBcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGN1cnNvclJlc3VsdCBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgXHJcbiAgICAgKi9cclxuICAgIF9jdXJzb3IoZXZlbnQsIGRhbywgY3Vyc29yUmVzdWx0LCByZXNvbHZlKSB7XHJcbiAgICAgICAgbGV0IGN1cnNvciA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgaWYgKGRhby5zdGFydCkge1xyXG4gICAgICAgICAgICBjdXJzb3IuYWR2YW5jZShkYW8uc3RhcnQpO1xyXG4gICAgICAgICAgICBkYW8uc3RhcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGN1cnNvciAmJiAoIWRhby5saW1pdCB8fCBjdXJzb3JSZXN1bHQubGVuZ3RoIDwgZGFvLmxpbWl0KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhby5jb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhby5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3Vyc29yLnZhbHVlW2Rhby5jb2x1bW5zWzBdXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY3Vyc29yLnZhbHVlW2Rhby5jb2x1bW5zWzBdXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW8uY29sdW1ucy5mb3JFYWNoKChjb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJzb3IudmFsdWVbY29sdW1uXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtjb2x1bW5dID0gY3Vyc29yLnZhbHVlW2NvbHVtbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY3Vyc29yLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhby5maWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBjdXJzb3IudmFsdWVbZGFvLmZpbHRlci5pbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGFvLmZpbHRlci50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmRzV2l0aCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5lbmRzV2l0aChkYW8uZmlsdGVyLnZhbHVlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGFvLmZpbHRlci50eXBlICsgXCIgY29uZGl0aW9uIGlzIG5vdCBoYW5kbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGFvLm5ld1ZhbHVlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXBkYXRlRGF0YSA9IE9iamVjdC5hc3NpZ24oY3Vyc29yLnZhbHVlLCBkYW8ubmV3VmFsdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IGN1cnNvci51cGRhdGUodXBkYXRlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3JSZXN1bHQucHVzaChldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQudGFyZ2V0LmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhby5uZXdBY3Rpb24gPT09IEFDVElPTi5ERUxFVEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IGN1cnNvci5kZWxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc3VsdC5wdXNoKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc3VsdC5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGFvLm5ld0FjdGlvbiA9PT0gQUNUSU9OLkRFTEVURSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvclJlc3VsdCA9IGN1cnNvclJlc3VsdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGN1cnNvclJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kYW8vY29tbW9uLWRhby5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgREIgZnJvbSAnLi8uLi9kYic7XHJcbmltcG9ydCB7IEZpbHRlciwgRklMVEVSX1RZUEUsIEZJTFRFUl9TUExJVFRFUiB9IGZyb20gJy4vZmlsdGVyJztcclxuaW1wb3J0IFV0aWxzIGZyb20gJy4vLi4vdXRpbC91dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OID0ge1xyXG4gICAgQUREOiAnYWRkJyxcclxuICAgIEdFVDogJ2dldCcsXHJcbiAgICBHRVRfQUxMOiAnZ2V0QWxsJyxcclxuICAgIENVUlNPUjogJ29wZW5DdXJzb3InLFxyXG4gICAgUFVUOiAncHV0JyxcclxuICAgIERFTEVURTogJ2RlbGV0ZScsXHJcbiAgICBDTEVBUjogJ2NsZWFyJyxcclxuICAgIENPVU5UOiAnY291bnQnXHJcbn07XHJcbmV4cG9ydCBjb25zdCBBQ0NFU1MgPSB7XHJcbiAgICBSRUFEX1dSSVRFOiAncmVhZHdyaXRlJyxcclxuICAgIFJFQURfT05MWTogJ3JlYWRvbmx5J1xyXG59O1xyXG5jbGFzcyBEQU8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QUNDRVNTfSBhY2Nlc3MgXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaW5kZXggXHJcbiAgICAgKiBAcGFyYW0ge0FDVElPTn0gYWN0aW9uIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXkgXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5W09iamVjdF18T2JqZWN0fSB2YWx1ZXMgXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5W1N0cmluZ118U3RyaW5nfSBjb2x1bW5zIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihhY2Nlc3MsIGluZGV4LCBhY3Rpb24sIGtleSwgdmFsdWVzLCBjb2x1bW5zLCBsaW1pdCwgc3RhcnQpIHtcclxuICAgICAgICB0aGlzLmFjY2VzcyA9IGFjY2VzcztcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgdGhpcy5fa2V5ID0ga2V5O1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XHJcbiAgICAgICAgdGhpcy5saW1pdCA9IGxpbWl0O1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2tlY2sgdHlwZW9mIGtleSBiZWZvcmUgc2V0dGluZyB0byBvYmplY3RcclxuICAgICAqL1xyXG4gICAgc2V0IF9rZXkoa2V5KSB7XHJcbiAgICAgICAgaWYgKFV0aWxzLmlzQXZhaWwoa2V5KSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2Yga2V5ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihrZXkgKyBcIiBzaG91bGQgYmUgb2YgdHlwZSBzdHJpbmcgfCBudW1iZXIgb25seVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YWJhc2VOYW1lIFxyXG4gICAgICovXHJcbiAgICBnZXREQihkYXRhYmFzZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gREIuZ2V0SW5zdCgpLmdldERCKGRhdGFiYXNlTmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFiYXNlTmFtZSBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdG9yZU5hbWUgXHJcbiAgICAgKi9cclxuICAgIG9iamVjdFN0b3JlKGRhdGFiYXNlTmFtZSwgc3RvcmVOYW1lKSB7XHJcbiAgICAgICAgaWYgKCFzdG9yZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZSBpcyBub3QgZGVmaW5lZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHJhbnMgPSB0aGlzLmdldERCKGRhdGFiYXNlTmFtZSkudHJhbnNhY3Rpb24oW3N0b3JlTmFtZV0sIHRoaXMuYWNjZXNzKTtcclxuICAgICAgICB0cmFucy5vbmNvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJhbnMub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoZXZlbnQudGFyZ2V0LmVycm9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5pbmRleCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdGhpcy5pbmRleCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0U3RvcmUgPSBvYmplY3RTdG9yZS5pbmRleCh0aGlzLmluZGV4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgnT25seSBvbmUga2V5IGlzIGFsb3dlZCBpbiB1cGRhdGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqZWN0U3RvcmU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVudGl0eSBcclxuICAgICAqL1xyXG4gICAgY2hlY2soZW50aXR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uID09PSBBQ1RJT04uQUREKSB7XHJcbiAgICAgICAgICAgIGlmICghZW50aXR5LmF1dG9JbmNyZW1lbnQgJiYgIXRoaXMudmFsdWVzW2VudGl0eS5rZXlQYXRoXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVudGl0eS5rZXlQYXRoICsgJyBpcyBub3QgZGVmaW5lZCBpbiAnICsgZW50aXR5Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW50aXR5LmluZGV4ZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleC5udWxsYWJsZSA9PT0gZmFsc2UgJiYgIXRoaXMudmFsdWVzW2luZGV4Lm5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvciA9IGluZGV4Lm5hbWUgKyAnIGlzIG5vdCBkZWZpbmVkIGluICcgKyBlbnRpdHkubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3Rpb24gPT09IEFDVElPTi5DVVJTT1IgJiYgVXRpbHMuaXNBdmFpbCh0aGlzLm5ld1ZhbHVlcykpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RmlsdGVyfSBmaWx0ZXIgXHJcbiAgICAgKi9cclxuICAgIHNldEZpbHRlcihmaWx0ZXIpIHtcclxuICAgICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci50eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBmaWx0ZXIuaW5kZXg7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZmlsdGVyLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRklMVEVSX1RZUEUuRVFVQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBEQi5nZXRJbnN0KCkuSURCS2V5UmFuZ2Uub25seShmaWx0ZXIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBGSUxURVJfVFlQRS5TVEFSVFNfV0lUSDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IERCLmdldEluc3QoKS5JREJLZXlSYW5nZS5ib3VuZChmaWx0ZXIudmFsdWUsIGZpbHRlci52YWx1ZSArICdcXHVmZmZmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEZJTFRFUl9UWVBFLkdSRUFURVJfVEhBTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IERCLmdldEluc3QoKS5JREJLZXlSYW5nZS5sb3dlckJvdW5kKGZpbHRlci52YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEZJTFRFUl9UWVBFLkxFU1NFUl9USEFOOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gREIuZ2V0SW5zdCgpLklEQktleVJhbmdlLnVwcGVyQm91bmQoZmlsdGVyLnZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRklMVEVSX1RZUEUuR1JFQVRFUl9USEFOX09SX0VRVUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gREIuZ2V0SW5zdCgpLklEQktleVJhbmdlLmxvd2VyQm91bmQoZmlsdGVyLnZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEZJTFRFUl9UWVBFLkxFU1NFUl9USEFOX09SX0VRVUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gREIuZ2V0SW5zdCgpLklEQktleVJhbmdlLnVwcGVyQm91bmQoZmlsdGVyLnZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEZJTFRFUl9UWVBFLkJFVFdFRU46XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvdW5kcyA9IGZpbHRlci52YWx1ZS5zcGxpdCgnficpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID0gREIuZ2V0SW5zdCgpLklEQktleVJhbmdlLmJvdW5kKE51bWJlcihib3VuZHNbMF0pLCBOdW1iZXIoYm91bmRzWzFdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24gPSBBQ1RJT04uQ1VSU09SO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmNsYXNzIEFkZERBTyBleHRlbmRzIERBTyB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtBcnJheVtPYmplY3RdfE9iamVjdH0gdmFsdWVzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcclxuICAgICAgICBzdXBlcihBQ0NFU1MuUkVBRF9XUklURSwgdW5kZWZpbmVkLCBBQ1RJT04uQURELCB1bmRlZmluZWQsIHZhbHVlcyk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ2xlYXJEQU8gZXh0ZW5kcyBEQU8ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoQUNDRVNTLlJFQURfV1JJVEUsIHVuZGVmaW5lZCwgQUNUSU9OLkNMRUFSKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDb3VudERBTyBleHRlbmRzIERBTyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBQ0NFU1MuUkVBRF9PTkxZLCB1bmRlZmluZWQsIEFDVElPTi5DT1VOVCk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRGVsZXRlREFPIGV4dGVuZHMgREFPIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2V5KSB7XHJcbiAgICAgICAgc3VwZXIoQUNDRVNTLlJFQURfV1JJVEUsIHVuZGVmaW5lZCwgQUNUSU9OLkRFTEVURSwga2V5KTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBVcGRhdGVEQU8gZXh0ZW5kcyBEQU8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5IFxyXG4gICAgICogQHBhcmFtIHtBcnJheVtPYmplY3RdfE9iamVjdH0gdmFsdWVzIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZXMpIHtcclxuICAgICAgICBzdXBlcihBQ0NFU1MuUkVBRF9XUklURSwgdW5kZWZpbmVkLCBBQ1RJT04uUFVULCB1bmRlZmluZWQsIHZhbHVlcyk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgR2V0REFPIGV4dGVuZHMgREFPIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioa2V5KSB7XHJcbiAgICAgICAgc3VwZXIoQUNDRVNTLlJFQURfT05MWSwgdW5kZWZpbmVkLCBBQ1RJT04uR0VULCBrZXkpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEdldEFsbERBTyBleHRlbmRzIERBTyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihBQ0NFU1MuUkVBRF9PTkxZLCB1bmRlZmluZWQsIEFDVElPTi5HRVRfQUxMKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDdXJzb3JEQU8gZXh0ZW5kcyBEQU8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7QXJyYXlbU3RyaW5nXXxTdHJpbmd9IGNvbHVtbnMgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGltaXQgXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNvbHVtbnMsIGxpbWl0LCBzdGFydCkge1xyXG4gICAgICAgIHN1cGVyKEFDQ0VTUy5SRUFEX1dSSVRFLCB1bmRlZmluZWQsIEFDVElPTi5DVVJTT1IsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb2x1bW5zLCBsaW1pdCwgc3RhcnQpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEN1cnNvclVwZGF0ZURBTyBleHRlbmRzIERBTyB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodmFsdWVzKSB7XHJcbiAgICAgICAgc3VwZXIoQUNDRVNTLlJFQURfV1JJVEUsIHVuZGVmaW5lZCwgQUNUSU9OLkNVUlNPUik7XHJcbiAgICAgICAgdGhpcy5uZXdWYWx1ZXMgPSB2YWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ3Vyc29yRGVsZXRlREFPIGV4dGVuZHMgREFPIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKEFDQ0VTUy5SRUFEX1dSSVRFLCB1bmRlZmluZWQsIEFDVElPTi5DVVJTT1IpO1xyXG4gICAgICAgIHRoaXMubmV3QWN0aW9uID0gQUNUSU9OLkRFTEVURTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgREFPLCBHZXREQU8sIEdldEFsbERBTywgQWRkREFPLCBDbGVhckRBTywgQ291bnREQU8sIFVwZGF0ZURBTywgRGVsZXRlREFPLCBDdXJzb3JEQU8sIEN1cnNvckRlbGV0ZURBTywgQ3Vyc29yVXBkYXRlREFPIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGFvL2Rhby5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgU3RvcmVEQU8gZnJvbSAnLi9zdG9yZS1kYW8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgREJEQU8ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7REJFbnRpdHl9IHhEQkVudGl0eSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeERCRW50aXR5KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YWJhc2VOYW1lID0geERCRW50aXR5LmRhdGFiYXNlTmFtZTtcclxuICAgICAgICB4REJFbnRpdHkuc3RvcmVzLmZvckVhY2goeFN0b3JlRW50aXR5ID0+IHtcclxuICAgICAgICAgICAgdGhpc1t4U3RvcmVFbnRpdHkubmFtZV0gPSBuZXcgU3RvcmVEQU8oeERCRW50aXR5LmRhdGFiYXNlTmFtZSwgeFN0b3JlRW50aXR5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRlbGV0ZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldERCKCkuY2xvc2UoKTtcclxuICAgICAgICAgICAgbGV0IHJlcSA9IERCLmdldEluc3QoKS5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UodGhpcy5fZGF0YWJhc2VOYW1lKTtcclxuICAgICAgICAgICAgcmVxLm9uc3VjY2VzcyA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnRGF0YWJhc2UgZGVsZXRlZCBTdWNjZXNzZnVsbHknKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kYW8vZGItZGFvLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDb21tb25EQU8gZnJvbSAnLi9jb21tb24tZGFvJztcclxuaW1wb3J0IHsgSW5kZXhEQU8sIE5JbmRleERBTyB9IGZyb20gJy4vaW5kZXgtZGFvJztcclxuXHJcbmltcG9ydCB7IEFkZERBTywgQ2xlYXJEQU8sIENvdW50REFPLCBEZWxldGVEQU8sIFVwZGF0ZURBTyB9IGZyb20gJy4vZGFvJztcclxuXHJcbmltcG9ydCB7IEZpbHRlciwgRklMVEVSX1RZUEUgfSBmcm9tICcuL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZURBTyBleHRlbmRzIENvbW1vbkRBTyB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFiYXNlTmFtZSBcclxuICAgICAqIEBwYXJhbSB7U3RvcmVFbnRpdHl9IHhTdG9yZUVudGl0eSBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YWJhc2VOYW1lLCB4U3RvcmVFbnRpdHkpIHtcclxuICAgICAgICBzdXBlcihkYXRhYmFzZU5hbWUsIHhTdG9yZUVudGl0eSk7XHJcbiAgICAgICAgeFN0b3JlRW50aXR5LmluZGV4ZXMuZm9yRWFjaCh4SW5kZXhFbnRpdHkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeEluZGV4REFPO1xyXG4gICAgICAgICAgICBpZiAoeEluZGV4RW50aXR5LnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHhJbmRleERBTyA9IG5ldyBOSW5kZXhEQU8oZGF0YWJhc2VOYW1lLCB4U3RvcmVFbnRpdHksIHhJbmRleEVudGl0eSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4SW5kZXhEQU8gPSBuZXcgSW5kZXhEQU8oZGF0YWJhc2VOYW1lLCB4U3RvcmVFbnRpdHksIHhJbmRleEVudGl0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpc1t4SW5kZXhFbnRpdHkubmFtZV0gPSB4SW5kZXhEQU87XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHhTdG9yZUVudGl0eS50eXBlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXNbeFN0b3JlRW50aXR5LmtleVBhdGhdID0gbmV3IE5JbmRleERBTyhkYXRhYmFzZU5hbWUsIHhTdG9yZUVudGl0eSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpc1t4U3RvcmVFbnRpdHkua2V5UGF0aF0gPSBuZXcgSW5kZXhEQU8oZGF0YWJhc2VOYW1lLCB4U3RvcmVFbnRpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVzIFxyXG4gICAgICovXHJcbiAgICBhZGQodmFsdWVzKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsayA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYnVsay5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBidWxrLnZhbHVlcyA9IHZhbHVlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1bGtBZGQoYnVsaywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbihuZXcgQWRkREFPKHZhbHVlcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYnVsayBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgXHJcbiAgICAgKi9cclxuICAgIF9idWxrQWRkKGJ1bGssIHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmIChidWxrLmluZGV4IDwgYnVsay52YWx1ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbihuZXcgQWRkREFPKGJ1bGsudmFsdWVzW2J1bGsuaW5kZXhdKSkudGhlbihldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBidWxrLmluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWxrQWRkKGJ1bGssIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudCwgYnVsay52YWx1ZXNbYnVsay5pbmRleF0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoYnVsay5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb24obmV3IENsZWFyREFPKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb24obmV3IENvdW50REFPKCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5IFxyXG4gICAgICovXHJcbiAgICBkZWxldGUoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbihuZXcgRGVsZXRlREFPKGtleSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5IFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyBcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGtleSwgdmFsdWVzKSB7XHJcbiAgICAgICAgdmFsdWVzW3RoaXMuX3hTdG9yZUVudGl0eS5rZXlQYXRoXSA9IGtleTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uKG5ldyBVcGRhdGVEQU8odmFsdWVzKSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kYW8vc3RvcmUtZGFvLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBVdGlscyBmcm9tICcuLy4uL3V0aWwvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5IHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRpc3RpbmN0IFxyXG4gICAgICovXHJcbiAgICBzZXREaXN0aW5jdChkaXN0aW5jdCkge1xyXG4gICAgICAgIHRoaXMuZGlzdGluY3QgPSBkaXN0aW5jdDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHB1c2godmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXN0aW5jdCAmJiB0aGlzLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnB1c2godmFsdWUpXHJcbiAgICB9XHJcbiAgICBjb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbHVtbiBcclxuICAgICAqL1xyXG4gICAgYXZnKGNvbHVtbikge1xyXG4gICAgICAgIGlmICghKFV0aWxzLmlzQXZhaWwoY29sdW1uKSAmJiB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHByb3ZpZGUgY29sdW1uIHRvIGZpbmQgbWluJylcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF2ZyA9IDA7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZVtjb2x1bW5dIDogdmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0F2YWlsKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgYXZnICs9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXZnIC8gdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbHVtbiBcclxuICAgICAqL1xyXG4gICAgbWluKGNvbHVtbikge1xyXG4gICAgICAgIGlmICghKFV0aWxzLmlzQXZhaWwoY29sdW1uKSAmJiB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGxlYXNlIHByb3ZpZGUgY29sdW1uIHRvIGZpbmQgbWluJylcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1pbjtcclxuICAgICAgICB0aGlzLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IHZhbHVlW2NvbHVtbl0gOiB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCFtaW4gfHwgbWluID4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29sdW1uIFxyXG4gICAgICovXHJcbiAgICBtYXgoY29sdW1uKSB7XHJcbiAgICAgICAgaWYgKCEoVXRpbHMuaXNBdmFpbChjb2x1bW4pICYmIHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQbGVhc2UgcHJvdmlkZSBjb2x1bW4gdG8gZmluZCBtaW4nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWF4O1xyXG4gICAgICAgIHRoaXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gdmFsdWVbY29sdW1uXSA6IHZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIW1heCB8fCBtYXggPCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBDb2xsZWN0aW9uIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdXRpbC9jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDb21tb25EQU8gZnJvbSAnLi9jb21tb24tZGFvJztcclxuaW1wb3J0IHsgRmlsdGVyLCBGSUxURVJfVFlQRSwgRklMVEVSX1NQTElUVEVSIH0gZnJvbSAnLi9maWx0ZXInO1xyXG5cclxuXHJcbmNsYXNzIEluZGV4REFPIGV4dGVuZHMgQ29tbW9uREFPIHtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YWJhc2VOYW1lIFxyXG4gICAgICogQHBhcmFtIHtTdG9yZUVudGl0eX0geFN0b3JlRW50aXR5IFxyXG4gICAgICogQHBhcmFtIHtJbmRleEVudGl0eX0geEluZGV4RW50aXR5IFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhYmFzZU5hbWUsIHhTdG9yZUVudGl0eSwgeEluZGV4RW50aXR5KSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YWJhc2VOYW1lLCB4U3RvcmVFbnRpdHkpO1xyXG4gICAgICAgIHRoaXMuX3hJbmRleEVudGl0eSA9IHhJbmRleEVudGl0eTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBlcXVhbERpc3QodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uKEFDVElPTi5HRVQsIEFDQ0VTUy5SRUFEX09OTFksIHZhbHVlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbHVlIFxyXG4gICAgICovXHJcbiAgICBlcXVhbCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbW9uREFPKHRoaXMuX2RhdGFiYXNlTmFtZSwgdGhpcy5feFN0b3JlRW50aXR5LCBuZXcgRmlsdGVyKEZJTFRFUl9UWVBFLkVRVUFMLCB2YWx1ZSwgdGhpcy5feEluZGV4RW50aXR5KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgc3RhcnRzV2l0aCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbW9uREFPKHRoaXMuX2RhdGFiYXNlTmFtZSwgdGhpcy5feFN0b3JlRW50aXR5LCBuZXcgRmlsdGVyKEZJTFRFUl9UWVBFLlNUQVJUU19XSVRILCB2YWx1ZSwgdGhpcy5feEluZGV4RW50aXR5KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgZW5kc1dpdGgodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1vbkRBTyh0aGlzLl9kYXRhYmFzZU5hbWUsIHRoaXMuX3hTdG9yZUVudGl0eSwgbmV3IEZpbHRlcihGSUxURVJfVFlQRS5FTkRTX1dJVEgsIHZhbHVlLCB0aGlzLl94SW5kZXhFbnRpdHkpKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTkluZGV4REFPIGV4dGVuZHMgSW5kZXhEQU8ge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YWJhc2VOYW1lLCBzdG9yZU5hbWUsIHhJbmRleEVudGl0eSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGFiYXNlTmFtZSwgc3RvcmVOYW1lLCB4SW5kZXhFbnRpdHkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIGdyZWF0ZXJUaGFuKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21tb25EQU8odGhpcy5fZGF0YWJhc2VOYW1lLCB0aGlzLl94U3RvcmVFbnRpdHksIG5ldyBGaWx0ZXIoRklMVEVSX1RZUEUuR1JFQVRFUl9USEFOLCB2YWx1ZSwgdGhpcy5feEluZGV4RW50aXR5KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgbGVzc2VyVGhhbih2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbW9uREFPKHRoaXMuX2RhdGFiYXNlTmFtZSwgdGhpcy5feFN0b3JlRW50aXR5LCBuZXcgRmlsdGVyKEZJTFRFUl9UWVBFLkxFU1NFUl9USEFOLCB2YWx1ZSwgdGhpcy5feEluZGV4RW50aXR5KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgZ3JlYXRlclRoYW5PckVxdWFsKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21tb25EQU8odGhpcy5fZGF0YWJhc2VOYW1lLCB0aGlzLl94U3RvcmVFbnRpdHksIG5ldyBGaWx0ZXIoRklMVEVSX1RZUEUuR1JFQVRFUl9USEFOX09SX0VRVUFMLCB2YWx1ZSwgdGhpcy5feEluZGV4RW50aXR5KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgbGVzc2VyVGhhbk9yRXF1YWwodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbW1vbkRBTyh0aGlzLl9kYXRhYmFzZU5hbWUsIHRoaXMuX3hTdG9yZUVudGl0eSwgbmV3IEZpbHRlcihGSUxURVJfVFlQRS5MRVNTRVJfVEhBTl9PUl9FUVVBTCwgdmFsdWUsIHRoaXMuX3hJbmRleEVudGl0eSkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gc3RhcnQgXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGVuZCBcclxuICAgICAqL1xyXG4gICAgYmV0d2VlbihzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21tb25EQU8odGhpcy5fZGF0YWJhc2VOYW1lLCB0aGlzLl94U3RvcmVFbnRpdHksIG5ldyBGaWx0ZXIoRklMVEVSX1RZUEUuQkVUV0VFTiwgc3RhcnQgKyBGSUxURVJfU1BMSVRURVIgKyBlbmQsIHRoaXMuX3hJbmRleEVudGl0eSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBJbmRleERBTywgTkluZGV4REFPIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGFvL2luZGV4LWRhby5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgQ29tbW9uRW50aXR5IGZyb20gJy4vY29tbW9uLWVudGl0eSc7XHJcbmltcG9ydCBTdG9yZUVudGl0eSBmcm9tICcuL3N0b3JlLWVudGl0eSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEQkVudGl0eSBleHRlbmRzIENvbW1vbkVudGl0eSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFiYXNlTmFtZSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2ZXJzaW9uIFxyXG4gICAgICogQHBhcmFtIHtBcnJheVtTdG9yZUVudGl0eV19IHN0b3JlcyBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGF0YWJhc2VOYW1lLCB2ZXJzaW9uLCBzdG9yZXMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0dGVyKGRhdGFiYXNlTmFtZSwgXCJkYXRhYmFzZU5hbWVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXR0ZXIodmVyc2lvbiwgXCJ2ZXJzaW9uXCIsIHRydWUsIFwibnVtYmVyXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RvcmVzID0gc3RvcmVzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5W1N0b3JlRW50aXR5XX0gc3RvcmVzIFxyXG4gICAgICovXHJcbiAgICBzZXQgc2V0U3RvcmVzKHN0b3Jlcykge1xyXG4gICAgICAgIHRoaXMuc3RvcmVzID0gW107XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdG9yZXMgPT09ICdvYmplY3QnICYmIHN0b3JlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHN0b3Jlcy5mb3JFYWNoKHN0b3JlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKHN0b3JlIGluc3RhbmNlb2YgU3RvcmVFbnRpdHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmUgPSBTdG9yZUVudGl0eS5mcm9tSlNPTihzdG9yZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVzLnB1c2goc3RvcmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0b3JlcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3Ioc3RvcmVzICsgXCIgaXMgb2Ygbm90IG9mIHR5cGUgW09iamVjdHxBcnJheV1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0ganNvbiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21KU09OKGpzb24pIHtcclxuICAgICAgICByZXR1cm4gbmV3IERCRW50aXR5KGpzb24uZGF0YWJhc2VOYW1lLCBqc29uLnZlcnNpb24sIGpzb24uc3RvcmVzKTtcclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2VudGl0eS9kYi1lbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBDb21tb25FbnRpdHkgZnJvbSAnLi9jb21tb24tZW50aXR5JztcclxuaW1wb3J0IEluZGV4RW50aXR5IGZyb20gJy4vaW5kZXgtZW50aXR5JztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZUVudGl0eSBleHRlbmRzIENvbW1vbkVudGl0eSB7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVBhdGggXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5W0luZGV4RW50aXR5XX0gaW5kZXhlcyBcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXV0b0luY3JlbWVudCBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBrZXlQYXRoLCBpbmRleGVzLCBhdXRvSW5jcmVtZW50ID0gdHJ1ZSwgdHlwZSA9ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmF1dG9JbmNyZW1lbnQgPSBhdXRvSW5jcmVtZW50O1xyXG4gICAgICAgIHRoaXMuc2V0dGVyKG5hbWUsIFwibmFtZVwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNldHRlcihrZXlQYXRoLCBcImtleVBhdGhcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLnNldEluZGV4ZXMgPSBpbmRleGVzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5W0luZGV4RW50aXR5XX0gaW5kZXhlcyBcclxuICAgICAqL1xyXG4gICAgc2V0IHNldEluZGV4ZXMoaW5kZXhlcykge1xyXG4gICAgICAgIHRoaXMuaW5kZXhlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhlcyA9PT0gJ29iamVjdCcgJiYgaW5kZXhlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGluZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShpbmRleCBpbnN0YW5jZW9mIEluZGV4RW50aXR5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gSW5kZXhFbnRpdHkuZnJvbUpTT04oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleGVzLnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdpbmRleGVzJywgaW5kZXhlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbUpTT04oanNvbikge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3RvcmVFbnRpdHkoanNvbi5uYW1lLCBqc29uLmtleVBhdGgsIGpzb24uaW5kZXhlcywganNvbi5hdXRvSW5jcmVtZW50LCBqc29uLnR5cGUpO1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZW50aXR5L3N0b3JlLWVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENvbW1vbkVudGl0eSBmcm9tICcuL2NvbW1vbi1lbnRpdHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhFbnRpdHkgZXh0ZW5kcyBDb21tb25FbnRpdHkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB1bmlxdWUgXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG11bHRpRW50cnkgXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG51bGxhYmxlIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHVuaXF1ZSA9IGZhbHNlLCBtdWx0aUVudHJ5ID0gZmFsc2UsIG51bGxhYmxlID0gdHJ1ZSwgdHlwZSA9ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldHRlcihuYW1lLCAnbmFtZScpO1xyXG4gICAgICAgIHRoaXMudW5pcXVlID0gdW5pcXVlO1xyXG4gICAgICAgIHRoaXMubXVsdGlFbnRyeSA9IG11bHRpRW50cnk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLm51bGxhYmxlID0gbnVsbGFibGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGpzb24gXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tSlNPTihqc29uKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbmRleEVudGl0eShqc29uLm5hbWUsIGpzb24udW5pcXVlLCBqc29uLm11bHRpRW50cnksIGpzb24ubnVsbGFibGUsIGpzb24udHlwZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbnRpdHkvaW5kZXgtZW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maWcge1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7REJFbnRpdHl9IHhEQkVudGl0eSBcclxuICAgICAqL1xyXG4gICAgY29uaWZnKHhEQkVudGl0eSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXEgPSBEQi5nZXRJbnN0KCkuaW5kZXhlZERCLm9wZW4oeERCRW50aXR5LmRhdGFiYXNlTmFtZSwgeERCRW50aXR5LnZlcnNpb24pO1xyXG4gICAgICAgICAgICByZXEub251cGdyYWRlbmVlZGVkID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgeERCRW50aXR5LnN0b3Jlcy5mb3JFYWNoKHhTdG9yZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTdG9yZShldmVudC50YXJnZXQucmVzdWx0LCB4U3RvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucmVzdWx0Lm9udmVyc2lvbmNoYW5nZSA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQucmVzdWx0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJBIG5ldyB2ZXJzaW9uIG9mIHRoaXMgcGFnZSBpcyByZWFkeS4gUGxlYXNlIHJlbG9hZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXEub25ibG9ja2VkID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJQbGVhc2UgY2xvc2UgYWxsIG90aGVyIHRhYnMgd2l0aCB0aGlzIHNpdGUgb3BlbiFcIik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudC50YXJnZXQuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtJREJEYXRhYmFzZX0gXyBcclxuICAgICAqIEBwYXJhbSB7SURCT2JqZWN0U3RvcmV9IHhTdG9yZSBcclxuICAgICAqL1xyXG4gICAgY3JlYXRlU3RvcmUoXywgeFN0b3JlKSB7XHJcbiAgICAgICAgaWYgKF8ub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyh4U3RvcmUubmFtZSkpIHtcclxuICAgICAgICAgICAgXy5kZWxldGVPYmplY3RTdG9yZSh4U3RvcmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdG9yZUluc3QgPSBfLmNyZWF0ZU9iamVjdFN0b3JlKHhTdG9yZS5uYW1lLCB7IFwia2V5UGF0aFwiOiB4U3RvcmUua2V5UGF0aCwgXCJhdXRvSW5jcmVtZW50XCI6IHhTdG9yZS5hdXRvSW5jcmVtZW50IH0pO1xyXG4gICAgICAgIHhTdG9yZS5pbmRleGVzLmZvckVhY2goeEluZGV4RW50aXR5ID0+IHtcclxuICAgICAgICAgICAgc3RvcmVJbnN0LmNyZWF0ZUluZGV4KHhJbmRleEVudGl0eS5uYW1lLCB4SW5kZXhFbnRpdHkubmFtZSwgeyB1bmlxdWU6IHhJbmRleEVudGl0eS51bmlxdWUsIG11bHRpRW50cnk6IHhJbmRleEVudGl0eS5tdWx0aUVudHJ5IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBcclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbmZpZy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==