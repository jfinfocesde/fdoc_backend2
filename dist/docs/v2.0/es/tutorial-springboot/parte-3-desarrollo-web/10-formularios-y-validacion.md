---
title: "Sesión 10: Formularios y Validación"
position: 4
author: "El Equipo de Spring Boot"
date: "2024-09-28"
---

# Sesión 10: Manejo de Formularios y Validación de Datos

Spring Boot facilita el manejo de envíos de formularios y la validación de los datos de entrada.

## Configuración de Validación

Añade la dependencia `spring-boot-starter-validation` a tu `pom.xml`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

## Objeto del Formulario (DTO)

Crea una clase que represente los datos del formulario y añade anotaciones de validación (de `jakarta.validation.constraints`).

```java
public class UserForm {

    @NotEmpty
    @Size(min = 2, max = 30)
    private String name;

    @NotEmpty
    @Email
    private String email;

    // Getters y Setters...
}
```

## Controlador y Vista

El controlador tendrá dos métodos: uno para mostrar el formulario (GET) y otro para procesarlo (POST).

**Controlador:**
```java
@Controller
public class FormController {

    @GetMapping("/register")
    public String showForm(Model model) {
        model.addAttribute("userForm", new UserForm());
        return "register-form";
    }

    @PostMapping("/register")
    public String processForm(@Valid UserForm userForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register-form"; // Vuelve a mostrar el formulario con errores
        }
        // Lógica para guardar el usuario
        return "redirect:/success";
    }
}
```

**Vista (usando Thymeleaf):**
```html
<form action="#" th:action="@{/register}" th:object="${userForm}" method="post">
    <div>
        <label>Nombre:</label>
        <input type="text" th:field="*{name}" />
        <p th:if="${#fields.hasErrors('name')}" th:errors="*{name}">Error de Nombre</p>
    </div>
    <!-- Campos para email, etc. -->
    <button type="submit">Registrar</button>
</form>
```