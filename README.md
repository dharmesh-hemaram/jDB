# DB
[![NPM version][npm-image]][npm-url]

## About
DB is javascript library / wrapper used to communicate with IndexedDB efficiently. DB have set of predefined function which helps developers ease in writing object oriented code for storing, manipulating and retrieving data in indexedDB.

## Versions
**Changes in 1.0.2:**
- Updated code to remove unwanted methods and variables.


## Install
### In Browser
```html
<script src="DB.js"></script>
```
### npm
```
npm i --save DB;
```
### In Node
```javascript
// ES2015
import {DB} from '@dharmesh-hemaram/DB';

//require JS
let DB =  require('@dharmesh-hemaram/DB').DB;

//AMD
define(['@dharmesh-hemaram/DB'], function (package) {
  let DB = package.DB;
});

```
## Getting started
### Configuration
create database configuration file db_confog.json
```JSON
{
  "databaseName":"testDB",
  "version":1,
  "tables":[
    {
      "name":"customers",
      "keyPath":"customerId",
      "autoIncrement":false,
      "columns":[
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
import {DB} from '@dharmesh-hemaram/DB';

DB.setup(databaseJSON).then(dbInst => console.log(dbInst));
```
### Serve
```javascript
  DB.getInst().databaseName.tableName.get().then(result).catch(error);
```

### [Query](https://github.com/dharmesh-hemaram/DB/wiki/Query)

### Usefull Stuff:

 * [E-Mail](dharmesh.hemaram@gmail.com)
 * [Wiki](https://github.com/dharmesh-hemaram/DB/wiki/)
 * [Test](https://dharmesh-hemaram.github.io/DB/test.html)
 
 If this project help you reduce time to develop, you can give me a cup of coffee :)
 [![PayPal](https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png)](https://paypal.me/DharmeshH/25?_ga=1.267642062.1305492970.1507529951)

## Licensing

[The code in this project is licensed under Apache 2.0 license.](LICENSE)
