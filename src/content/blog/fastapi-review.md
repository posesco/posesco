---
title: De tutorial a proyecto real
date: 08/05/2026
draft: false
tags: fastapi, python, docker, clean-architecture, observability, sre, ia
read_time: 12 min
---

# De tutorial a proyecto real: construyendo una API con FastAPI

Hay un salto que todo desarrollador conoce bien: terminas un tutorial, entiendes los conceptos básicos, y luego te quedas mirando la pantalla sin saber cómo pasar de ese "hola mundo" a algo que tenga estructura, que escale, que se pueda mantener. Este proyecto nació exactamente de ese punto.

`movie-fastapi-project` no es un proyecto de producción ni pretende serlo. Es un laboratorio personal con un objetivo concreto: aplicar, en un contexto real y funcional, las tecnologías y patrones que un ingeniero de backend o SRE encuentra en su día a día. La idea es tener una base de consulta construida sobre ejemplos propios, no sobre documentación abstracta.

Pero hay una motivación más profunda, y es la que mantiene el proyecto vivo. Un SRE que solo conoce operaciones es un ingeniero incompleto. Entender cómo un equipo de desarrollo toma decisiones de arquitectura, por qué elige un ORM sobre otro, cómo gestiona migraciones, cómo estructura sus tests, es lo que permite diseñar plataformas que realmente sirvan a quienes las usan. No se puede hablar de observabilidad con un equipo de desarrollo si no sabes lo que es un span. No se puede proponer una estrategia de despliegue si no entiendes el ciclo de vida de una feature branch. Construir y mantener este proyecto es una forma deliberada de no quedarse atrapado en el lado de las operaciones y entender el trabajo completo.

---

## El punto de partida: ¿por qué FastAPI?

FastAPI se ha consolidado como el framework de referencia para construir APIs en Python moderno. Su propuesta es directa: rendimiento comparable a Node.js o Go gracias a su base asíncrona (Starlette + ASIO), validación automática de datos con Pydantic, y documentación OpenAPI generada sin esfuerzo.

Pero más allá del rendimiento, lo que hace interesante a FastAPI para un proyecto de aprendizaje es que te obliga a pensar en tipos, en contratos de datos, en separación de responsabilidades. No te deja escribir código descuidado sin que se note.

---

## Arquitectura: Clean Architecture con SOLID como guía

El primer reto al salir de un tutorial es decidir cómo organizar el código. La respuesta aquí fue aplicar **Clean Architecture** con los principios **SOLID** como guía de diseño.

```
src/
├── api/          # Controladores y endpoints (DI con Depends)
│   └── v1/       # Versionado explícito desde el inicio
├── core/         # Configuración global, DB engine, seguridad, observabilidad
├── models/       # Entidades de base de datos (SQLModel)
├── repositories/ # Capa de acceso a datos con Mixins (ISP)
├── schemas/      # DTOs y validación con Pydantic
├── services/     # Lógica de negocio segregada por responsabilidad
└── middlewares/  # Manejo de errores e instrumentación
```

Cada capa tiene una responsabilidad única. Los endpoints no tocan la base de datos directamente; los repositorios no contienen lógica de negocio; los servicios no saben nada de HTTP. Esta separación no es burocracia: es lo que hace que el código sea testeable y que los cambios en una capa no rompan las demás.

Un ejemplo concreto: el principio de **Inversión de Dependencias (DIP)** se aplica en `src/api/deps.py`. Los endpoints reciben sus dependencias inyectadas (sesión de base de datos, usuario autenticado, servicio de almacenamiento) sin instanciarlas directamente. Esto permite sustituir implementaciones en tests sin modificar los controladores.

El principio de **Segregación de Interfaces (ISP)** se materializa en los repositorios mediante Mixins. En lugar de un repositorio monolítico con todos los métodos CRUD, cada Mixin expone solo las operaciones que cada entidad necesita. Un repositorio de solo lectura no hereda métodos de escritura.

---

## Stack técnico: decisiones y por qué

### Base de datos y ORM

**SQLModel** combina SQLAlchemy y Pydantic en una sola definición de modelo. El mismo objeto sirve como entidad de base de datos y como esquema de validación, eliminando la duplicación que existe cuando se usan ambas librerías por separado. Todas las operaciones son asíncronas mediante drivers async (`asyncpg` para PostgreSQL, `aiomysql` para MariaDB).

