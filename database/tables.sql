
CREATE DATABASE inventory_db; 

USE inventory_db;


--TABLE  ROLES--
CREATE TABLE ROLES(
    rol_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    rol_name VARCHAR(50) NOT NULL
);

--TABLE USERS--
CREATE TABLE USERS(
    user_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    u_email VARCHAR(50) NOT NULL, 
    u_name VARCHAR(50) NOT NULL,
    u_password VARCHAR(255) NOT NULL,
    u_status BOOLEAN NOT NULL,
    rol_id INT(11) NOT NULL,
    FOREIGN KEY(rol_id) REFERENCES ROLES(rol_id)
);


--TABLE CATEGORIES --

CREATE TABLE CATEGORIES(
    category_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    c_name VARCHAR(50) NOT NULL,
    c_status BOOLEAN NOT NULL
);

--TABLE PRODUCTS--
CREATE TABLE PRODUCTS(
    product_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    category_id INT(11) NOT NULL,
    p_name VARCHAR(50) NOT NULL, 
    p_model VARCHAR(50) NOT NULL,
    p_photo VARCHAR(100) NOT NULL,
    p_detail TEXT,
    p_status BOOLEAN NOT NULL,
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
);


--TABLE INVENTORY--
CREATE TABLE INVENTORY(
    inventory_id INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_id INT(11) NOT NULL,
    inventory_stock INT(11) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

