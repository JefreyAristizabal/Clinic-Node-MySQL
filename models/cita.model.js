const mysql = require('mysql2/promise');
const config = require('../config/config');

// Función para obtener una conexión nueva
async function getConnection() {
  return await mysql.createConnection(config.db);
}

const Cita = {
  async getAll() {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM Citas');
    return rows;
  },

  async create({ paciente, fecha, hora, motivo }) {
    const db = await getConnection();

    let fechaSolo;
    if (fecha instanceof Date) {
      fechaSolo = fecha.toISOString().split('T')[0];
    } else {
      fechaSolo = fecha.split('T')[0];
    }

    console.log("Fecha a insertar:", fechaSolo);

    await db.query(
      'INSERT INTO Citas (Paciente, Fecha, Hora, Motivo) VALUES (?, ?, ?, ?)',
      [paciente, fechaSolo, hora, motivo]
    );
  },

  async deleteById(id) {
    const db = await getConnection();
    const [result] = await db.query('DELETE FROM Citas WHERE id = ?', [id]);
    return result;
  },

  async update(id, { paciente, fecha, hora, motivo }) {
    const db = await getConnection();

    let fechaSolo;
    if (fecha) {
      if (fecha instanceof Date) {
        fechaSolo = fecha.toISOString().split('T')[0];
      } else if (typeof fecha === 'string') {
        const fechaParts = fecha.split('T');
        fechaSolo = fechaParts.length > 1 ? fechaParts[0] : fecha;
      } else {
        throw new Error('Formato de fecha inválido');
      }
    } else {
      throw new Error('Fecha no proporcionada');
    }

    console.log("Fecha a actualizar:", fechaSolo);

    const [result] = await db.query(
      'UPDATE Citas SET Paciente = ?, Fecha = ?, Hora = ?, Motivo = ? WHERE id = ?',
      [paciente, fechaSolo, hora, motivo, id]
    );
    return result;
  }
};

module.exports = Cita;