**Alembic** gestiona las migraciones de esquema de forma independiente al arranque de la aplicación. La creación de tablas no ocurre en el `startup` de FastAPI; ocurre explícitamente mediante migraciones versionadas. Esto es fundamental para entornos donde múltiples instancias arrancan simultáneamente.

### Autenticación

OAuth2 Password Flow con tokens JWT gestionados por un `AuthService` dedicado. El punto interesante no es la generación del token, sino la invalidación: al hacer logout, el JTI (JWT ID) del token se almacena en Redis con TTL igual al tiempo de expiración restante. Cualquier request con ese JTI es rechazado aunque el token sea criptográficamente válido. Esto resuelve el problema clásico de los JWT: que no se pueden revocar sin estado compartido.

### Alta disponibilidad con Nginx y Redis

La aplicación corre con **4 réplicas** balanceadas por Nginx en Round Robin. Redis no solo gestiona la blacklist de tokens; también implementa rate limiting global para protección contra fuerza bruta. El estado compartido entre réplicas (sesiones, límites de tasa) vive en Redis, no en memoria de proceso.

```yaml
# compose.app.yml (fragmento)
deploy:
  replicas: 4
```

Nginx actúa como reverse proxy con `--proxy-headers` habilitado en Uvicorn para que los headers de cliente originales lleguen correctamente a la aplicación.

### Almacenamiento híbrido

El servicio de almacenamiento de archivos es intercambiable mediante configuración: `STORAGE_BACKEND=local` o `STORAGE_BACKEND=s3`. La interfaz es la misma; la implementación concreta se inyecta en runtime. Esto es OCP (Open/Closed Principle) aplicado: añadir un nuevo backend de almacenamiento no requiere modificar el código existente.

---

## Observabilidad: los tres pilares con OpenTelemetry

Este es uno de los aspectos más valiosos del proyecto desde una perspectiva SRE. La observabilidad no es opcional ni se añade al final; está integrada desde el diseño.

**OpenTelemetry** instrumenta los tres pilares de forma unificada:

- **Trazas distribuidas**: `FastAPIInstrumentor` captura automáticamente cada request con su span completo, incluyendo las queries SQL gracias a `SQLAlchemyInstrumentor`.
- **Métricas**: Contadores y histogramas personalizados en los servicios de negocio, exportados junto a las métricas de sistema.
- **Logs estructurados**: El logging estándar de Python se enruta a través del `OTel LoggingHandler`, correlacionando cada log con su trace ID.

Todo se exporta vía OTLP/gRPC a **Grafana Alloy**, que actúa como agente unificado y distribuye hacia:

- **Prometheus** → métricas
- **Loki** → logs
- **Tempo** → trazas

El resultado es que desde Grafana puedes ir de una alerta de Prometheus a los logs del request que la causó, y de ahí al trace completo con cada operación de base de datos. Eso es lo que diferencia el debugging en producción del debugging a ciegas.

```python
# src/core/observability.py (estructura)
# Inicialización centralizada de TracerProvider, MeterProvider y LoggerProvider
# Un único punto de configuración para los tres pilares
```

**Alertmanager** está integrado con reglas de Prometheus para notificaciones proactivas. No se espera a que el usuario reporte el problema.

---

## Calidad y seguridad: no como afterthought

### Análisis estático

Tres herramientas con responsabilidades distintas:

- **Ruff**: linting y formateo. Reemplaza flake8, isort y black en una sola herramienta, con velocidad de Rust.
- **Bandit**: SAST (Static Application Security Testing) específico para Python. Detecta patrones inseguros como uso de `subprocess` sin sanitización, secrets hardcodeados, o uso de algoritmos criptográficos débiles.
- **Safety**: escanea las dependencias contra bases de datos de vulnerabilidades conocidas (CVEs).

### SonarQube

**SonarQube Community** corre como servicio en el stack de Docker. Analiza cobertura de tests, detecta code smells, duplicaciones y vulnerabilidades de seguridad con historial de evolución. La cobertura se alimenta desde el XML generado por pytest:

```bash
pytest --cov=src --cov-report=xml
./helpers/sonar-scan.sh
```

