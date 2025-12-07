create database if not exists aplicaciones_web;
use aplicaciones_web;

create table direccion(
	id_direccion int auto_increment primary key,
	ciudad varchar(30) not null,
    calle varchar(30) not null,
    numero int not null,
    codigo_postal int
);

INSERT INTO direccion (ciudad, calle, numero, codigo_postal)
VALUES ('Madrid', 'General Pardiñas', 26, 28001);
select * from direccion;

create table concesionario(
	id_concesionario int auto_increment primary key,
    nombre varchar(50) not null,
    telefono varchar(20) not null,
    direccion_id int,
    foreign key (direccion_id) references direccion(id_direccion)
);

insert into concesionario (nombre, telefono, direccion_id) values ('Autos eléctricos Madrid', '652985542', 1);
select * from concesionario;

create table usuario(
	id_usuario int auto_increment primary key,
    nombre varchar(30) not null,
    apellido_paterno varchar(30) not null,
    apellido_materno varchar(30) null,
    rol enum('empleado', 'administrador') not null,
    email varchar(70) not null,
    password varchar(20) not null,
    telefono varchar(20) not null,
    contraste enum('normal', 'alto') default 'normal',
    tamanio_texto enum('pequeño', 'normal', 'grande') default 'normal',
    id_concesionario int,
	foreign key (id_concesionario) references concesionario(id_concesionario)
);

insert into usuario (nombre, apellido_paterno, apellido_materno, rol, email, password, telefono, contraste, tamanio_texto, id_concesionario) 
values ('diego','moreno', 'duarte', 'administrador','diegomorduar@gmail.com','diego','652284679','normal','normal', 1);

select * from usuario;

create table cliente(
	id_cliente int auto_increment primary key,
    nombre varchar(50) not null,
    apellido_paterno varchar(30) not null,
    apellido_materno varchar(30) null,
    dni varchar(30) not null,
    telefono varchar(30) not null,
    email varchar(70) null
);

create table automovil(
	id_automovil int auto_increment primary	key,
    matricula varchar(20) not null,
    marca varchar(30) not null,
    modelo varchar(30) not null,
    anio_matriculacion year not null,
	numero_plazas int not null,
    autonomia_km int null,
    precio_por_dia int not null,
    color varchar(20) not null,
    imagen varchar(50),
    estado enum('disponible','reservado','mantenimiento') default 'disponible',
    id_concesionario int,
    foreign key (id_concesionario) references concesionario(id_concesionario)
);

create table reserva(
    id_reserva int auto_increment primary key,
    id_usuario int,
    id_automovil int,
    id_cliente int,
    fecha_inicio date not null,
    fecha_fin date not null,
    precio_final int not null,
    estado enum('activa','finalizada', 'cancelada') default 'activa',
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_automovil) references automovil(id_automovil),
    foreign key (id_cliente) references cliente(id_cliente)
);
