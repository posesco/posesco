---
slug: hermes-workspace
title: "Hermes Workspace: Tu flota de agentes IA desplegada en AWS"
date: "18/05/2026"
draft: false
tags: ai, agents, aws, terraform, sre, automation
read_time: "6 min"
---

Como SRE, mi objetivo siempre ha sido la escalabilidad y la eliminación del trabajo manual. Durante años, he automatizado infraestructuras con Terraform y Ansible, pero hoy se presenta una nueva frontera: **la automatización cognitiva**.

Ya no se trata solo de levantar contenedores, sino de desplegar **trabajadores inteligentes** que operan sobre esa infraestructura. Aquí es donde entra **Hermes Workspace**.

## ¿Qué es Hermes Workspace?

| | |
| :---: | :---: |
| ![Chat](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fchat.png&w=1920&q=75) | ![Dashboard](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fdashboard.png&w=1920&q=75) |
| ![Conductor](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fconductor.png&w=1920&q=75) | ![Settings](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fsettings.png&w=1920&q=75) |

Hermes Workspace propone un **"cockpit" (centro de mando)** para agentes de IA. Integra terminales, editores de código y orquestación de agentes en una sola interfaz web.

Lo que más me gustó del proyecto, y por lo que decidí integrarlo en mi AWS Lab, es que permite explorar la interacción con modelos de lenguaje desde una interfaz operativa para agentes.

### Capacidades que exploré en el laboratorio

*   **Modo "Conductor" (Swarm):** Permite coordinar agentes para investigar documentación, editar código y ejecutar pruebas en paralelo, sujeto a la configuración y supervisión del usuario.
*   **Inspección de Memoria en Tiempo Real:** Como ingeniero, odio las "cajas negras". Hermes me permite ver y editar lo que el agente recuerda, ajustando su contexto sobre la marcha.
*   **Skills:** Puede ampliar sus acciones mediante herramientas configurables y flujos reutilizables.
*   **Human-in-the-loop:** Las "Tool Cards" añaden puntos de aprobación antes de comandos sensibles; reducen riesgo, pero no sustituyen aislamiento, mínimo privilegio ni revisión.

## El enfoque SRE: Infraestructura como Código (IaC)

Un despliegue manual dificulta reproducir y revisar el entorno. Por eso, he integrado Hermes Workspace en mi laboratorio de AWS utilizando **Terraform**.

He diseñado un módulo de laboratorio que aprovisiona una instancia **EC2** con el stack necesario (Node 24, Python 3.11, PNPM) mediante **Cloud-init**. El objetivo es que el entorno sea:
1.  **Reproducible:** Aprovisionado desde la misma definición de infraestructura.
2.  **Aislado:** Ubicado en una VPC propia, con roles de IAM específicos y sin claves estáticas en el código.
3.  **Efímero:** Lo levanto cuando necesito una flota de agentes para un proyecto y lo destruyo al terminar.

### Seguridad y Potencia: Amazon Bedrock sin API Keys

Aquí es donde la arquitectura se pone realmente interesante. Mi configuración en el repositorio aprovecha **Amazon Bedrock** para dar vida a los agentes. Pero no lo hago de la forma tradicional de usar API Keys de terceros.

*   **Identidad como perímetro:** Utilizo políticas de IAM asignadas al rol de la instancia EC2, evitando API keys estáticas en código o variables de entorno para el acceso a Bedrock.
*   **Acceso multimodelo:** La disponibilidad depende de los modelos habilitados en Amazon Bedrock, la región y las cuotas de la cuenta.
*   **Facturación centralizada:** El consumo de Bedrock queda reflejado en AWS, lo que facilita observar costes dentro del laboratorio.

## El poder de la IA Generativa y el "Harness" adecuado

La **IA Generativa**, cuando se utiliza bajo un buen **harness** (un marco de trabajo sólido y estructurado como este), puede ejecutar flujos más útiles y controlables.

Un modelo con acceso controlado a terminal, sistema de archivos y herramientas puede ejecutar flujos útiles, pero sigue requiriendo límites, observabilidad y criterio humano.

### Mira el código y despliega tu flota

El código de este despliegue está libre y a disposición pública para que puedas probarlo por tu cuenta. Sin soluciones cerradas; construye tu propia infraestructura de agentes.

🔗 **Repositorio del proyecto:** [AWSLab - EC2 Hermes Workspace](https://github.com/posesco/AWSLab/tree/master/projects/ec2_hermes_workspace)

## Conclusión

Este laboratorio explora el paso de asistentes que sugieren a agentes capaces de ejecutar acciones. Es una hipótesis técnica para aprender sobre aislamiento, identidad, costes y operación; no una validación de producción.


> **Documentación oficial:** [Hermes Workspace](https://hermes-workspace.com/).
