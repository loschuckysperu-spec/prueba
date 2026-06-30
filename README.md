# Panel de enlaces listo para desplegar

Este paquete contiene la conexión de MongoDB solicitada y funciona directamente desde el panel.

## Despliegue en Vercel

1. Descomprime el ZIP.
2. Sube a Vercel la carpeta que contiene directamente `package.json`, `vercel.json`, `api` y `public`.
3. Abre la URL del proyecto.
4. Ya puedes agregar, editar y borrar enlaces directamente desde el panel.

## Estructura

- `api/datos.js`: API CRUD y conexión a MongoDB.
- `public/index.html`: panel de enlaces.
- `vercel.json`: rutas del proyecto.

## Importante

La conexión de MongoDB está incorporada porque se solicitó un paquete listo para desplegar. No publiques esta carpeta en un repositorio público.
