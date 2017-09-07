## GET
select * from customers;												
select customerName,City from customers;								
select distinct country from customers									
select count(distinct country) from customers	
						
SELECT * FROM Customers WHERE Country='Mexico'; 						
SELECT * FROM Customers WHERE CustomerID=1;								
SELECT * FROM Customers WHERE CustomerID > 2;							
SELECT * FROM Customers WHERE CustomerID < 3;							
SELECT * FROM Customers WHERE CustomerID >= 2;							
SELECT * FROM Customers WHERE CustomerID <= 3;							
SELECT * FROM Customers WHERE CustomerID between(1,3);					
SELECT * FROM Customers WHERE CustomerID in(1,4,6);						
SELECT * FROM Customers WHERE Country='Germany' AND City='Berlin';		
SELECT * FROM Customers ORDER BY Country;								
SELECT * FROM Customers ORDER BY Country DESC;							
SELECT * FROM Customers ORDER BY Country ASC, CustomerName DESC;    	
SELECT LastName FROM Persons WHERE Address IS NOT NULL;					
SELECT * FROM Customers WHERE CustomerName LIKE 'a%';					
SELECT * FROM Customers WHERE CustomerName LIKE '%a';					
SELECT * FROM Customers WHERE CustomerName LIKE '%or%';					
SELECT * FROM Customers WHERE CustomerName LIKE '_r%';					
SELECT * FROM Customers WHERE CustomerName LIKE 'a_%_%';				
SELECT * FROM Customers WHERE CustomerName LIKE 'a%o';					
SELECT * FROM Customers WHERE CustomerName NOT LIKE 'a%';

## ADD / UPDATE
INSERT INTO Customers (CustomerName) VALUES ('Cardinal');				
UPDATE Customers SET ContactName = 'Alfred Schmidt' WHERE CustomerID = 1

## DELETE
DELETE FROM Customers WHERE CustomerName='Alfreds Futterkiste';			

## COLLECT
SELECT * FROM Customers WHERE Country='Germany' LIMIT 3;				
SELECT MIN(Price) FROM Products;										
SELECT MAX(Price) FROM Products;										
SELECT MIN(Price) AS SmallestPrice FROM Products;						
SELECT AVG(Price) FROM Products;										
SELECT COUNT(Price) FROM Products;										
SELECT COUNT(Price) FROM Products;										
SELECT SUM(Price) FROM Products;										

				

################################################## NEW VERSION ####################################################

## GET
----STORE
[x] DB.getInst().testDB.customers.get().then(result => console.log(result));
[x] DB.getInst().testDB.customers.get(['customerName','city']).then(result => console.log(result));
[x] DB.getInst().testDB.customers.getDist('city').then(result => console.log(result));	
---INDEXES
[ ] DB.getInst().testDB.customers.country.equal('Mexico').get(['customerName','City']);
[ ] DB.getInst().testDB.customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']);
[ ] DB.getInst().testDB.customers.country.equal('Mexico').or.city.equal('Berlin').get(['customerName','City']);
[ ] DB.getInst().testDB.customers.country.equal('Mexico').and.city.equal('Berlin').get(['customerName','City']).orderBy({'country':'DESC','customerName':'ASC'});
[ ] DB.getInst().testDB.persons.address.isNoNull().get(['lastName']);
[ ] DB.getInst().testDB.customers.customerName.like('a%').get();

## ADD /UPDATE
----STORE
[ ] DB.getInst().testDB.customers.add(obj);
[ ] DB.getInst().testDB.customers.update(keyId,obj);
[ ] DB.getInst().testDB.customers.update({customerName:'Sanjay'},obj);
---INDEXES
[ ] DB.getInst().testDB.customers.customerId.equal(1).update(obj);

## DELETE
----STORE
[ ] DB.getInst().testDB.customers.clear();
[ ] DB.getInst().testDB.customers.count();
---INDEXES
[ ] DB.getInst().testDB.customers.customerName.equal('Alfreds Futterkiste').delete();

## COLLECT
[x] DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.count()));
[ ] DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.avg(2)));
[ ] DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.limit(2)));
[ ] DB.getInst().testDB.customers.getDist('city')).then(result => console.log(result.min('price')));
[ ] DB.getInst().testDB.customers.getDist('city').then(result => console.log(result.max('price')));