---
title: "Sesión 17: Monitoreo con Actuator"
position: 3
author: "El Equipo de Spring Boot"
date: "2025-1-01"
---

# Sesión 17: Monitoreo con Spring Boot Actuator

Spring Boot Actuator expone endpoints para monitorear y gestionar tu aplicación en producción.

## Configuración

1.  Añade `spring-boot-starter-actuator` a tu `pom.xml`.
2.  Por seguridad, la mayoría de los endpoints no están expuestos por defecto a través de HTTP. Habilítalos en `application.properties`:

```properties
# Exponer endpoints específicos de Actuator
management.endpoints.web.exposure.include=health,info,metrics
```

## Explorador de Endpoints

Actuator proporciona varios endpoints. Los más comunes son:
- `health`: Muestra la salud de la aplicación.
- `info`: Muestra información general de la aplicación.
- `metrics`: Muestra una variedad de métricas (uso de memoria, CPU, etc.).

Usa el explorador de API a continuación para probar estos endpoints directamente. Asegúrate de que tu aplicación se esté ejecutando.

+++api-explorer
---
baseUrl: "http://localhost:8080/actuator"
endpoints:
  - path: "/health"
    method: "GET"
    title: "Comprobar Salud"
    description: "Verifica el estado de salud de la aplicación y sus componentes."
  - path: "/info"
    method: "GET"
    title: "Obtener Información de la App"
    description: "Muestra información personalizada de la aplicación (si está configurada)."
  - path: "/metrics"
    method: "GET"
    title: "Ver Métricas"
    description: "Lista todas las métricas disponibles que pueden ser consultadas."
  - path: "/metrics/jvm.memory.used"
    method: "GET"
    title: "Obtener Métrica Específica"
    description: "Recupera el valor de una métrica específica, como la memoria JVM usada."
---
+++

## Visualización de Métricas

Los datos de los endpoints de Actuator se pueden alimentar en sistemas de monitoreo para crear dashboards. El siguiente gráfico es un ejemplo de cómo podrías visualizar una métrica como el uso de la CPU a lo largo del tiempo.

+++

+++



