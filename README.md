## Inicio

Inicio de proyecto Nestjs

## Users CRUD

Para el dominio de Users, vamos a necesitar que el usuario pueda registrarse por primera vez con sus datos (email, password), asimismo comprobar que no pueda hacerlo nuevamente si ya se encuentra registrado.

Luego el usuario procede a loguearse con los respectivos datos, una vez realizado el logueo, este EP (endpoint) nos devuelve un token JWT.

### Paso 1

- Configurar entorno de desarrollo (eslint, prettier)
- Añadir dependencias (Mongodb, class validator, jwt)
- Agregar conexión a base de datos, en mongosh

```
use test_db

db.createUser({
  user: "user_db",
  pwd: "password_db",
  roles: [
    { role: "readWrite", db: "test_db" }
  ]
})

```

- Iniciar recurso usuario
- Crear schema para usuario
- Crear CRUD para usuario
- Manejar errores
- Autentificación de usuario
- Creación / registro

```
POST http://localhost:4444/auth/register
{
    "email": "ejemplo@mail.com",
    "password": "Ejemplo1"
}
Respuesta:
    Todo bien:
    {
        "email": "prueba@mail.com",
        "_id": "68b0d0afd8bc5194b08e0ed7",
        "createdAt": "2025-08-28T21:57:03.599Z",
        "updatedAt": "2025-08-28T21:57:03.599Z",
        "__v": 0
    }

    Registro duplicado:
    {
        "message": "El usuario ya se encuentra registrado",
        "error": "Bad Request",
        "statusCode": 400
    }
    Sin contraseña:
    {
        "message": [
            "password should not be empty"
        ],
        "error": "Bad Request",
        "statusCode": 400
    }
    Sin Email:
    {
        "message": [
            "email must be an email",
            "email should not be empty"
        ],
        "error": "Bad Request",
        "statusCode": 400
    }
    Email mal:
    {
        "message": [
            "email must be an email"
        ],
        "error": "Bad Request",
        "statusCode": 400
    }
```

- Login

```
POST http://localhost:4444/auth/login
{
    "email": "ejemplo@mail.com",
    "password": "Ejemplo1"
}
Respuesta:
    Todo bien:
    token_JWT: "EYjHB...."

    Todo mal:
    {
        "message": "Unauthorized",
        "statusCode": 401
    }
```

## Truck CRUD

- Crear un truck

```
POST http://localhost:4444/truck

Minimo:
{
    "user": "68b0d0afd8bc5194b08e0ed7"
}
Completo:
{
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2020",
    "color": "Azul",
    "plates": "6SOXT44"
}

Correcto:
{
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2020",
    "color": "Azul",
    "plates": "6SOXT44",
    "_id": "68b0e6c8ed5e45919c66e11d",
    "createdAt": "2025-08-28T23:31:20.257Z",
    "updatedAt": "2025-08-28T23:31:20.257Z",
    "__v": 0
}

Fallido:
{
    "message": [
        "user must be a mongodb id",
        "user should not be empty"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

```

- Editar un truck

```
PATCH http://localhost:4444/truck/68b0e6c8ed5e45919c66e11d

Correcto:
{
    "_id": "68b0e6c8ed5e45919c66e11d",
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2020",
    "color": "Rojo",
    "plates": "6SOXT44",
    "createdAt": "2025-08-28T23:31:20.257Z",
    "updatedAt": "2025-08-28T23:34:04.322Z",
    "__v": 0
}
Fallido:
{
    "message": "Camión con id 68b0e6c8edd5e4519c66errr no encontrado",
    "error": "Not Found",
    "statusCode": 404
}

```

- Ver un truck

```
GET http://localhost:4444/truck/68b0e6c8ed5e45919c66e11d
{
    "_id": "68b0e6c8ed5e45919c66e11d",
    "user": "68b0d0afd8bc5194b08e0ed7",
    "year": "2020",
    "color": "Rojo",
    "plates": "6SOXT44",
    "createdAt": "2025-08-28T23:31:20.257Z",
    "updatedAt": "2025-08-28T23:34:04.322Z",
    "__v": 0
}
```

- Ver todos los truck

```
GET http://localhost:4444/truck

[
    {
        "_id": "68b0e660ed5e45919c66e11b",
        "user": "68b0d0afd8bc5194b08e0ed7",
        "createdAt": "2025-08-28T23:29:36.103Z",
        "updatedAt": "2025-08-28T23:29:36.103Z",
        "__v": 0
    },
    {
        "_id": "68b0e6c8ed5e45919c66e11d",
        "user": "68b0d0afd8bc5194b08e0ed7",
        "year": "2020",
        "color": "Rojo",
        "plates": "6SOXT44",
        "createdAt": "2025-08-28T23:31:20.257Z",
        "updatedAt": "2025-08-28T23:34:04.322Z",
        "__v": 0
    }
]
```

- Eliminar un truck

```
DELETE http://localhost:4444/truck/68b0e6c8ed5e45919c66e11d
```
