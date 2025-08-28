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
