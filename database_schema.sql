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
VALUES ('Madrid', 'General Pardiñas', 26, 28001),
	('Barcelona', 'Avenida Diagonal', 123, 08019);

select * from direccion;

create table concesionario(
	id_concesionario int auto_increment primary key,
    nombre varchar(50) not null,
    telefono varchar(20) not null,
    direccion_id int,
    foreign key (direccion_id) references direccion(id_direccion)
);

INSERT INTO concesionario (nombre, telefono, direccion_id)
VALUES ('Autos eléctricos Madrid', '652985542', 1),
	('Concesionario Barcelona Premium', '931245678', 2);

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
values ('diego','moreno', 'duarte', 'administrador','diegomorduar@gmail.com','diego','652284679','normal','normal', 1),
	('Adrian', 'Moreno', 'Duarte', 'empleado', 'diegoadrianm@gmail.com', 'diego', '652984332', 'normal', 'normal', 2);

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
    autonomia_km int not null,
    precio_por_dia int not null,
    color varchar(20) not null,
    imagen varchar(50),
    estado enum('disponible','reservado','mantenimiento') default 'disponible',
    id_concesionario int,
    foreign key (id_concesionario) references concesionario(id_concesionario)
);

INSERT INTO automovil 
(matricula, marca, modelo, anio_matriculacion, numero_plazas, autonomia_km, precio_por_dia, color, imagen, estado, id_concesionario)
VALUES
('ABC1234', 'Toyota', 'Corolla', 2019, 5, 700, 45, 'Blanco', 'corolla.jpg', 'disponible', 1),
('DEF5678', 'Honda', 'Civic', 2020, 5, 720, 50, 'Negro', 'civic.jpg', 'disponible', 1),
('GHI9012', 'Ford', 'Focus', 2018, 5, 680, 40, 'Rojo', 'focus.jpg', 'mantenimiento', 1),
('JKL3456', 'Tesla', 'Model 3', 2021, 5, 450, 90, 'Azul', 'model3.jpg', 'disponible', 1),
('MNO7890', 'Renault', 'Clio', 2017, 5, 650, 35, 'Gris', 'clio.jpg', 'reservado', 1),
('PQR1234', 'BMW', 'Serie 1', 2020, 5, 750, 80, 'Blanco', 'serie1.jpg', 'disponible', 1),
('STU5678', 'Audi', 'A3', 2019, 5, 740, 85, 'Negro', 'a3.jpg', 'reservado', 1),
('VWX9012', 'Hyundai', 'Kona EV', 2022, 5, 480, 95, 'Verde', 'konaev.jpg', 'disponible', 1),
('YZA3456', 'Kia', 'Sportage', 2018, 5, 700, 55, 'Azul', 'sportage.jpg', 'mantenimiento', 1),
('BCD7890', 'Volkswagen', 'Golf', 2021, 5, 730, 60, 'Rojo', 'golf.jpg', 'disponible', 1);


INSERT INTO automovil 
(matricula, marca, modelo, anio_matriculacion, numero_plazas, autonomia_km, precio_por_dia, color, imagen, estado, id_concesionario)
VALUES
('XYZ1001', 'Seat', 'Ibiza', 2019, 5, 680, 40, 'Rojo', 'ibiza.jpg', 'disponible', 2),
('XYZ1002', 'Seat', 'Leon', 2020, 5, 720, 55, 'Negro', 'leon.jpg', 'disponible', 2),
('XYZ1003', 'Peugeot', '208', 2018, 5, 650, 38, 'Azul', '208.jpg', 'reservado', 2),
('XYZ1004', 'Peugeot', '3008', 2021, 5, 750, 70, 'Gris', '3008.jpg', 'disponible', 2),
('XYZ1005', 'Nissan', 'Leaf', 2022, 5, 400, 85, 'Blanco', 'leaf.jpg', 'disponible', 2),
('XYZ1006', 'Nissan', 'Qashqai', 2019, 5, 700, 60, 'Verde', 'qashqai.jpg', 'mantenimiento', 2),
('XYZ1007', 'Mercedes', 'Clase A', 2020, 5, 760, 90, 'Negro', 'clasea.jpg', 'disponible', 2),
('XYZ1008', 'Mercedes', 'EQA', 2023, 5, 430, 110, 'Azul', 'eqa.jpg', 'disponible', 2),
('XYZ1009', 'Opel', 'Corsa', 2018, 5, 670, 35, 'Rojo', 'corsa.jpg', 'reservado', 2),
('XYZ1010', 'Opel', 'Mokka', 2021, 5, 710, 58, 'Blanco', 'mokka.jpg', 'disponible', 2);

create table reserva(
    id_reserva int auto_increment primary key,
    id_usuario int,
    id_automovil int,
    nombre_cliente varchar(50) not null,
    apellido_paterno varchar(30) not null,
    apellido_materno varchar(30) null,
    dni varchar(30) not null,
    telefono varchar(30) not null,
    fecha_inicio datetime not null,
    fecha_fin datetime not null,
    precio_final int not null,
    notas varchar(100) null,
    estado enum('activa','finalizada', 'cancelada') default 'activa',
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_automovil) references automovil(id_automovil),
    foreign key (id_cliente) references cliente(id_cliente)
);
