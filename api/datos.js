const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cadena fija con tus credenciales seguras para GersonDB
const mongoURI = "mongodb+srv://vortex404exe_db_user:Yy1vCGyt9NJ5VAC7@panel.iohd54i.mongodb.net/GersonDB?appName=PANEL";

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI)
        .then(() => console.log('Conectado de forma segura a MongoDB Atlas (GersonDB)'))
        .catch(err => console.error('Error de conexión a MongoDB:', err));
}

const EnlaceSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    orden: Number
}, { collection: 'enlaces' });

const Enlace = mongoose.models.Enlace || mongoose.model('Enlace', EnlaceSchema);

// 1. LEER DATOS (GET) -> Al entrar a /datos devuelve el JSON puro
app.get('/datos', async (req, res) => {
    try {
        const enlaces = await Enlace.find().sort({ orden: 1 });
        res.setHeader('Content-Type', 'application/json');
        res.json(enlaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. CREAR DATO (POST)
app.post('/datos', async (req, res) => {
    try {
        const nuevoEnlace = new Enlace(req.body);
        await nuevoEnlace.save();
        res.json({ mensaje: 'Dato insertado en MongoDB con éxito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. EDITAR DATO (PUT)
app.put('/datos/:id', async (req, res) => {
    try {
        await Enlace.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Registro actualizado en MongoDB' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. BORRAR DATO (DELETE)
app.delete('/datos/:id', async (req, res) => {
    try {
        await Enlace.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Registro eliminado de MongoDB' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
