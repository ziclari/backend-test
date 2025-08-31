# Backend Test API

Proyecto backend desarrollado con NestJS y MongoDB. Provee endpoints RESTful para la gestión de usuarios, camiones, ubicaciones y ordenes.

## Requisitos

- Node.js >= 18
- MongoDB >= 5
- pnpm (o npm/yarn)

## Instalación

```sh
pnpm install
```

## Configuración

Configura las variables de entorno en `.env` en la raíz del proyecto:

```
# NestJS
PORT=3000

# MongoDB
DATABASE_HOST=db:27017
DATABASE_USERNAME=user_db
DATABASE_PASSWORD=password_db
DATABASE_NAME=test_db

# Google API
GOOGLE_API_KEY=test

# JWT
JWT_SECRET=test_secret_key

```

## Ejecución

```sh
pnpm start
```

# Endpoints de Autenticación

La API permite registrar usuarios y autenticarlos mediante JWT.

## Endpoints

### Registrar usuario

`POST /auth/register`

**Body:**

```json
{
  "email": "ejemplo@mail.com",
  "password": "Ejemplo1"
}
```

**Respuesta exitosa:**

```json
{
  "email": "ejemplo@mail.com",
  "_id": "68b0d0afd8bc5194b08e0ed7",
  "createdAt": "2025-08-28T21:57:03.599Z",
  "updatedAt": "2025-08-28T21:57:03.599Z",
  "__v": 0
}
```

**Errores:**

- Email duplicado:
  ```json
  {
    "message": "El usuario ya se encuentra registrado",
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
- Email inválido o vacío:
  ```json
  {
    "message": ["email must be an email", "email should not be empty"],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
- Contraseña vacía:
  ```json
  {
    "message": ["password should not be empty"],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

---

### Login de usuario

`POST /auth/login`

**Body:**

```json
{
  "email": "ejemplo@mail.com",
  "password": "Ejemplo1"
}
```

**Respuesta exitosa:**

```json
{
  "token_JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores:**

- Credenciales incorrectas:
  ```json
  {
    "message": "Unauthorized",
    "statusCode": 401
  }
  ```

## Uso del token

Incluye el token JWT en el header para acceder a los endpoints protegidos:

```
Authorization: Bearer <token>
```

## Flujo de autenticación

1. **Registro:** El usuario se registra con email y contraseña. La contraseña se almacena hasheada.
2. **Login:** El usuario envía email y contraseña, recibe un token JWT si las credenciales son correctas.
3. **Acceso:** Usa el token JWT para acceder a los endpoints protegidos del CRUD de usuarios, camiones, ubicaciones y ordenes.

## Endpoints Usuarios

Todos los endpoints requieren autenticación JWT.

### Crear usuario

`POST /user`

**Body:**

```json
{
  "email": "ejemplo@mail.com",
  "password": "Ejemplo1"
}
```

**Respuesta exitosa:**

```json
{
  "email": "ejemplo@mail.com",
  "_id": "68b0d0afd8bc5194b08e0ed7",
  "createdAt": "2025-08-28T21:57:03.599Z",
  "updatedAt": "2025-08-28T21:57:03.599Z",
  "__v": 0
}
```

**Errores:**

- Email duplicado:
  ```json
  {
    "message": "El usuario ya se encuentra registrado",
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
- Email inválido o vacío:
  ```json
  {
    "message": ["email must be an email", "email should not be empty"],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```
- Contraseña vacía:
  ```json
  {
    "message": ["password should not be empty"],
    "error": "Bad Request",
    "statusCode": 400
  }
  ```

---

### Listar usuarios

`GET /user`

**Respuesta:**

```json
[
  {
    "email": "ejemplo@mail.com"
  },
  {
    "email": "otro@mail.com"
  }
]
```

---

### Obtener usuario por ID

`GET /user/:id`

**Respuesta exitosa:**

```json
{
  "_id": "68b0d0afd8bc5194b08e0ed7",
  "email": "ejemplo@mail.com",
  "createdAt": "2025-08-28T21:57:03.599Z",
  "updatedAt": "2025-08-28T21:57:03.599Z",
  "__v": 0
}
```

**Error:**

```json
{
  "message": "Usuario con id 68b0d0afd8bc5194b08e0ed7 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### Actualizar usuario

`PATCH /user/:id`

**Body:**

```json
{
  "email": "nuevo@mail.com"
}
```

**Respuesta exitosa:**

```json
{
  "_id": "68b0d0afd8bc5194b08e0ed7",
  "email": "nuevo@mail.com",
  "createdAt": "2025-08-28T21:57:03.599Z",
  "updatedAt": "2025-08-28T22:00:00.000Z",
  "__v": 0
}
```

**Error:**

```json
{
  "message": "Usuario con id 68b0d0afd8bc5194b08e0ed7 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

### Eliminar usuario

`DELETE /user/:id`

**Respuesta exitosa:**  
Código HTTP 204 (Sin contenido)

**Error:**

```json
{
  "message": "Usuario con id 68b0d0afd8bc5194b08e0ed7 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

# Endpoints de Camiones (Truck)

Todos los endpoints requieren autenticación JWT.

## Crear camión

`POST /truck`

**Body:**

```json
{
  "user": "68b0d0afd8bc5194b08e0ed7",
  "year": "2022",
  "color": "Rojo",
  "plates": "ABC123"
}
```

**Respuesta exitosa:**

```json
{
  "_id": "68b0d0afd8bc5194b08e0ed8",
  "user": "68b0d0afd8bc5194b08e0ed7",
  "year": "2022",
  "color": "Rojo",
  "plates": "ABC123",
  "createdAt": "2025-08-31T21:57:03.599Z",
  "updatedAt": "2025-08-31T21:57:03.599Z",
  "__v": 0
}
```

---

## Listar camiones

`GET /truck`

**Respuesta:**

```json
[
  {
    "_id": "68b0d0afd8bc5194b08e0ed8",
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2022",
    "color": "Rojo",
    "plates": "ABC123"
  },
  {
    "_id": "68b0d0afd8bc5194b08e0ed9",
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2021",
    "color": "Azul",
    "plates": "XYZ789"
  }
]
```

---

## Obtener camión por ID

`GET /truck/:id`

**Respuesta exitosa:**

```json
{
  "_id": "68b0d0afd8bc5194b08e0ed8",
  "user": "68b0d0afd8bc5194b08e0ed7",
  "year": "2022",
  "color": "Rojo",
  "plates": "ABC123",
  "createdAt": "2025-08-31T21:57:03.599Z",
  "updatedAt": "2025-08-31T21:57:03.599Z",
  "__v": 0
}
```

**Error:**

```json
{
  "message": "Camión con id 68b0d0afd8bc5194b08e0ed8 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## Actualizar camión

`PATCH /truck/:id`

**Body:**

```json
{
  "color": "Negro",
  "plates": "DEF456"
}
```

**Respuesta exitosa:**

```json
{
  "_id": "68b0d0afd8bc5194b08e0ed8",
  "user": "68b0d0afd8bc5194b08e0ed7",
  "year": "2022",
  "color": "Negro",
  "plates": "DEF456",
  "createdAt": "2025-08-31T21:57:03.599Z",
  "updatedAt": "2025-08-31T22:00:00.000Z",
  "__v": 0
}
```

**Error:**

```json
{
  "message": "Camión con id 68b0d0afd8bc5194b08e0ed8 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

---

## Eliminar camión

`DELETE /truck/:id`

**Respuesta exitosa:**  
Código HTTP 204 (Sin contenido)

**Error:**

```json
{
  "message": "Camión con id 68b0d0afd8bc5194b08e0ed8 no encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```
