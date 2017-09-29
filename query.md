## DATABASE (SETUP)
```javascript
DB.setup(databaseJSON).then(dbInst => console.log(dbInst));
```

## To get DB instance
```javascript 
DB.getInst().
```
## Return Promise
```javascript
DB.getInst().databaseName.storeName.get()
	.then(result => console.log(result))
	.catch(error => console.error(error));
```


## DATABASE (DELETE)
```javascript
DB.getInst().databaseName.delete();
```
## STORE
### GET
* [databaseName.storeName.get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.get())
* [databaseName.storeName.get( ```index``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.get(['city']))
* [databaseName.storeName.get([ ```index``` , ```index``` ])](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.get(['customerName','city']))
* [databaseName.storeName.getDist( ```index``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.getDist('city'))
* [databaseName.storeName.getDist( ```index``` , ```limit``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.get('city',5))
* [databaseName.storeName.getDist( ```index``` , ```limit``` , ```start``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.get('city',5,5))
### ADD / UPDATE
* [databaseName.storeName.add( ```obj``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.add({customerName:'Dharmesh'}))
* [databaseName.storeName.update( ```keyId``` , ```obj``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.update(1,{customerName:'Dharmesh'}))
### DELETE
* [databaseName.storeName.clear()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.clear())
* [databaseName.storeName.count()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.count())

## INDEXES
### GET (String Index)
* [databaseName.storeName.indexName.equal('string').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.country.equal('Mexico').get())
* [databaseName.storeName.indexName.startsWith('string').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.country.startsWith('Mex').get())
* [databaseName.storeName.indexName.endsWith('string').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.country.endsWith('ico').get())
### GET (Number Index)
* [databaseName.storeName.indexName.greaterThan('number').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.greaterThan(5).get())
* [databaseName.storeName.indexName.lesserThan('number').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.lesserThan(5).get())
* [databaseName.storeName.indexName.greaterThanOrEqual('number').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.greaterThanOrEqual(5).get())
* [databaseName.storeName.indexName.lesserThanOrEqual('number').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.lesserThanOrEqual(5).get())
* [databaseName.storeName.indexName.between('start','end').get()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.between(1,5).get())
### UPDATE
* [databaseName.storeName.indexName.equal( ```string|number ``` ).update( ```obj``` )](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerId.equal(1).update({country:'India'}))
### DELETE
* [databaseName.storeName.indexName.equal( ```string|number ``` ).delete()](https://dharmesh-hemaram.github.io/jDB/index.html?query=customers.customerName.equal('Dharmesh').delete())

## COLLECTION
```javascript
databaseName.storeName.getDist('index').then(result => result.count()) databaseName.storeName.getDist('index').then(result => result.avg('index'))
databaseName.storeName.get('index').then(result => result.min('index'))
databaseName.storeName.get('index').then(result => result.max('index'))
``` 