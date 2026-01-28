---
title: "Sesión 6: Configuración con Properties y YAML"
position: 3
author: "El Equipo de Spring Boot"
date: "2024-09-16"
---

# Sesión 6: Configuración con `application.properties` y YAML

Spring Boot permite externalizar la configuración para que puedas trabajar con la misma aplicación en diferentes entornos.

## `application.properties`

Este es el formato por defecto. Se encuentra en `src/main/resources`.

```properties
# Puerto del servidor
server.port=8081

# Nombre de la aplicación
spring.application.name=mi-app
```

## `application.yml`

YAML es una alternativa popular por su sintaxis más legible y jerárquica. Spring Boot lo soporta automáticamente si tienes la dependencia `snakeyaml` en tu classpath (incluida en `spring-boot-starter`).

```yaml
server:
  port: 8081

spring:
  application:
    name: mi-app
```

## Acceder a las Propiedades

Puedes inyectar valores de configuración en tus beans usando la anotación `@Value`.

```java
@Component
public class MyComponent {

    @Value("${spring.application.name}")
    private String appName;

    // ...
}
```