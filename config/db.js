const mysql = require('mysql2/promise');
const { db: dbConfig } = require('./config');  // Usa la configuración desde config.js

let pool;

const connectDB = async () => {
  try {
    pool = await mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('✅ Conectado a MySQL');
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!pool) throw new Error('❌ La base de datos no está conectada aún');
  return pool;
};

module.exports = {
  connectDB,
  getDB
};



