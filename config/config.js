require('dotenv').config(); // Cargar variables de entorno desde .env

const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'clinica',
  },
  port: process.env.PORT || 3000,
};

module.exports = config;