const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// RECUERDA: Debes cambiar esta URL por la de tu nuevo clúster de MongoDB Atlas creado en la web
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://vortex404exe_db_user:Yy1vCGyt9NJ5VAC7@panel.iohd54i.mongodb.net/GersonDB?appName=PANEL";

if (mongoose.connection.readyState === 0) {
    mongoose.connect(mongoURI)
        .then(() => console.log('Conectado a la base de datos con éxito'))
        .catch(err => console.error('Error al conectar MongoDB:', err));
}

const EnlaceSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    orden: Number
});
const Enlace = mongoose.models.Enlace || mongoose.model('Enlace', EnlaceSchema);

app.get('/api/enlaces', async (req, res) => {
    try {
        const enlaces = await Enlace.find().sort({ orden: 1 });
        res.json(enlaces);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/enlaces', async (req, res) => {
    try {
        const nuevoEnlace = new Enlace(req.body);
        await nuevoEnlace.save();
        res.json({ mensaje: 'Enlace guardado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/enlaces/:id', async (req, res) => {
    try {
        await Enlace.findByIdAndUpdate(req.params.id, req.body);
        res.json({ mensaje: 'Enlace actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/enlaces/:id', async (req, res) => {
    try {
        await Enlace.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Enlace eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
