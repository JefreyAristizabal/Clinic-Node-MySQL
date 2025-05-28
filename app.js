// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const citasRoutes = require('./routes/citas.routes');  // Rutas de las citas
const { connectDB } = require('./config/db');  // Conexión a la base de datos (es una función)
const { port } = require('./config/config');  // Variables de configuración

const app = express();

// Configuración de Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.use('/citas', citasRoutes);

// Redirigir "/" hacia "/citas" para evitar el error de citas no definidas
app.get('/', (req, res) => {
  res.redirect('/citas');
});

// Conexión a la base de datos
connectDB().then(() => {
  console.log('✅ Conexión a la base de datos establecida.');
}).catch(err => {
  console.error('❌ Error al conectar con la base de datos:', err);
});

// Exportar la app para iniciar el servidor desde el archivo principal
module.exports = app;
