# Backend .NET Core WebAPI v9

Este es un proyecto backend construido con .NET 9.0 que provee una API sencilla para el manejo de inventario, incluyendo autenticación y control de productos.


Requisitos
- .NET 9 SDK
- PostgreSQL corriendo en localhost:5432 con una base de datos llamada Inventario_test

## Instalación y ejecución

1. Clona este repositorio (ignorar si ya lo habias clonado):

```bash
git clone https://github.com/kmilo1717/Inventario-Angular-.NET.git
```

2. Navega a la carpeta del backend:

```bash
cd backend/InventarioAPI
```

4. Ejecuta migracion:
   
```bash
dotnet tool restore
dotnet ef database update
```
5. Ejecuta el proyecto en modo desarrollo:

```bash
dotnet run
```
 6. La API estará disponible en: `http://localhost:5178`

## Endpoints principales

### Autenticación

- POST /api/auth/login
Autentica al usuario y devuelve un token JWT.
Body credenciales por defecto:
```bash
{
  "username": "admin",
  "password": "1234"
}
```
Retornara un bearer

### Inventario 
#### Importante, Se debe pasar el JWT del paso anterior con el bearer <token> en el header para authenticar
-GET /api/productos/inventario
Devuelve una lista de productos en inventario.

### Movimiento de productos
#### Importante, Se debe pasar el JWT del paso anterior con el bearer <token> en el header para authenticar
- POST /api/productos/movimiento
Registra una entrada o salida de un producto.
Body de ejemplo:

  - Tipo: enum = "entrada", "salida"
  - Nombre: String
  - Cantidad: Number
  - id?: Number

En caso de requerir crear uno nuevo, no se envia id en producto
```bash
{
    "tipo": "entrada",
    "producto": {
        "nombre": "Lapiz",
        "cantidad": 40
    }
}
```

En caso de modificar, se envia id en producto
```bash
{
    "tipo": "entrada",
    "producto": {
        "id":1,
        "nombre": "Lapiz",
        "cantidad": 40
    }
}
```
## Variables de entorno

Por defecto, el proyecto usa esta cadena de conexión en appsettings.json:
```bash
Host=localhost;Port=5432;Database=Inventario_test;Username=postgres;Password=postgres
```
