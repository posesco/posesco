---
slug: laravel_lab
title: "Desarrolla con Laravel 13 y Docker"
date: "12/04/2026"
draft: false
tags: laravel, docker, php, devops
read_time: "5 min"
---

Montar un entorno de desarrollo para Laravel no debería ser un dolor de cabeza. Este laboratorio con **Laravel 13** busca un entorno reproducible, predecible y rápido para el desarrollo local.

En este "lab" rápido, exploramos una forma de estructurar un entorno basado en Docker con decisiones explícitas sobre rendimiento y seguridad. Es una referencia de desarrollo, no una arquitectura de producción validada.

### El Stack de 2026
Para este setup, el laboratorio utiliza estas versiones:
- **PHP 8.4** sobre **Alpine 3.23**.
- **Laravel 13.x** como framework de aplicación.
- **MariaDB 12.2** para una persistencia de datos sólida.
- **Vite 7** y **Tailwind CSS 4** para el flujo de frontend.

### Arquitectura del Contenedor
A diferencia de los setups que separan Nginx y PHP-FPM, este proyecto utiliza `runit` para gestionar ambos procesos en un contenedor. Simplifica el laboratorio, a cambio de acoplar sus ciclos de vida y escalado.

**Puntos clave de buenas prácticas:**
1. **Usuario No-Root:** Todo el código se ejecuta bajo el usuario `laravel` (UID 1000), evitando problemas de permisos en Linux y mejorando la seguridad.
2. **Opcache Habilitado:** Configuración orientada a reducir recompilaciones de PHP.
3. **Persistencia con Volúmenes:** Los directorios `vendor` y `node_modules` viven en volúmenes gestionados por Docker, lo que puede mejorar el rendimiento de I/O en macOS y Windows.

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
Un entorno de desarrollo reproducible reduce diferencias innecesarias entre equipos. La paridad real con producción requiere validar por separado topología, secretos, observabilidad, escalado y recuperación.

Puedes encontrar todo el código fuente y contribuir en:
[https://github.com/posesco/BaseLaravel](https://github.com/posesco/BaseLaravel)
