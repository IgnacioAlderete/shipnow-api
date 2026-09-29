# ShipNow API

API REST de productos y usuarios con arquitectura por capas (Router → Controller → Service → Repository).

## Correr el proyecto localmente

1. Instalar dependencias: `npm install`
2. Copiar `.env.example` a `.env` y completar los valores:
   ```
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/shipnow
   NODE_ENV=development
   ```
3. Iniciar: `npm start` (o `npm run dev`)

Si falta `PORT`, `MONGODB_URI` o `NODE_ENV` (o tienen un valor inválido), la app no arranca y muestra un error claro.

## Estructura

```
src/
├── config/        env.config.js  (único lugar donde se lee process.env)
├── constants/     estados de producto, roles, HTTP status, entornos
├── errors/        AppError (error con statusCode)
├── models/        solo esquemas de Mongoose
├── repositories/  único lugar con acceso a MongoDB
├── services/      lógica de negocio
├── controllers/   manejo de req/res y status codes
└── routes/        mapeo ruta → controller
```

## ¿Por qué separar Service y Repository?

(Reescribilo con tus palabras. Ideas:)
- El **Repository** aísla el acceso a datos: si cambia la base o la forma de consultar, solo se toca esa capa, y se puede mockear en tests.
- El **Service** concentra las reglas de negocio (ej: listar solo productos disponibles con stock, derivar el estado según el stock, evitar emails duplicados, impedir crear admins). No sabe nada de HTTP ni de Mongoose.
- El **Controller** queda liviano: traduce la request en una llamada al Service y el resultado (o error) en una respuesta HTTP.
