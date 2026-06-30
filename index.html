'use strict';

const express = require('express');
const mongoose = require('mongoose');

const EMBEDDED_MONGODB_URI = 'mongodb+srv://vortex404exe_db_user:Yy1vCGyt9NJ5VAC7@panel.iohd54i.mongodb.net/GersonDB?appName=PANEL';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

const connectionCache = global.__mongooseConnectionCache || {
  connection: null,
  promise: null
};
global.__mongooseConnectionCache = connectionCache;

async function connectDatabase() {
  if (connectionCache.connection) return connectionCache.connection;

  const mongoURI = process.env.MONGODB_URI || EMBEDDED_MONGODB_URI;

  if (!connectionCache.promise) {
    connectionCache.promise = mongoose
      .connect(mongoURI, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10
      })
      .then((instance) => instance)
      .catch((error) => {
        connectionCache.promise = null;
        throw error;
      });
  }

  connectionCache.connection = await connectionCache.promise;
  return connectionCache.connection;
}

const enlaceSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    url: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048
    },
    orden: {
      type: Number,
      required: true,
      min: 0,
      max: 999999
    }
  },
  {
    collection: 'enlaces',
    timestamps: true,
    versionKey: false
  }
);

const Enlace = mongoose.models.Enlace || mongoose.model('Enlace', enlaceSchema);

function normalizeUrl(rawUrl) {
  const value = typeof rawUrl === 'string' ? rawUrl.trim() : '';
  if (!value) throw new Error('La URL es obligatoria.');

  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let parsed;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error('La URL no es válida.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('La URL debe usar http o https.');
  }

  return parsed.href;
}

function validatePayload(body) {
  const nombre = typeof body?.nombre === 'string' ? body.nombre.trim() : '';
  const orden = Number(body?.orden);

  if (!nombre) throw new Error('El nombre es obligatorio.');
  if (nombre.length > 120) throw new Error('El nombre no puede superar 120 caracteres.');
  if (!Number.isInteger(orden) || orden < 0 || orden > 999999) {
    throw new Error('El orden debe ser un número entero entre 0 y 999999.');
  }

  return {
    nombre,
    url: normalizeUrl(body?.url),
    orden
  };
}

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

app.get('/datos', async (_req, res) => {
  try {
    await connectDatabase();
    const enlaces = await Enlace.find().sort({ orden: 1, nombre: 1 }).lean();
    return res.status(200).json(enlaces);
  } catch (error) {
    console.error('Error al leer enlaces:', error);
    return res.status(500).json({ error: 'No se pudieron obtener los enlaces.' });
  }
});

app.post('/datos', async (req, res) => {
  try {
    await connectDatabase();
    const datos = validatePayload(req.body);
    const nuevoEnlace = await Enlace.create(datos);
    return res.status(201).json({
      mensaje: 'Dato insertado correctamente.',
      enlace: nuevoEnlace
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.message?.includes('obligatori') || error.message?.includes('URL') || error.message?.includes('orden') || error.message?.includes('nombre')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error al crear enlace:', error);
    return res.status(500).json({ error: 'No se pudo crear el enlace.' });
  }
});

app.put('/datos/:id', async (req, res) => {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ error: 'El identificador no es válido.' });
    }

    await connectDatabase();
    const datos = validatePayload(req.body);
    const enlace = await Enlace.findByIdAndUpdate(req.params.id, datos, {
      new: true,
      runValidators: true
    });

    if (!enlace) return res.status(404).json({ error: 'Registro no encontrado.' });
    return res.status(200).json({ mensaje: 'Registro actualizado.', enlace });
  } catch (error) {
    if (error.name === 'ValidationError' || error.message?.includes('obligatori') || error.message?.includes('URL') || error.message?.includes('orden') || error.message?.includes('nombre')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Error al actualizar enlace:', error);
    return res.status(500).json({ error: 'No se pudo actualizar el enlace.' });
  }
});

app.delete('/datos/:id', async (req, res) => {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ error: 'El identificador no es válido.' });
    }

    await connectDatabase();
    const enlace = await Enlace.findByIdAndDelete(req.params.id);

    if (!enlace) return res.status(404).json({ error: 'Registro no encontrado.' });
    return res.status(200).json({ mensaje: 'Registro eliminado.' });
  } catch (error) {
    console.error('Error al eliminar enlace:', error);
    return res.status(500).json({ error: 'No se pudo eliminar el enlace.' });
  }
});

app.use((req, res) => {
  return res.status(404).json({ error: 'Ruta no encontrada.' });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Servidor disponible en http://localhost:${port}`);
  });
}

module.exports = app;
