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
└── routes/        cada ruta apunta a un método del controller
```

## ¿Por qué separar Service y Repository?


Separé el acceso a datos de las reglas de negocio porque cambian por motivos distintos. El Repository solo sabe cómo guardar y buscar en MongoDB (`find`, `findById`, `create`...), así que si mañana cambia la base o una consulta, toco un solo archivo. El Service decide qué está permitido: por ejemplo, que el estado de un producto dependa de su stock, que no se repita un email o que no se pueda crear un admin desde el endpoint público. Como no sabe nada de Express ni de Mongoose, esas reglas se pueden reutilizar desde otro lugar y probar sin levantar servidor ni base de datos.

Un caso concreto: `GET /api/products` no filtra nada por su cuenta. El Controller pasa los parámetros de la URL al Service, el Service los valida y el Repository arma la consulta. Así cada capa hace una sola cosa.