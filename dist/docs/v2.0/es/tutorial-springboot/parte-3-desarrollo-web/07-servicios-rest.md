---
title: "Sesión 7: Creando un Servicio Web RESTful"
position: 1
author: "El Equipo de Spring Boot"
date: "2024-09-19"
---

# Sesión 7: Creando un Servicio Web RESTful

Spring Boot hace que la creación de servicios web RESTful sea increíblemente sencilla gracias a la dependencia `spring-boot-starter-web`.

## `@RestController`

Esta anotación es una combinación de `@Controller` y `@ResponseBody`. Le dice a Spring que esta clase manejará peticiones web y que los valores devueltos por sus métodos deben ser escritos directamente en el cuerpo de la respuesta (por ejemplo, como JSON).

## Ejemplo de un Controlador REST

Vamos a crear un controlador para gestionar una entidad simple, como un `Producto`.

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Record para un DTO simple
record Product(long id, String name) {}

@RestController
public class ProductController {

    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable long id) {
        // En una aplicación real, buscarías esto en una base de datos.
        return new Product(id, "Ejemplo de Producto");
    }
}
```

### ¡Pruébalo!

Usa el cliente REST a continuación para probar el endpoint que acabas de crear. Ejecuta tu aplicación y haz clic en "Enviar".

+++

+++
