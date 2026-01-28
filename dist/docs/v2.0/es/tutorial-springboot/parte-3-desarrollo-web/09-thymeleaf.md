---
title: "Sesión 9: Vistas con Thymeleaf"
position: 3
author: "El Equipo de Spring Boot"
date: "2024-09-25"
---

# Sesión 9: Trabajando con Vistas Server-Side usando Thymeleaf

Aunque las APIs REST son comunes, a veces necesitas renderizar HTML en el servidor. Thymeleaf es el motor de plantillas recomendado para Spring Boot.

## Configuración

Añade la dependencia `spring-boot-starter-thymeleaf` a tu `pom.xml`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## Controlador y Vista

1.  Usa la anotación `@Controller` (en lugar de `@RestController`).
2.  El método del controlador debe devolver un `String` con el nombre de la vista.
3.  Usa un objeto `Model` para pasar datos a la vista.

**Controlador:**
```java
@Controller
public class WebController {

    @GetMapping("/greeting")
    public String greeting(@RequestParam String name, Model model) {
        model.addAttribute("name", name);
        return "greeting"; // Nombre del archivo HTML sin extensión
    }
}
```

**Vista (`src/main/resources/templates/greeting.html`):**
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Greeting</title>
</head>
<body>
    <h1 th:text="|Hola, ${name}!|">Hola, Invitado!</h1>
</body>
</html>
```

### Ejemplo Interactivo

El siguiente `live-code` embed muestra una tarjeta de perfil de usuario simple con HTML y CSS. En una aplicación real con Thymeleaf, los datos como el nombre de usuario y la imagen serían pasados dinámicamente desde el controlador.

```live-code
---
src: "https://codepen.io/Tolu_A/pen/xxZxyMM"
title: "Ejemplo de Tarjeta de Perfil Renderizada"
---
```

Visita `http://localhost:8080/greeting?name=Mundo` para ver el resultado de tu aplicación.
