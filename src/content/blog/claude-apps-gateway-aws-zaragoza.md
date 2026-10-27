---
slug: claude-apps-gateway-aws-zaragoza
title: "Claude Platform on AWS y Claude Apps Gateway: de la charla al laboratorio"
date: "27/10/2026"
draft: false
tags: ai, aws, claude, bedrock, terraform, security
read_time: "7 min"
---

Ayer hablé en **AWS User Group Zaragoza** de **Claude Platform on AWS**: una forma de acceder a la plataforma nativa de Anthropic con el control de identidades y la facturación de AWS. Ese fue el tema central de la charla. Para llevarlo a un caso concreto, presenté mi laboratorio de **Claude Apps Gateway** como complemento práctico: una arquitectura que centraliza el acceso de los desarrolladores y permite estudiar cómo conectar Claude Code con los servicios de AWS.

La presentación se apoyó en la [guía de Claude Platform on AWS](https://docs.aws.amazon.com/claude-platform/latest/userguide/welcome.html). El laboratorio, por su parte, nació de la [publicación oficial de AWS sobre Claude Apps Gateway](https://aws.amazon.com/blogs/machine-learning/introducing-claude-apps-gateway-for-aws/). Tomé su propuesta de un gateway autogestionado y la llevé a Terraform, con cambios de red para evitar dos cargos que pueden pesar bastante en un laboratorio: **AWS Client VPN y NAT Gateway**.

## Claude Platform on AWS: la idea central

Claude Platform on AWS da acceso a las capacidades nativas de la plataforma de Anthropic, como su API, Agent Skills y ejecución de código, desde una cuenta de AWS. La autenticación y los permisos se pueden gestionar con **AWS IAM**, la actividad se puede auditar con **CloudTrail** y el consumo se factura a través de **AWS Marketplace** en la factura de AWS. Para un equipo, esto permite aprovechar la experiencia de Claude sin abrir una relación de credenciales y facturación separada para cada integración.

Hay una distinción importante frente a Amazon Bedrock: **Anthropic opera Claude Platform on AWS y procesa sus peticiones**; Bedrock ejecuta la inferencia bajo el control de AWS. La elección depende de las funciones de plataforma que necesite el equipo y de sus requisitos sobre tratamiento y ubicación de datos. La [comparativa de AWS](https://docs.aws.amazon.com/claude-platform/latest/userguide/cpa-vs-bedrock.html) explica esas diferencias con más detalle.

## ¿Dónde encaja Claude Apps Gateway?

Claude Apps Gateway se sitúa entre Claude Code y el proveedor de modelos. El desarrollador inicia sesión con el proveedor de identidad del equipo y el gateway envía las peticiones al destino configurado mediante su rol de IAM. **Ese destino puede ser Amazon Bedrock o Claude Platform on AWS**, como describe la publicación oficial de AWS.

Desde ese punto central puedo definir qué modelos se ofrecen, aplicar políticas y asignar límites de gasto por grupo o usuario. El portátil no necesita credenciales de AWS para invocar los modelos. En mi laboratorio, **Amazon Cognito** proporciona la identidad OIDC de las personas; el rol de IAM de ECS autoriza la llamada del gateway al proveedor. **RDS PostgreSQL** guarda el estado y las cuotas del gateway.

## El laboratorio que mostré: Bedrock hoy, Claude Platform como siguiente ruta

El despliegue actual utiliza dos cuentas de AWS en `eu-west-1`: una para la identidad y otra para la carga de trabajo. Cognito autentica al usuario; el gateway se ejecuta en **ECS Fargate**, detrás de un **Application Load Balancer interno**, y llama a **Amazon Bedrock**. Todo está definido en Terraform para poder revisar y reproducir la configuración.

![Arquitectura actual del laboratorio con Cognito, Tailscale, ALB interno, Claude Apps Gateway en ECS, RDS y Amazon Bedrock](/architecture.svg)

El recorrido desde el portátil es: **Claude Code → Tailscale → ALB interno → gateway → Bedrock**. Durante `claude /login`, el navegador completa el inicio de sesión con Cognito. Las políticas y los límites se aplican en el gateway, no en una configuración que cada persona tenga que mantener por su cuenta.

El cambio hacia Claude Platform on AWS **empieza en `config/gateway.yaml.tftpl`**, la plantilla que genera `gateway.yaml`. Hoy declara `provider: bedrock` y asigna los modelos a perfiles de Bedrock. Para usar Claude Platform on AWS habría que configurar el upstream `anthropicAws`, la región y el identificador del *workspace*, adaptar los modelos y dar al rol de ECS los permisos IAM correspondientes. También hace falta habilitar el servicio y preparar el *workspace* en la cuenta. **Esa adaptación todavía no está implementada ni validada en el repositorio**; el diagrama muestra el despliegue actual con Bedrock.

## Las decisiones que reducen el coste de red

### Acceso privado sin AWS Client VPN

Para llegar al ALB interno utilizo un **Tailscale Subnet Router** en una instancia EC2. El equipo entra por la red de Tailscale y accede a la dirección privada del balanceador. Así evito desplegar AWS Client VPN para este laboratorio sin publicar el ALB en Internet.

### Salida de ECS sin NAT Gateway

Las tareas de ECS están en subredes públicas y reciben una IP pública para salir a los servicios que necesitan. Esto permite prescindir del NAT Gateway. El grupo de seguridad de las tareas solo admite el tráfico de entrada del ALB interno hacia el gateway: **tener IP pública no equivale a permitir conexiones directas desde Internet**.

Es una decisión deliberada para este entorno, con una contrapartida que conviene revisar en cada despliegue. Se evita el cargo del NAT Gateway, pero siguen existiendo los costes de Fargate, ALB, EC2, RDS, direcciones IPv4 públicas y uso de Bedrock. No es una arquitectura de coste cero.

## Lo que me llevo de la charla

Claude Platform on AWS abre el acceso a las capacidades nativas de Anthropic conservando **IAM, auditoría y facturación en AWS**. El laboratorio muestra cómo añadir una capa de identidad, políticas y presupuestos para Claude Code, y cómo escoger una red cuyo coste tenga sentido para el tamaño del equipo. La [arquitectura de gateway publicada por AWS](https://aws.amazon.com/blogs/machine-learning/introducing-claude-apps-gateway-for-aws/) fue el punto de partida; el acceso con Tailscale y la salida sin NAT Gateway son las adaptaciones que hice para este entorno.

He publicado el código, la configuración de Terraform y el diagrama en el [repositorio de Claude Gateway en AWS](https://github.com/posesco/claude-gateway-aws/). Si quieres probarlo, revisa primero los requisitos de cuentas, dominio, acceso a Bedrock y costes de los recursos que vayas a dejar activos.
