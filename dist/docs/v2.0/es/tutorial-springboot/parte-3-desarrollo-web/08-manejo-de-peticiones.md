---
title: "Sesión 8: Manejo de Peticiones"
position: 2
author: "El Equipo de Spring Boot"
date: "2024-09-22"
---

# Sesión 8: Manejo de Peticiones

Spring MVC ofrece un conjunto de anotaciones para mapear peticiones web a métodos específicos en tus controladores.

## Anotaciones de Mapeo

- `@RequestMapping`: La anotación más general. Puedes especificar el método HTTP (`method = RequestMethod.GET`).
- `@GetMapping`: Atajo para `@RequestMapping(method = RequestMethod.GET)`.
- `@PostMapping`: Para peticiones POST.
- `@PutMapping`: Para peticiones PUT.
- `@DeleteMapping`: Para peticiones DELETE.
- `@PatchMapping`: Para peticiones PATCH.

## Extrayendo Datos de la Petición

- `@PathVariable`: Extrae valores de la URL. Ejemplo: `/users/{userId}`.
- `@RequestParam`: Extrae parámetros de la query string. Ejemplo: `/search?q=spring`.
- `@RequestBody`: Deserializa el cuerpo de la petición (ej. JSON) a un objeto Java.

### Ejemplo Combinado

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // GET /api/users?role=admin
    @GetMapping
    public List<User> getUsersByRole(@RequestParam(defaultValue = "user") String role) {
        // Lógica para filtrar usuarios por rol
        return List.of(new User(1L, "Admin User"));
    }

    // POST /api/users
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        // Lógica para guardar el nuevo usuario
        User savedUser = userService.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
```