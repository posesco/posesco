---
title: Hermes Workspace: Tu flota de agentes IA desplegada en AWS
date: 18/05/2026
draft: false
tags: ai, agents, aws, terraform, sre, automation
read_time: 6 min
---

# Hermes Workspace: De chats aislados a una flota de trabajadores autónomos

Como SRE, mi objetivo siempre ha sido la escalabilidad y la eliminación del trabajo manual. Durante años, he automatizado infraestructuras con Terraform y Ansible, pero hoy se presenta una nueva frontera: **la automatización cognitiva**.

Ya no se trata solo de levantar contenedores, sino de desplegar **trabajadores inteligentes** que operan sobre esa infraestructura. Aquí es donde entra **Hermes Workspace**.

## ¿Qué es Hermes Workspace?

| | |
| :---: | :---: |
| ![Chat](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fchat.png&w=1920&q=75) | ![Dashboard](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fdashboard.png&w=1920&q=75) |
| ![Conductor](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fconductor.png&w=1920&q=75) | ![Settings](https://hermes-workspace.com/_next/image?url=%2Fscreenshots%2Fsettings.png&w=1920&q=75) |

Olvídate de las interfaces de chat convencionales. Hermes Workspace es el **"Cockpit" (centro de mando)** definitivo para agentes de IA. Es un entorno de trabajo completo que integra terminales reales, editores de código y un orquestador de agentes en una sola interfaz web.

Lo que más me gustó del proyecto (y por lo que decidí integrarlo en mi AWS Lab) es su capacidad para transformar la interacción con modelos de lenguaje en un sistema operativo real para agentes.

### Características que rompen el juego:

*   **Modo "Conductor" (Swarm):** Imagina lanzar un agente principal que, al detectar la complejidad de una tarea, despliega sub-agentes en paralelo. Uno investiga la documentación, otro escribe el código en el editor integrado y un tercero ejecuta los tests en la terminal PTY. **Es una flota de trabajadores actuando en sincronía.**
*   **Inspección de Memoria en Tiempo Real:** Como ingeniero, odio las "cajas negras". Hermes me permite ver y editar lo que el agente recuerda, ajustando su contexto sobre la marcha.
*   **Más de 2,000 Skills:** El agente no solo "habla"; "hace". Tiene acceso a un catálogo masivo de herramientas pre-construidas y puede aprender nuevas habilidades observando flujos de trabajo exitosos.
*   **Human-in-the-loop:** A través de "Tool Cards", el sistema me pide aprobación antes de ejecutar comandos críticos. Control total, riesgo cero.

## El enfoque SRE: Infraestructura como Código (IaC)

No sirve de nada tener la IA más avanzada si el despliegue es manual y propenso a errores. Por eso, he integrado Hermes Workspace en mi laboratorio de AWS utilizando **Terraform**.

He diseñado un módulo que aprovisiona una instancia **EC2 optimizada** con el stack necesario (Node 24, Python 3.11, PNPM) inyectado mediante **Cloud-init**. Esto garantiza que mi centro de mando de IA sea:
1.  **Reproducible:** El mismo entorno siempre.
2.  **Seguro:** Aislado en mi propia VPC, con roles de IAM específicos y sin claves expuestas.
3.  **Efímero:** Lo levanto cuando necesito una flota de agentes para un proyecto y lo destruyo al terminar.

### Seguridad y Potencia: Amazon Bedrock sin API Keys

Aquí es donde la arquitectura se pone realmente interesante. Mi configuración en el repositorio aprovecha **Amazon Bedrock** para dar vida a los agentes. Pero no lo hago de la forma tradicional de usar API Keys de terceros.

*   **Identidad es Perímetro:** Utilizo políticas de IAM asignadas directamente al rol de la instancia EC2. Esto significa **CERO API Keys** en el código o en variables de entorno.
*   **Acceso Multimodelo:** Con una sola configuración, mis agentes tienen acceso a los modelos más potentes del mercado (Claude 4.7 Opues, MiniMax M2.5, Llama 3.2, Mistral, etc.) de forma nativa.
*   **Facturación Unificada:** Todo el consumo de IA se refleja directamente en mi factura de AWS. Sin suscripciones externas, sin límites de cuotas de terceros, simplificando la gestión financiera (FinOps) al máximo.

## El poder de la IA Generativa y el "Harness" adecuado

No puedo cerrar este post sin hacer una mención especial al motor de todo esto. La **IA Generativa**, cuando se utiliza bajo un buen **harness** (un marco de trabajo sólido y estructurado como este), hace maravillas. 

Un modelo de lenguaje por sí solo es solo texto; pero un modelo de lenguaje con acceso a una terminal, un sistema de archivos y una infraestructura robusta, se convierte en un miembro más del equipo.

### Mira el código y despliega tu flota

El código de este despliegue está libre y a disposición pública para que puedas probarlo por tu cuenta. Sin soluciones cerradas; construye tu propia infraestructura de agentes.

🔗 **Repositorio del proyecto:** [AWSLab - EC2 Hermes Workspace](https://github.com/posesco/AWSLab/tree/master/projects/ec2_hermes_workspace)

## Conclusión

Estamos pasando de la era del "Copilot" (donde la IA te sugiere cosas) a la era del **Agente Autónomo** (donde la IA ejecuta por ti). Tener esta capacidad desplegada en AWS, bajo mi propio control y gestionada como código, es el siguiente nivel para cualquier profesional de DevOps o SRE.


> **Documentación oficial:** [Hermes Workspace](https://hermes-workspace.com/).
