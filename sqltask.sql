CREATE DATABASE IF NOT EXISTS sqltask;

CREATE TABLE suppliers(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    supplierName TEXT ,
    contactNumber TEXT
);


SELECT *
FROM suppliers;

SELECT *
FROM products;

SELECT *
FROM sales;




CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    name TEXT NOT NULL UNIQUE ,
    price DECIMAL(10,2) NOT NULL ,
    quantity INT NOT NULL ,
    supplierID INT ,
    FOREIGN KEY (supplierID) REFERENCES suppliers(id)
);

ALTER TABLE products
    ADD UNIQUE(name);


CREATE TABLE sales(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    productID INT,
    quantitySold INT,
    saleDate DATE,
    FOREIGN KEY (productID) REFERENCES products(id)
);