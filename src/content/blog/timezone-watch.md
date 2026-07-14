---
slug: timezone-watch
title: "Un reloj entre zonas horarias"
date: "25/04/2026"
draft: false
tags: devops, javascript, familia, ai
read_time: "3 min"
---
A veces, la distancia no se mide en kilómetros, sino en zonas horarias. Al vivir lejos de un familiar menor, me enfrenté a un reto cotidiano: explicar de forma visual por qué a veces era de día para una persona mientras la otra dormía.

Con la idea y el apoyo de una persona cercana, decidí buscar una solución. Combinando mi experiencia técnica y Gemini CLI para orquestar modelos de lenguaje y acelerar la creación del código, construí un pequeño reloj web para conectar ambas rutinas.

## Sincronizando nuestros mundos

Como profesional en SRE y DevOps, mi trabajo diario consiste en conectar sistemas, mejorar la disponibilidad y automatizar procesos. En este proyecto apliqué esas ideas a un problema personal: comunicar disponibilidad de forma sencilla y visual.

El reloj está diseñado para que una persona menor pueda entender el concepto del tiempo a través de elementos visuales:

* **Dual Timezone:** Visualización exacta y simultánea de las zonas `America/Bogota` y `Europe/Madrid`.
* **Ciclo Circadiano:** Estados automáticos de "Awake" (Despierto) y "Asleep" (Dormido) con animaciones diferenciadas, para comunicar de un vistazo si es un buen momento para llamar.
* **Avatar Dinámico:** Un sistema visual que cambia según el estado horario.
* **Micro-interacciones:** Efecto de zoom y respuestas visuales fluidas al interactuar con las tarjetas de tiempo.

## Arquitectura limpia y despliegue continuo

Para el desarrollo, apliqué principios de ingeniería para mantener el sistema rápido, ligero y sin dependencias externas:

1.  **Frontend sin fricciones:** Utilicé tecnología "Clean" con Vanilla HTML5, JS ES6+ y CSS3 Variables bajo una estructura BEM lite.
2.  **Assets ligeros:** Implementación de SVGs inyectados de forma dinámica para asegurar una carga instantánea.
3.  **Pipeline CI/CD:** Configuré flujos de trabajo con GitHub Actions para automatizar el despliegue directo en GitHub Pages tras cada actualización.

![Interfaz del reloj entre zonas horarias](/timezone-watch.png)


### Conclusión

Las herramientas modernas de IA y las prácticas de automatización no solo sirven para optimizar infraestructuras corporativas; también son excelentes puentes para acortar distancias afectivas.

El resultado es más que código: una herramienta educativa creada con empatía para transformar un problema técnico y emocional en una forma más clara de mantener el contacto.
