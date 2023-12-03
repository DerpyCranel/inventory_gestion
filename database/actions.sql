
--VIEW  USERS
CREATE VIEW  usersview  AS
SELECT  USERS.user_id,USERS.u_email,USERS.u_name,USERS.u_password,USERS.u_status,USERS.rol_id,ROLES.rol_name
FROM USERS INNER JOIN ROLES ON USERS.rol_id=ROLES.rol_id;


--VIEW  products
CREATE VIEW productsview AS
SELECT  PRODUCTS.product_id,CATEGORIES.c_name,CATEGORIES.category_id,PRODUCTS.p_name,PRODUCTS.p_model,PRODUCTS.p_photo,PRODUCTS.p_detail,
PRODUCTS.p_status FROM PRODUCTS  INNER JOIN CATEGORIES ON PRODUCTS.category_id = CATEGORIES.category_id;

--triggers  stock
delimiter |

CREATE TRIGGER inventory_in AFTER INSERT ON PRODUCTS
FOR EACH ROW
BEGIN
INSERT INTO INVENTORY SET product_id = new.product_id ,inventory_stock=1 ;
END;
|
delimiter ;