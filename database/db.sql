CREATE DATABASE easybackend;

USE easybackend;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
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


-- DATABASE TABLE
CREATE TABLE dbs (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  db TEXT NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);


ALTER TABLE dbs
  ADD PRIMARY KEY (id);

ALTER TABLE dbs
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE dbs;

-- MI CODIGO DE REPARACION DE LA BASE DE DATOS POR COMPATIBILIDAD DE MYSQL 8
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Revolution123?'