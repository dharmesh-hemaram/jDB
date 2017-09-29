# xDB

xDB is used to communicate with IndexedDB efficiently. xDB have set of predefined function which helps developers ease in writing object oriented code for storing, manipulating and retrieving data in indexedDB.

### Installation
# In Browser
```html
<script src="jdb.js"></script>
```
# npm
```
npm i --save xdb;
```
# In Node
```javascript
// Load the full build.
var DB = require('jDB');
```


### Config
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
        },
        {
          "name":"pincode",
          "type":"number"
        },
        {
          "name": "city"
        }
      ]
    },{...}
  ]
}
```

### Setup
```javascript
import {Utils,DB} from 'xdb';
Utils.loadJSON('base/assets/db.json').then(database => {
    DB.setup(database).then(dbInst => {
        console.log(dbInst);
    });
}).catch(error => {
  console.error(error);
});
```

### Serve
```javascript
  DB.getInst().databaseName.storeName.get().then(result).catch(error);
```


### Query


### Usefull Stuff:

 * [E-Mail](dharmesh.hemaram@gmail.com)
 * [Wiki]()
 * [Test]()
