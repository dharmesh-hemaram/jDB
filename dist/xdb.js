/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbDao = __webpack_require__(1);

var _dbDao2 = _interopRequireDefault(_dbDao);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DB = function () {
    function DB() {
        _classCallCheck(this, DB);

        this.xDB;
        this.DBs = {};
    }
    /**
     * 
     * @param {String} name 
     * @param {IDBDatabase } _ 
     */


    _createClass(DB, [{
        key: 'setDB',
        value: function setDB(name, _) {
            this.DBs[name] = _;
        }
        /**
         * 
         * @param {String} name 
         */

    }, {
        key: 'getDB',
        value: function getDB(name) {
            return this.DBs[name];
        }
    }], [{
        key: 'getInst',
        value: function getInst() {
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

    }, {
        key: 'setup',
        value: function setup(xDBEntity) {
            var _this = this;

            if (!(xDBEntity instanceof DBEntity)) {
                xDBEntity = DBEntity.fromJSON(xDBEntity);
            }
            return new Promise(function (resolve, reject) {
                new _config2.default().conifg(xDBEntity).then(function (_) {
                    _this.getInst().setDB(xDBEntity.databaseName, _);
                    resolve(_this.getInst()[xDBEntity.databaseName] = new _dbDao2.default(xDBEntity));
                }).catch(function (error) {
                    return reject(error);
                });
            });
        }
    }]);

    return DB;
}();

exports.default = DB;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBDAO = function () {
    /**
     * 
     * @param {DBEntity} xDBEntity 
     */
    function DBDAO(xDBEntity) {
        var _this = this;

        _classCallCheck(this, DBDAO);

        this._databaseName = xDBEntity.databaseName;
        xDBEntity.stores.forEach(function (xStoreEntity) {
            _this[xStoreEntity.name] = new StoreDAO(xDBEntity.databaseName, xStoreEntity);
        });
    }

    _createClass(DBDAO, [{
        key: 'delete',
        value: function _delete() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.getDB().close();
                var req = indexedDB.deleteDatabase(_this2._databaseName);
                req.onsuccess = function (event) {
                    resolve('Database deleted Successfully');
                };
                req.onerror = function (event) {
                    reject(event.target.error);
                };
            });
        }
    }]);

    return DBDAO;
}();

exports.default = DBDAO;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, [{
        key: "conifg",

        /**
         * 
         * @param {DBEntity} xDBEntity 
         */
        value: function conifg(xDBEntity) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var req = indexedDB.open(xDBEntity.databaseName, xDBEntity.version);
                req.onupgradeneeded = function (event) {
                    xDBEntity.stores.forEach(function (xStore) {
                        _this.createStore(event.target.result, xStore);
                    });
                    event.target.result.onversionchange = function (event) {
                        event.target.result.close();
                        alert("A new version of this page is ready. Please reload!");
                    };
                };
                req.onblocked = function (event) {
                    alert("Please close all other tabs with this site open!");
                };
                req.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                req.onerror = function (event) {
                    reject(event.target.error);
                };
            });
        }
        /**
         * 
         * @param {IDBDatabase} _ 
         * @param {IDBObjectStore} xStore 
         */

    }, {
        key: "createStore",
        value: function createStore(_, xStore) {
            if (_.objectStoreNames.contains(xStore.name)) {
                _.deleteObjectStore(xStore.name);
            }
            var storeInst = _.createObjectStore(xStore.name, { "keyPath": xStore.keyPath, "autoIncrement": xStore.autoIncrement });
            xStore.indexes.forEach(function (xIndexEntity) {
                storeInst.createIndex(xIndexEntity.name, xIndexEntity.name, { unique: xIndexEntity.unique, multiEntry: xIndexEntity.multiEntry });
            });
        }
    }]);

    return Config;
}();

exports.default = Config;

/***/ })
/******/ ]);