Los quality gates bloquean el avance si la cobertura cae por debajo del umbral o si aparecen vulnerabilidades críticas. Esto no es solo una métrica de vanidad; es un contrato de calidad mínima.

### CI/CD con GitHub Actions

El pipeline en `.github/workflows/ci.yml` ejecuta tests, análisis estático y reporte de cobertura en cada push. La integración con SonarQube requiere `SONAR_TOKEN` y `SONAR_HOST_URL` como secrets del repositorio.

---

## Tests de rendimiento con K6

Los tests de carga en `tests/performance/` cubren los endpoints principales con un perfil de carga realista:

- Ramp-up a 20 usuarios virtuales en 30 segundos
- Carga sostenida durante 1 minuto
- Ramp-down en 10 segundos

Los thresholds son explícitos: `p95 < 500ms` y tasa de error menor al 1%. Si no se cumplen, el test falla. Esto convierte los tests de rendimiento en una regresión detectable, no en una medición informativa.

```bash
docker run --rm -i \
  --network fastapi_net \
  -v "$(pwd)/tests/performance:/tests" \
  grafana/k6:1.7.1 run \
  -e BASE_URL=http://nginx:80 \
  /tests/get_movies.js
```

K6 corre en un contenedor efímero conectado a la red del proyecto, atacando directamente a Nginx como lo haría un cliente real.

---

## GitFlow y versionado semántico

El proyecto sigue **GitFlow** estrictamente con **SemVer 2.0.0**. No es burocracia: es la diferencia entre un historial de commits legible y un caos de "fix", "update" y "changes".

- `master`: solo código estable con tag de versión
- `develop`: integración continua
- `feat/*`, `release/*`, `hotfix/*`: ramas de soporte con propósito explícito

Los commits siguen **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.), lo que permite generar changelogs automáticos y entender el historial sin leer el diff.

Un helper script en `helpers/gitflow-release.sh` automatiza el proceso de release: merge de develop a master, tag semántico y merge de vuelta a develop.

---

## IA generativa como acelerador, no como sustituto

Una parte honesta de cómo se construyó este proyecto: la IA generativa fue una herramienta central, pero con un uso deliberado.

El error más común al usar herramientas como Claude, Gemini o Cursor es tratarlas como un oráculo al que se le hace una pregunta vaga y se acepta la respuesta sin criterio. El resultado es código que "funciona" pero que no se entiende, que no sigue los patrones del proyecto, o que introduce dependencias innecesarias.

El enfoque que funcionó aquí fue diferente: **Spec-Driven Development**. Antes de pedir código, se define la especificación. Qué debe hacer el componente, qué interfaces debe respetar, qué restricciones tiene. La IA genera una propuesta dentro de ese marco; el ingeniero evalúa, cuestiona y decide.

Esto requiere que el ingeniero tenga bases sólidas. No para reescribir lo que genera la IA, sino para saber si lo que genera es correcto, si respeta los principios de diseño del proyecto, si introduce riesgos de seguridad. La IA acelera la implementación; el criterio técnico determina si esa implementación es válida.

El **prompt engineering** en este contexto no es escribir prompts mágicos. Es saber dar contexto preciso: la arquitectura del proyecto, el patrón que se está siguiendo, las restricciones que existen. Un prompt bien construido produce código coherente con el resto del proyecto. Un prompt vago produce código que hay que reescribir.

La iteración también es clave. Rara vez la primera propuesta es la definitiva. El ciclo es: especificación → propuesta → revisión → refinamiento. Cada iteración produce algo más ajustado al problema real. Este proceso de aprender haciendo, con la IA como par de programación que no tiene ego ni se cansa, es una de las formas más eficientes de consolidar conocimiento técnico.

---

## Conclusión

El valor de un proyecto como este no está en el dominio de negocio (una API de películas es deliberadamente simple). Está en las decisiones de ingeniería que lo rodean: cómo se organiza el código, cómo se gestiona el estado compartido, cómo se instrumenta para ser observable, cómo se garantiza la calidad de forma automatizada.

Cada patrón aplicado aquí tiene un equivalente directo en sistemas de producción reales. La diferencia es la escala, no los principios.

El repositorio está disponible en:
[https://github.com/posesco/fastapi-project](https://github.com/posesco/fastapi-project)
