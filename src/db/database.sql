create database node;

use node; 

create table usuario(
    id int  primary key AUTO_INCREMENT,
    Nombre varchar(50)  not null,
    Apellido varchar(50) not null,
    NombreUsuario varchar(50) not null,
    Pass VARCHAR(50) not NULL,
    Email varchar(100) not null,
    Direccion VARCHAR(100) not null,
    Telefono VARCHAR(10) not NULL,
    Pais varchar(50) not null,
    Provincia VARCHAR(50)not null
);


