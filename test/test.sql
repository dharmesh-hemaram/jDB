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