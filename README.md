## Inventario-Angular-.NET

Proyecto FullStack, hecho con Angular16 y .NET core WebApi 9

### Instalacion por docker

1. Valida que tienes instalador docker, puedes instalarlo aqui https://docs.docker.com/desktop/setup/install/windows-install/
2. Clona el proyecto

```bash
git clone https://github.com/kmilo1717/Inventario-Angular-.NET.git
cd Inventario-Angular-.NET
docker-compose up
```
Ingresa a `http://localhost:4200/` con usuario: admin, contrasena: 1234

### Instalacion manual

- Para ver la documentacion del backend dirigirse a https://github.com/kmilo1717/Inventario-Angular-.NET/tree/main/backend/InventarioAPI
- Para ver la documentacion del frontend dirigirse a https://github.com/kmilo1717/Inventario-Angular-.NET/tree/main/frontend/inventario


## Resumen

Este proyecto contiene un backend y un frontend, conectados donde se podra gestionar un inventario, los endpoints estan desarrollados para que validen y comprueben la informacion.
Se implementa la aruitectura por capas y algunos patrones de diseno como respository. 

## Recomendaciones

- Instalar primero el backend y luego el frontend
- Tener Postgres instalado en tu maquina

Cualquier duda informar
