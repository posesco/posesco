---
title: Un reloj para Elliot
date: 04/25/2026
draft: false
tags: devops, javascript, familia, ai
read_time: 3 min
---
# Acortando distancias: Un reloj dual para Elliot

A veces, la distancia no se mide en kilómetros, sino en zonas horarias. Al estar en España mientras mi hijo Elliot, de 6 años, vive en Colombia, me enfrenté a un reto diario: él no entendía por qué yo estaba durmiendo cuando para él era de día. Se enojaba pensando que no quería contestarle el teléfono. 

Fue gracias a la idea amorosa y comprensiva de mi novia y compañera de vida que decidí buscar una solución. Combinando mi experiencia técnica y el uso de Gemini CLI para orquestar modelos de lenguaje y acelerar la creación del código, nació [ElliotWatch](https://posesco.github.io/ElliotWatch/).

![ElliotWatch Repository](https://img.shields.io/badge/ElliotWatch-Deployed-success?style=for-the-badge&logo=github)

## Sincronizando nuestros mundos

Como profesional en SRE y DevOps, mi trabajo diario consiste en conectar sistemas, asegurar la disponibilidad y automatizar procesos. Pero este proyecto tenía el propósito más crítico de todos: asegurar mi disponibilidad emocional y enseñarle a mi hijo, de una forma visual, que siempre estoy pendiente de él.

El reloj está diseñado para que un niño pueda entender el concepto del tiempo a través de elementos visuales:

* **Dual Timezone:** Visualización exacta y simultánea de las zonas `America/Bogota` y `Europe/Madrid`.
* **Ciclo Circadiano:** Estados automáticos de "Awake" (Despierto) y "Asleep" (Dormido) con animaciones diferenciadas, para que Elliot sepa de un vistazo si es un buen momento para llamar.
* **Avatar Dinámico:** Un sistema basado en estados emocionales que cambia dinámicamente.
* **Micro-interacciones:** Efecto de zoom y respuestas visuales fluidas al interactuar con las tarjetas de tiempo.

## Arquitectura limpia y despliegue continuo

Para el desarrollo, apliqué principios de ingeniería para mantener el sistema rápido, ligero y sin dependencias externas:

1.  **Frontend sin fricciones:** Utilicé tecnología "Clean" con Vanilla HTML5, JS ES6+ y CSS3 Variables bajo una estructura BEM lite.
2.  **Assets ligeros:** Implementación de SVGs inyectados de forma dinámica para asegurar una carga instantánea.
3.  **Pipeline CI/CD:** Configuré flujos de trabajo con GitHub Actions para automatizar el despliegue directo en GitHub Pages tras cada actualización. 

Puedes revisar el código fuente completo en el repositorio: [github.com/posesco/ElliotWatch](https://github.com/posesco/ElliotWatch).

### Conclusión

Las herramientas modernas de IA y las prácticas de automatización no solo sirven para optimizar infraestructuras corporativas; también son excelentes puentes para acortar distancias afectivas. 

ElliotWatch es más que código: es una herramienta educativa y un mensaje constante de amor para mi hijo. Y, sobre todo, es el resultado del trabajo en equipo, impulsado por los consejos y la empatía de mi compañera permanente, quien me ayudó a transformar un problema técnico y emocional en una solución que nos une todos los días.