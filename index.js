// index.js
const app = require('./app');  // Importamos la configuración de Express desde app.js

// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});

