# Observabilidad en Kubernetes

La observabilidad no es solo monitoreo. Es entender el estado interno de tus sistemas a través de sus salidas externas.

## Los tres pilares
1. **Métricas**: Prometheus y Grafana son los reyes aquí.
2. **Logs**: ELK o Grafana Loki para centralizar logs.
3. **Trazas**: Jaeger o Tempo para entender el flujo de las peticiones.

En este post exploraremos cómo configurar un stack básico de observabilidad en un cluster de K8s.
