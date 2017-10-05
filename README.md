# jDB

>jDB is used to communicate with IndexedDB efficiently. jDB have set of predefined function which helps developers ease in writing object oriented code for storing, manipulating and retrieving data in indexedDB.

## Installing
### In Browser
```html
<script src="jdb.js"></script>
```
### npm
```
npm i --save xdb;
```
### In Node
```javascript
// ES2015
import {DB,Utils} from '@dharmesh-hemaram/jdb';

//require JS
let DB =  require('@dharmesh-hemaram/jdb').DB;
let Utils = require('@dharmesh-hemaram/jdb').Utils;

//AMD
define(['@dharmesh-hemaram/jdb'], function (jDB) {
  let DB = jDB.DB, Utils = jDB.Utils;
});

```
##Getting started
###Configuration
create database configuration file db_confog.json
```JSON
{
  "databaseName":"testDB",
  "version":1,
  "stores":[
    {
      "name":"customers",
      "keyPath":"customerId",
      "autoIncrement":false,
      "indexes":[
        {
          "name":"customerName",
          "nullable":false,
          "type":"string"
        },{}
      ]
    },{}
  ]
}
```
### Setup
```javascript
import {DB,Utils} from '@dharmesh-hemaram/jdb';
```
### Serve
```javascript
  DB.getInst().databaseName.storeName.get().then(result).catch(error);
```

### Query
[Click Me](query.md)

### Usefull Stuff:

 * [E-Mail](dharmesh.hemaram@gmail.com)
 * [Wiki](https://github.com/dharmesh-hemaram/jDB/wiki/)
 * [Test](https://dharmesh-hemaram.github.io/jDB/test.html)

## Licensing

"The code in this project is licensed under Apache 2.0 license."