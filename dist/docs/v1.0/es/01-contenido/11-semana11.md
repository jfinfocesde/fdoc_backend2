---
title: "Semana 11: Controladores en Spring Boot (Capa Web)"
description: "Guía completa y detallada sobre la creación de controladores REST, manejo de peticiones HTTP, parámetros y respuestas en Spring Boot."
position: 11
---

# 🚀 Capa de Controladores (Controller Layer)

Bienvenidos a la **Semana 11**. En este módulo aprenderemos sobre los **Controladores**, que son la puerta de entrada a nuestra aplicación. Si imaginamos nuestra aplicación como un restaurante, el **Controlador** es el mesero: recibe tu pedido (petición HTTP), lo lleva a la cocina (Servicios) y finalmente te entrega tu plato (Respuesta).

---

## 1. ¿Qué es un Controlador?

En la arquitectura **MVC (Modelo-Vista-Controlador)**, el controlador es el componente que se encarga de interceptar las peticiones del cliente (como un navegador o Postman), procesarlas y retornar una respuesta.

En Spring Boot, trabajamos principalmente con **APIs REST**, por lo que nuestros controladores devuelven datos (generalmente en formato **JSON**) en lugar de páginas HTML.

---

## 2. Anotaciones Fundamentales

Para que una clase de Java se comporte como un controlador, necesitamos usar anotaciones de Spring.

### `@RestController`
Es la anotación principal. Le dice a Spring: "Esta clase es un controlador y todas las respuestas deben ser convertidas automáticamente a JSON".
> **Nota para principiantes:** Es la unión de `@Controller` + `@ResponseBody`.

### `@RequestMapping("/ruta")`
Se usa a nivel de clase para definir la "ruta base" del controlador. Todas las funciones dentro de esta clase empezarán con esa ruta.

**Ejemplo básico:**
```java
@RestController
@RequestMapping("/api/saludo")
public class HolaMundoController {

    @GetMapping("/hola")
    public String saludar() {
        return "¡Hola Estudiante! Bienvenido a los controladores.";
    }
}
```
*Si accedes a `http://localhost:8080/api/saludo/hola`, verás el mensaje.*

---

## 3. Los Verbos HTTP (Mapping)

Cada acción que realizamos en la web tiene un "sentido" o verbo. Spring nos da anotaciones específicas para cada uno:

| Anotación | Verbo HTTP | Uso Principal |
| :--- | :--- | :--- |
| **`@GetMapping`** | GET | Consultar información (obtener datos). |
| **`@PostMapping`** | POST | Crear nuevos registros. |
| **`@PutMapping`** | PUT | Actualizar un registro completo. |
| **`@PatchMapping`** | PATCH | Actualizar solo una parte de un registro. |
| **`@DeleteMapping`** | DELETE | Eliminar un registro. |

---

## 4. Recibiendo Información del Cliente

¿Cómo nos envía datos el usuario? Hay tres formas principales:

### 4.1. `@PathVariable` (Variables en la URL)
Se usa cuando el dato es parte de la ruta, como un ID.
*   **Ruta:** `/api/usuarios/5`
```java
@GetMapping("/{id}")
public String obtenerUsuarioPorId(@PathVariable Long id) {
    return "Buscando al usuario con ID: " + id;
}
```

### 4.2. `@RequestParam` (Parámetros de Consulta)
Se usa para filtros o datos opcionales después del signo `?`.
*   **Ruta:** `/api/productos?nombre=celular&precio=500`
```java
@GetMapping("/buscar")
public String buscarProducto(
    @RequestParam String nombre,
    @RequestParam(required = false) Double precio
) {
    return "Buscando: " + nombre + " con precio: " + precio;
}
```

### 4.3. `@RequestBody` (Cuerpo de la Petición)
Se usa para recibir objetos complejos (JSON) en peticiones **POST** o **PUT**.
```java
@PostMapping
public String crearUsuario(@RequestBody Usuario usuario) {
    return "Usuario " + usuario.getNombre() + " creado con éxito.";
}
```

---

## 5. La Respuesta Perfecta: `ResponseEntity`

