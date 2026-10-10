# ----6----
# A
INSERT INTO suppliers (supplierName, contactNumber)
VALUES ('FreshFoods', '01001234567');

# B
INSERT INTO products (name, price, quantity, supplierID)
SELECT 'Eggs', 20.00, 40, id
FROM suppliers
WHERE supplierName = 'FreshFoods';

INSERT INTO products (name, price, quantity, supplierID)
SELECT 'Milk', 15.00, 50, id
FROM suppliers
WHERE supplierName = 'FreshFoods';

INSERT INTO products (name, price, quantity, supplierID)
SELECT 'Bread', 10.00, 30, id
FROM suppliers
WHERE supplierName = 'FreshFoods';

# C
INSERT INTO sales (productID, quantitySold, saleDate)
SELECT id, 2, '2025-05-20'
FROM products
WHERE name = 'Milk';


# ----6----
UPDATE products
SET price = 25.00
WHERE name = 'Bread';

# ----7----
UPDATE products
SET price = 25.00
WHERE name = 'Bread';


# ----8----
DELETE FROM products
WHERE name = 'Eggs';


# ----9----
SELECT
    p.id,
    p.name,
    COALESCE(SUM(s.quantitySold), 0) AS totalQuantitySold
FROM products p
         LEFT JOIN sales s
                   ON p.id = s.productID
GROUP BY p.id, p.name;

# ----10----
SELECT *
FROM products
ORDER BY quantity DESC
LIMIT 1;

# ----11----
SELECT *
FROM suppliers
WHERE supplierName LIKE 'F%';

# ----12----
SELECT p.*
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM sales s
    WHERE s.productID = p.id
);


# ----13----
SELECT
    p.name AS productName,
    s.quantitySold,
    s.saleDate
FROM sales s
         INNER JOIN products p
                    ON s.productID = p.id;


# ----14----
CREATE USER 'store_manager'@'localhost'
    IDENTIFIED BY 'Choose_A_Strong_Password';

GRANT SELECT, INSERT, UPDATE
    ON sqltask.*
    TO 'store_manager'@'localhost';


# ----15----
REVOKE UPDATE
    ON sqltask.*
    FROM 'store_manager'@'localhost';


# ----16----
GRANT DELETE
    ON sqltask.sales
    TO 'store_manager'@'localhost';


SHOW GRANTS FOR 'store_manager'@'localhost';







SELECT *
FROM suppliers;

SELECT *
FROM products;

SELECT *
FROM sales;
