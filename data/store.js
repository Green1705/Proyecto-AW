"use strict";

const vehicles = [
  {
    id_automovil: 1,
    matricula: "EV-001-MD",
    marca: "Nissan",
    modelo: "Leaf",
    anio_matriculacion: 2021,
    numero_plazas: 5,
    autonomia_km: 320,
    precio_por_dia: 65,
    color: "Azul",
    imagen: "/images/nissan_leaf.png",
    estado: "disponible",
    id_concesionario: 1,
  },
  {
    id_automovil: 2,
    matricula: "EV-025-MD",
    marca: "Tesla",
    modelo: "Model 3",
    anio_matriculacion: 2022,
    numero_plazas: 5,
    autonomia_km: 450,
    precio_por_dia: 120,
    color: "Blanco",
    imagen: "/images/tesla_model3.png",
    estado: "reservado",
    id_concesionario: 1,
  },
  {
    id_automovil: 3,
    matricula: "EV-300-BCN",
    marca: "Renault",
    modelo: "Zoe",
    anio_matriculacion: 2020,
    numero_plazas: 5,
    autonomia_km: 280,
    precio_por_dia: 55,
    color: "Gris",
    imagen: "/images/renault_zoe.png",
    estado: "mantenimiento",
    id_concesionario: 2,
  },
];

const dealerships = [
  {
    id_concesionario: 1,
    nombre: "Autos Eléctricos Madrid",
    telefono: "652985542",
    direccion: {
      ciudad: "Madrid",
      calle: "General Pardiñas",
      numero: 26,
      codigo_postal: 28001,
    },
  },
  {
    id_concesionario: 2,
    nombre: "Autos Eléctricos Barcelona",
    telefono: "612345678",
    direccion: {
      ciudad: "Barcelona",
      calle: "Carrer d'Aragó",
      numero: 122,
      codigo_postal: 8008,
    },
  },
];

const users = [
  {
    id_usuario: 1,
    nombre: "Diego",
    apellido_paterno: "Moreno",
    apellido_materno: "Duarte",
    rol: "administrador",
    email: "admin@demo.com",
    password: "demo",
    telefono: "600000001",
    id_concesionario: 1,
  },
  {
    id_usuario: 2,
    nombre: "Gora",
    apellido_paterno: "Stg",
    apellido_materno: "Gorgievski",
    rol: "empleado",
    email: "empleado@demo.com",
    password: "demo",
    telefono: "600000002",
    id_concesionario: 2,
  },
];

const clients = [
  {
    id_cliente: 1,
    nombre: "Laura",
    apellido_paterno: "Pérez",
    apellido_materno: "González",
    dni: "12345678A",
    telefono: "611111111",
    email: "laura@example.com",
  },
];

const reservations = [
  {
    id_reserva: 1,
    id_usuario: 2,
    id_cliente: 1,
    id_automovil: 1,
    fecha_inicio: "2025-01-05T09:00",
    fecha_fin: "2025-01-06T18:00",
    precio_final: 130,
    estado: "finalizada",
    kilometros_recorridos: 180,
  },
];

function nextId(collection, key) {
  if (!collection.length) return 1;
  return Math.max(...collection.map((item) => item[key] || 0)) + 1;
}

function getVehicles() {
  return vehicles;
}

function addVehicle(vehicle) {
  const newVehicle = {
    id_automovil: nextId(vehicles, "id_automovil"),
    ...vehicle,
  };
  vehicles.push(newVehicle);
  return newVehicle;
}

function getDealerships() {
  return dealerships;
}

function addDealership(dealership) {
  const newDealership = {
    id_concesionario: nextId(dealerships, "id_concesionario"),
    ...dealership,
  };
  dealerships.push(newDealership);
  return newDealership;
}

function getUsers() {
  return users;
}

function addUser(user) {
  const newUser = {
    id_usuario: nextId(users, "id_usuario"),
    ...user,
  };
  users.push(newUser);
  return newUser;
}

function findUserByEmail(email) {
  return users.find(
    (user) => user.email.toLowerCase() === String(email).toLowerCase(),
  );
}

function getClients() {
  return clients;
}

function addClient(client) {
  const newClient = {
    id_cliente: nextId(clients, "id_cliente"),
    ...client,
  };
  clients.push(newClient);
  return newClient;
}

function getReservations() {
  return reservations;
}

function addReservation(reservation) {
  const newReservation = {
    id_reserva: nextId(reservations, "id_reserva"),
    estado: reservation.estado || "activa",
    precio_final: reservation.precio_final || 0,
    ...reservation,
  };
  reservations.push(newReservation);
  return newReservation;
}

module.exports = {
  getVehicles,
  addVehicle,
  getDealerships,
  addDealership,
  getUsers,
  addUser,
  findUserByEmail,
  getClients,
  addClient,
  getReservations,
  addReservation,
};
