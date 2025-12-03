create database if not exists aplicaciones_web;
use aplicaciones_web;

create table direccion(
	id_direccion int auto_increment primary key,
	ciudad varchar(30) not null,
    calle varchar(30) not null,
    numero int not null,
    numero int not null,
    codigo_postal int
);

create table concesionario(
	id_concesionario int auto_increment primary key,
    nombre varchar(50) not null,
    telefono varchar(20) not null,
    direccion_id int,
    foreign key (direccion_id) references direccion(id_direccion)
);

create table usuario(
	id_usuario int auto_increment primary key,
    nombre varchar(30) not null,
    apellido_paterno varchar(30) not null,
    apellido_materno varchar(30) not null,
    rol enum('empleado', 'administrador') not null,
    email varchar(70) not null,
    contrasenia varchar(20) not null,
    telefono varchar(20) not null,
    contraste enum('normal', 'alto') default 'normal',
    tamanio_texto enum('pequeño', 'normal', 'grande') default 'normal',
    id_concesionario int,
	foreign key (id_concesionario) references concesionario(id_concesionario)
);

create table cliente(
	id_cliente int auto_increment primary key,
    nombre varchar(50) not null,
    apellido_paterno varchar(30) not null,
    apellido_materno varchar(30) null,
    dni varchar(30) not null,
    telefono varchar(30) not null,
    email varchar(70) null,
    id_direccion int,
    foreign key (id_direccion) references direccion(id_direccion)
);

create table automovil(
	id_automovil int auto_increment primary	key,
    matricula varchar(20) not null,
    marca varchar(30) not null,
    modelo varchar(30) not null,
    año_matriculacion year not null,
	numero_plazas int not null,
    autonomia_km int null,
    precio_por_km float(3,2) not null,-- tres digitos, dos de ellos despues del punto
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
    fecha_inicio date not null,
    fecha_fin date not null,
    precio_final float(7,2) default 0,-- 7 digitos, dos de ellos despues del punto
    estado enum('activa','finalizada', 'cancelada') default 'activa',
    kilometros_recorridos int null,
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_automovil) references automovil(id_automovil)
);