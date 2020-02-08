DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;

USE employeedb;

CREATE TABLE employees(
  id INT(12) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT(12),
  manager_id INT(12),
  PRIMARY KEY (id
);

CREATE TABLE roles(
  id INT(12) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT(12),
  PRIMARY KEY (id)
);

CREATE TABLE departments(
  id INT(12) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);