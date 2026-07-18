---
slug: gentle-ai
title: "Gentle AI: disciplina para trabajar con agentes desde la terminal"
date: "16/07/2026"
draft: true
tags: inteligencia artificial, agentes, terminal, desarrollo
read_time: "8 min"
---

Un modelo potente puede escribir código con rapidez y, aun así, perder contexto, mezclar responsabilidades o avanzar sobre decisiones que nadie tomó. El problema no siempre está en la capacidad del modelo, sino en la estructura que rodea su trabajo.

He utilizado Gentle AI con tres clientes distintos: OpenCode, Google Antigravity CLI mediante `agy` y Codex CLI. En los tres casos, su aporte no ha sido volver más inteligente al modelo, sino darle un proceso con memoria, etapas, límites y puntos de verificación.

Gentle AI, creado por [Alan Buscaglia](https://github.com/sponsors/Gentleman-Programming), es un configurador para agentes de desarrollo existentes. Integra memoria persistente, desarrollo guiado por especificaciones, habilidades especializadas, servidores MCP y flujos de revisión sin presentarse como un agente adicional ni como una colección de instrucciones aisladas.

![Banner oficial de Gentle AI, una capa de disciplina para agentes de desarrollo](https://raw.githubusercontent.com/Gentleman-Programming/gentle-ai/refs/heads/main/docs/assets/brand/gentle-ai-banner.png)

## No mejora el modelo: organiza el trabajo

Los agentes suelen ser convincentes al comienzo de una tarea. Exploran el proyecto, relacionan archivos y producen cambios con una velocidad difícil de igualar manualmente. La dificultad aparece cuando la conversación crece, el contexto se compacta o los requisitos dejan espacios abiertos que el modelo completa por su cuenta.

Gentle AI busca reducir ese margen de improvisación mediante una disciplina repetible:

**Memoria:** conserva conocimiento relevante para que una sesión nueva no dependa únicamente de lo que todavía cabe en la conversación actual.

**Etapas:** separa exploración, propuesta, requisitos, diseño, implementación y verificación. La intención es comprender primero qué se debe construir y bajo qué condiciones.

**Roles:** cuando el cliente lo permite, distribuye el trabajo entre agentes especializados. Así, explorar, implementar y revisar no tienen que ocurrir dentro del mismo contexto.

**Contexto controlado:** carga instrucciones, habilidades y herramientas cuando son pertinentes. Entregar todo el material disponible a todos los agentes también puede introducir ruido.

El valor no está en inventar prácticas nuevas, sino en convertirlas en un sistema aplicable de manera consistente. Pedirle a un agente que "tenga cuidado" es una expectativa; definir fases, responsabilidades y evidencias es un proceso de ingeniería.

## Engram: contexto que sobrevive a la sesión

[Engram](https://github.com/Gentleman-Programming/engram) es el componente de memoria persistente del ecosistema. Registra observaciones como decisiones de arquitectura, convenciones del proyecto, descubrimientos, errores resueltos y resúmenes de sesión. Cuando el agente vuelve a consultar ese conocimiento, una decisión puede sobrevivir al cierre de la terminal, a una conversación nueva e incluso a la compactación del contexto del modelo.

Esto resulta valioso porque el contexto de una conversación es temporal y limitado. Un equipo puede haber definido por qué eligió una estrategia de autenticación, qué restricción impuso una integración o cómo resolvió un fallo difícil; si esa explicación solo permanece en un chat anterior, el siguiente agente probablemente tendrá que reconstruirla. Engram convierte ese aprendizaje en información recuperable y asociada con el proyecto.

Su funcionamiento es local por defecto. La memoria se conserva en una base de datos local y los clientes compatibles acceden a ella mediante MCP. Por eso, OpenCode, `agy` y Codex CLI pueden consultar conocimiento del mismo proyecto en una máquina cuando cada cliente está configurado para usar el mismo Engram local. Esto es acceso compartido entre agentes, no autenticación compartida entre clientes.

La memoria local tampoco se comparte automáticamente con otras personas o máquinas. Para trasladarla, Engram ofrece mecanismos explícitos:

**Sincronización mediante Git:** permite exportar la memoria del proyecto a archivos que pueden versionarse e importarse en otra máquina. El acceso depende del repositorio y del flujo de colaboración utilizado por el equipo.

**Engram Cloud:** ofrece replicación opcional por proyecto y visibilidad desde un navegador. Puede ejecutarse en infraestructura propia; la base local continúa siendo la fuente autoritativa y la nube actúa como una capa de sincronización y acceso compartido.

Esta distinción evita una conclusión equivocada: instalar Engram de forma local no publica la memoria ni la vuelve visible para otras personas. La colaboración requiere sincronización, acceso al repositorio o una instancia de Engram Cloud configurada para ese propósito.

La persistencia también exige criterio editorial. Una memoria incorrecta, ambigua o desactualizada puede hacer que varios agentes repitan el mismo error con mayor consistencia. Conviene guardar decisiones que tengan contexto, alcance y justificación; actualizar las que evolucionan; y revisar el conocimiento compartido cuando cambia la realidad del proyecto. Una memoria útil no es la que acumula más contenido, sino la que conserva información verificable y vigente.

## Mi experiencia con tres clientes

Mi flujo de trabajo está centrado en la terminal. En ese entorno, Gentle AI me ha servido para dirigir el trabajo sin reducirlo a una secuencia interminable de instrucciones manuales.

Con [OpenCode](https://opencode.ai/docs/), la integración ofrece un orquestador principal, agentes especializados y perfiles que pueden asignar modelos por fase. Esta estructura encaja especialmente bien con la intención de mantener la conversación principal enfocada mientras la exploración, la implementación o la verificación se ejecutan en contextos delimitados.

También he trabajado con [Google Antigravity CLI](https://antigravity.google/docs/cli/overview) mediante `agy`. Es un cliente independiente, orientado a la terminal, en el que Gentle AI conserva el flujo disciplinado aunque la forma de ejecutar las fases y delegar tareas dependa de las capacidades propias de Antigravity.

Además, he utilizado Gentle AI con [Codex CLI](https://developers.openai.com/codex/cli). La integración oficial configura sus instrucciones, habilidades y servidores MCP en los formatos propios de Codex. Su flujo no debe confundirse con el de OpenCode ni con el de `agy`: cada cliente tiene su propia configuración y sus propias capacidades.

Entre los tres, OpenCode es el entorno con el que he obtenido las mejores respuestas y los mejores resultados generales. Es una valoración basada en mi experiencia, no un estudio comparativo ni una afirmación universal. La configuración, el modelo seleccionado y el tipo de tarea influyen en el resultado. En mi caso, la calidad observada y el ajuste entre la integración de Gentle AI y el flujo de orquestación de OpenCode han producido la experiencia más consistente.

OpenCode, Google Antigravity CLI y Codex CLI siguen siendo clientes separados. Cada uno mantiene su propia configuración, sesión y mecanismo de autenticación. Gentle AI puede aplicar una disciplina semejante y Engram puede poner conocimiento común a disposición de los agentes, pero eso no convierte sus credenciales o identidades en una cuenta compartida.

## Los problemas que ayuda a tratar

El trabajo con agentes presenta fallas recurrentes que no se resuelven únicamente con un modelo más capaz:

**Pérdida de contexto:** las sesiones extensas acumulan instrucciones, decisiones y resultados difíciles de sostener dentro de una sola conversación.

**Responsabilidades mezcladas:** el mismo agente puede explorar, diseñar, implementar y revisar su propio trabajo, con el riesgo de confirmar sus errores.

**Decisiones inventadas:** ante requisitos incompletos, el modelo puede elegir una solución razonable que nunca fue acordada.

**Cambios difíciles de revisar:** la velocidad para producir modificaciones supera con facilidad la capacidad humana para evaluarlas.

**Falta de continuidad:** sin memoria persistente, el conocimiento adquirido durante una sesión debe explicarse o descubrirse de nuevo.

Gentle AI no elimina estas fallas. Introduce momentos para detectarlas, limitar su impacto y exigir que el trabajo se explique, se divida y se verifique.

## Control no significa garantía

Un proceso ordenado no convierte una respuesta probabilística en una verdad garantizada. Engram puede conservar una decisión equivocada, una especificación puede estar incompleta y una revisión automatizada puede pasar por alto un problema real.

Las pruebas y la validación del comportamiento siguen siendo necesarias. Los permisos, el aislamiento, los datos sensibles y la confianza depositada en habilidades o servidores MCP externos continúan bajo responsabilidad humana. Del mismo modo, delegar tareas y mantener verificaciones puede consumir más tiempo o más recursos; no todas las tareas serán más rápidas por adoptar un flujo más estructurado.

La estructura facilita la revisión, pero no reemplaza los criterios de seguridad, rendimiento, observabilidad y despliegue que exige un sistema en producción. El agente puede proponer, implementar y ayudar a verificar; una persona sigue decidiendo qué es válido, qué riesgo acepta y qué llega a producción.

## Conclusión

Gentle AI no hace que un modelo sepa más. Organiza el trabajo alrededor de memoria, etapas, responsabilidades y evidencias. Engram completa esa propuesta al permitir que el conocimiento útil sobreviva a las sesiones y pueda estar disponible para otros agentes o, mediante mecanismos explícitos de sincronización, para otras personas y máquinas.

En mi experiencia, esa combinación reduce la necesidad de reconstruir contexto y hace más visible dónde termina el dato verificable y dónde empieza la decisión del agente. OpenCode ha sido el cliente que mejores resultados me ha dado, mientras que `agy` y Codex CLI ofrecen formas distintas de aplicar la misma disciplina.

La capacidad del modelo importa, pero la confianza en su trabajo depende también del sistema que conserva las decisiones, limita el alcance y verifica los resultados.

## Referencias

- [Gentle AI en GitHub](https://github.com/Gentleman-Programming/gentle-ai)
- [Uso previsto de Gentle AI](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/intended-usage.md)
- [Agentes y clientes compatibles con Gentle AI](https://github.com/Gentleman-Programming/gentle-ai/blob/main/docs/agents.md)
- [Engram en GitHub](https://github.com/Gentleman-Programming/engram)
- [Configuración de agentes en Engram](https://github.com/Gentleman-Programming/engram/blob/main/docs/AGENT-SETUP.md)
- [Uso de Engram en equipos](https://github.com/Gentleman-Programming/engram/blob/main/docs/TEAM-USAGE.md)
- [Engram Cloud](https://github.com/Gentleman-Programming/engram/blob/main/docs/engram-cloud/README.md)
- [Perfil oficial de Alan Buscaglia](https://github.com/sponsors/Gentleman-Programming)
- [Documentación de OpenCode](https://opencode.ai/docs/)
- [Documentación de Google Antigravity CLI](https://antigravity.google/docs/cli/overview)
- [Documentación de Codex CLI](https://developers.openai.com/codex/cli)