Como buenos desarrolladores, no debemos devolver solo datos; debemos devolver el **Código de Estado HTTP** correcto (200 OK, 201 Created, 404 Not Found, etc.).

Spring nos ofrece la clase `ResponseEntity<T>` para envolver nuestra respuesta.

**Ejemplo de una respuesta profesional:**
```java
@GetMapping("/{id}")
public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
    Producto p = servicio.buscar(id);
    
    if (p == null) {
        return ResponseEntity.notFound().build(); // Devuelve 404
    }
    
    return ResponseEntity.ok(p); // Devuelve 200 + el objeto
}
```

---

## 6. Ejemplo Práctico Completo: Gestión de Tareas

Vamos a ver cómo se vería un controlador real para una lista de tareas (To-Do List).

```java
@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    // Inyectamos el servicio (la lógica de negocio)
    @Autowired
    private TareaService tareaService;

    // 1. OBTENER TODAS LAS TAREAS
    // GET http://localhost:8080/api/tareas
    @GetMapping
    public ResponseEntity<List<Tarea>> listarTodas() {
        return ResponseEntity.ok(tareaService.obtenerTodas());
    }

    // 2. OBTENER UNA TAREA POR ID
    // GET http://localhost:8080/api/tareas/1
    @GetMapping("/{id}")
    public ResponseEntity<Tarea> obtenerPorId(@PathVariable Long id) {
        return tareaService.buscarPorId(id)
                .map(ResponseEntity::ok) // Si existe, 200 OK
                .orElse(ResponseEntity.notFound().build()); // Si no, 404
    }

    // 3. CREAR UNA NUEVA TAREA
    // POST http://localhost:8080/api/tareas
    @PostMapping
    public ResponseEntity<Tarea> crear(@RequestBody Tarea nuevaTarea) {
        Tarea creada = tareaService.guardar(nuevaTarea);
        return new ResponseEntity<>(creada, HttpStatus.CREATED); // 201 Created
    }

    // 4. ELIMINAR UNA TAREA
    // DELETE http://localhost:8080/api/tareas/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (tareaService.eliminar(id)) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.notFound().build();
    }
}
```

---

## 7. Diccionario de Anotaciones Explicadas

| Anotación | ¿Qué hace? | ¿Dónde se pone? |
| :--- | :--- | :--- |
| **`@RestController`** | Marca la clase como controlador REST. | Arriba de la Clase |
| **`@RequestMapping`** | Define la ruta URL base. | Arriba de la Clase o Método |
| **`@Autowired`** | Inyecta el Servicio automáticamente. | En el atributo del Servicio |
| **`@GetMapping`** | Mapea peticiones de lectura (GET). | Arriba del Método |
| **`@PostMapping`** | Mapea peticiones de creación (POST). | Arriba del Método |
| **`@PathVariable`** | Captura datos de la URL (ej: /id). | Dentro de los paréntesis del método |
| **`@RequestBody`** | Captura el JSON que viene en el cuerpo. | Dentro de los paréntesis del método |
| **`@ResponseStatus`**| Define el código de error por defecto. | Arriba del Método |

---

## 8. Consejos para Estudiantes

1.  **Mantén el controlador limpio:** El controlador NO debe tener lógica de negocio (if, for, cálculos complejos). Solo debe recibir datos y llamar al Servicio.
2.  **Usa nombres plurales:** Prefiere `/api/usuarios` sobre `/api/usuario`.
3.  **Prueba siempre con Postman:** Antes de conectar con el Frontend, asegúrate de que tus endpoints funcionen correctamente.
4.  **Atención a los tipos de datos:** Si en `@PathVariable` pides un `Long`, asegúrate de enviar un número en la URL, de lo contrario Spring lanzará un error de "Method Argument Type Mismatch".

---

## 9. Desafío de Práctica

Crea un controlador para un sistema de **Librería** con los siguientes requerimientos:
1.  Ruta base: `/api/libros`.
2.  Un método para obtener un libro por su código (ISBN) usando `@PathVariable`.
3.  Un método para buscar libros por género usando `@RequestParam`.
4.  Un método para registrar un nuevo libro usando `@RequestBody`.
