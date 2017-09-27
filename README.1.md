# xDB

xDB is used to communicate with IndexedDB efficiently. xDB have set of predefined function which helps developers ease in writing object oriented code for storing, manipulating and retrieving data in indexedDB.

### Setup up
`
npm install xdb;
`

### Config
create database configuration file db_confog.json
`JSON
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
          "name":"pincode"
          "type":"number"
        },
        {
          "name": "city"
        }
      ]
    },{
      "name":"orders",
      "keyPath":"orderId",
      "autoIncrement":false,
      "indexes":[
        {
          "name":"customerId",
          "nullable":false,
          "type":"number"
        },
        {
            "name": "orderDate",
            "nullable":false,
            "type": "date"
        }
      ]
    }
  ]
}
`

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
  DB.getInst().databaseName
```


### Query
```javascript
//STORE
    DB.getInst()[dbName].customers.get().then(result => console.log(result));
    DB.getInst()[dbName].customers.get(['customerName', 'city']).then(result => console.log(result));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result));
    DB.getInst()[dbName].customers.getDist('city', 5).then(result => console.log(result)); //limit = 5;
    DB.getInst()[dbName].customers.getDist('city', 5, 5).then(result => console.log(result)); //limit = 5, start = 5;
    //INDEXES
    DB.getInst()[dbName].customers.country.equal('Mexico').get(['customerName', 'City']);
    DB.getInst()[dbName].customers.country.startsWith('Mex').get(['customerName', 'City']);
    DB.getInst()[dbName].customers.country.endsWith('il').get(['customerName', 'City']);

    DB.getInst()[dbName].customers.customerId.greaterThan(1).get();
    DB.getInst()[dbName].customers.customerId.lesserThan(1).get();
    DB.getInst()[dbName].customers.customerId.greaterThanOrEqual(1).get();
    DB.getInst()[dbName].customers.customerId.lesserThanOrEqual(1).get();
    DB.getInst()[dbName].customers.customerId.between(1, 2).get();



    /**
     * ADD /UPDATE
     */
    // -----STORE
    DB.getInst()[dbName].customers.add(obj);
    DB.getInst()[dbName].customers.update(keyId, obj);

    // -----INDEXES
    DB.getInst()[dbName].customers.customerId.equal(1).update(obj);

    /**
     * DELETE
     */
    // -----STORE
    DB.getInst()[dbName].customers.clear();
    DB.getInst()[dbName].customers.count();
    // -----INDEXES
    DB.getInst()[dbName].customers.customerName.equal('Alfreds Futterkiste').delete();

    /**
     * COLLECT
     */
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.count()));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.avg('price')));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.min('price')));
    DB.getInst()[dbName].customers.getDist('city').then(result => console.log(result.max('price')));
```


Basic useful feature list:

 * Ctrl+S / Cmd+S to save the file
 * Ctrl+Shift+S / Cmd+Shift+S to choose to save as Markdown or HTML
 * Drag and drop a file into here to load it
 * File contents are saved in the URL so you can share files


I'm no good at writing sample / filler text
so go write something yourself.

Look
a list!

 * foo
 * bar
 * baz

And here's some code! :+1:



This is [on GitHub](https://github.com/jbt/markdown-editor) so let me know if I've b0rked it somewhere.


Props to Mr. Doob and his [code editor](http://mrdoob.com/projects/code-editor/)
from which
the inspiration to this
and some handy implementation hints
came. 

### Usefull Stuff:

 * [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing
 * [CodeMirror](http://codemirror.net/) for the awesome syntax-highlighted editor
 * [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) for syntax highlighting in output code blocks
 * [js-deflate](https://github.com/dankogai/js-deflate) for gzipping of data to make it fit in URLs
