// routes/citas.routes.js
const express = require('express');
const Cita = require('../models/cita.model');  // Importar el modelo de Cita
const router = express.Router();

// Ruta GET para obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.getAll();  // Usamos el método getAll que definimos en el modelo

    // Formatear las fechas solo para la vista de la tabla principal (index)
    const citasFormateadas = citas.map(cita => {
      // Convierte la fecha en formato 'YYYY-MM-DD' solo para mostrarla en la tabla
      cita.Fecha = new Date(cita.Fecha).toLocaleDateString('es-CO');  // 'es-CO' es para formato colombiano (yyyy-mm-dd)
      return cita;
    });

    res.render('index', { citas: citasFormateadas });  // Enviamos citas formateadas a la vista
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las citas');
  }
});
  
  
  

// Ruta POST para guardar una nueva cita
router.post('/', async (req, res) => {
  try {
    const nuevaCita = req.body;  // Recibimos los datos de la cita desde el formulario
    await Cita.create(nuevaCita);  // Usamos el método create del modelo
    res.redirect('/citas');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar la cita');
  }
});

// Ruta GET para eliminar una cita por ID
router.get('/eliminar/:id', async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita
    const result = await Cita.deleteById(citaId);  // Usamos el método deleteById del modelo
    
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Cita eliminada correctamente' });
    } else {
      res.json({ success: false, message: 'Cita no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar la cita');
  }
});

// Ruta GET para editar una cita por ID
router.get('/editar/:id', async (req, res) => {
  try {
    const citaId = req.params.id;  // Obtener el ID de la cita
    const citas = await Cita.getAll();  // Obtener todas las citas
    const citaEncontrada = citas.find(c => c.id == citaId);  // Buscar la cita con el ID

    if (!citaEncontrada) {
      return res.status(404).send('Cita no encontrada');
    }

    // Verifica si la fecha es correcta antes de enviarla a la vista
    console.log('Fecha encontrada para edición:', citaEncontrada.Fecha);

    // Asegurémonos de enviar la fecha en el formato correcto para el campo "date"
    const fechaFormateada = citaEncontrada.Fecha.toISOString().split('T')[0];

    res.render('editar', { cita: { ...citaEncontrada, Fecha: fechaFormateada } });  // Renderizar la vista "editar" pasando los datos de la cita
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener la cita');
  }
});
  

router.post('/editar/:id', async (req, res) => {
  try {
    const citaId = req.params.id;

    // Desestructurar en minúsculas como lo espera el modelo
    const { paciente, fecha, hora, motivo } = req.body;

    console.log("Fecha encontrada para edición:", fecha); // Para ver que llega bien

    const result = await Cita.update(citaId, { paciente, fecha, hora, motivo });

    if (result.affectedRows === 0) {
      return res.status(404).send('Cita no encontrada');
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar la cita');
  }
});
  

module.exports = router;

