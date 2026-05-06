---
title: Desarrolla con Laravel 13 y Docker
date: 12/04/2026
draft: false
tags: laravel, docker, php, devops
read_time: 5 min
---

Montar un entorno de desarrollo para Laravel no debería ser un dolor de cabeza. Con el lanzamiento de **Laravel 13**, la necesidad de un entorno robusto, predecible y rápido es más crítica que nunca. 

En este "lab" rápido, exploramos cómo estructurar un entorno basado en Docker que no solo "funcione", sino que siga estándares de industria para rendimiento y seguridad.

### El Stack de 2026
Para este setup, estamos utilizando lo último disponible en el ecosistema:
- **PHP 8.4** sobre **Alpine 3.23** (ligero y seguro).
- **Laravel 13.x** con soporte nativo para las últimas APIs.
- **MariaDB 12.2** para una persistencia de datos sólida.
- **Vite 7** y **Tailwind CSS 4** para un frontend ultrarrápido.

### Arquitectura del Contenedor
A diferencia de los setups tradicionales que separan Nginx y PHP-FPM en múltiples contenedores, este proyecto utiliza `runit` para gestionar ambos procesos en un solo contenedor. Esto simplifica la comunicación y reduce la latencia de red interna.

**Puntos clave de buenas prácticas:**
1. **Usuario No-Root:** Todo el código se ejecuta bajo el usuario `laravel` (UID 1000), evitando problemas de permisos en Linux y mejorando la seguridad.
2. **Opcache Habilitado:** Configuración optimizada para que el motor de PHP vuele desde el primer `request`.
3. **Persistencia con Volúmenes:** Los directorios `vendor` y `node_modules` viven en volúmenes gestionados por Docker, mejorando drásticamente el rendimiento de I/O en macOS y Windows.

### Quick Start

Si quieres probar este entorno ahora mismo, solo necesitas clonar el repositorio y levantar los servicios:

```bash
# Clonar y configurar variables de entorno
git clone https://github.com/posesco/BaseLaravel.git
cd BaseLaravel
echo "USER_ID=$(id -u)\nGROUP_ID=$(id -g)" > .env

# Construir y levantar
docker compose build --no-cache
docker compose up -d

# Instalar Laravel (si es un proyecto nuevo)
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

### Comandos Útiles
Una vez arriba, puedes interactuar con tu app sin necesidad de instalar nada en tu host:

- **Tests:** `docker compose exec app php artisan test`
- **Tinker:** `docker compose exec app php artisan tinker`
- **Frontend:** `docker compose exec app npm run dev`

### Conclusión
Tener un entorno de desarrollo que sea un reflejo fiel de producción (pero optimizado para programar) es la mejor inversión que puedes hacer en tu flujo de trabajo. 

Puedes encontrar todo el código fuente y contribuir en:
[https://github.com/posesco/BaseLaravel](https://github.com/posesco/BaseLaravel)