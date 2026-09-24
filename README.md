# ShipNow API

API desarrollada con Node.js, Express y MongoDB, organizada mediante una arquitectura por capas para separar responsabilidades y facilitar el mantenimiento del proyecto.

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* JavaScript
* dotenv

## Arquitectura

El proyecto utiliza una arquitectura de tres capas:

```text
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

### Router

Las rutas se encargan únicamente de conectar cada endpoint con el método correspondiente del Controller.

### Controller

Gestiona la petición HTTP (`req`) y la respuesta (`res`). También determina el `status code` correspondiente.

### Service

Contiene la lógica de negocio de la aplicación.

Por ejemplo, antes de crear o devolver un producto se pueden aplicar reglas como validar datos, comprobar condiciones de stock o decidir qué productos deben mostrarse.

### Repository

Centraliza el acceso a MongoDB mediante Mongoose.

Por ejemplo:

```js
async getAll() {
    return await Product.find();
}
```

La separación entre **Service y Repository** permite que cada capa tenga una responsabilidad específica. El Repository se ocupa de **cómo obtener o modificar los datos**, mientras que el Service se ocupa de **qué reglas deben cumplirse antes de realizar esas operaciones**.

De esta manera, si en el futuro cambia la forma de almacenar los datos, el impacto queda principalmente aislado en la capa de acceso a datos.

## Constantes

Las constantes compartidas se encuentran centralizadas en:

```text
src/constants/index.js
```

Los estados de los productos y los roles de usuario se definen mediante objetos congelados con `Object.freeze()`.

Ejemplo:

```js
export const USER_ROLES = Object.freeze({
    ADMIN: "admin",
    USER: "user"
});
```

Esto evita utilizar strings repetidos directamente en diferentes partes de la aplicación.

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta:

```bash
cd NOMBRE_DEL_PROYECTO
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=8080
MONGO_URI=tu_conexion_de_mongodb
```

Completar las variables de entorno con los valores correspondientes.

## Ejecución

Para iniciar el proyecto:

```bash
npm start
```

Si el proyecto utiliza Nodemon:

```bash
npm run dev
```

La API quedará disponible en:

```text
http://localhost:8080
```

## Endpoints principales

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

## Variables de entorno

Por seguridad, el archivo `.env` no debe subirse al repositorio.


