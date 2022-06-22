
CREATE DATABASE proveedores;

USE proveedores;

-- TABLA users
-- todas las contraseñas seran encriptadas usando SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'prueba', 'password1', 'prueba registro');

SELECT * FROM users;

-- tabla proveedor
CREATE TABLE proveedor (
  id INT(11) NOT NULL,
  empresa VARCHAR(150) NOT NULL,
  rubro VARCHAR(150) NOT NULL,
  fecha DATE NOT NULL,
  domicilio VARCHAR(150) NOT NULL,
  RFC VARCHAR(150) NOT NULL,
  descripcion TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE proveedor
  ADD PRIMARY KEY (id);

ALTER TABLE proveedor
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE proveedor;

