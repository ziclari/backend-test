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
