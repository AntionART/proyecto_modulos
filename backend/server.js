const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const foroRoutes = require('./routes/foroRoutes');
const gastoRoutes = require('./routes/gastoRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/comentariosDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/foros', foroRoutes);
app.use('/api/gastos', gastoRoutes);
app.use('/api/comentarios', comentarioRoutes);

app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});
