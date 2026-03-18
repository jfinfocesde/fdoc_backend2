---
title: "9. Controladores REST"
position: 9
---

# Controladores REST

## ¿Qué es un controlador?

El **controlador** es la puerta de entrada de la aplicación. Recibe las peticiones HTTP desde el cliente, las delega al servicio correspondiente y devuelve la respuesta HTTP.

---

## Los métodos HTTP en REST

+++comparison-table
---
headers:
  - "Método HTTP"
  - "Acción"
  - { text: "Ejemplo en el proyecto", highlight: true }
rows:
  - ["GET", "Leer datos", "Obtener todas las mesas"]
  - ["POST", "Crear un recurso", "Crear una nueva mesa"]
  - ["PUT", "Actualizar completo", "Actualizar todos los campos de una mesa"]
  - ["PATCH", "Actualizar parcial", "Cambiar solo el estado de un pedido"]
  - ["DELETE", "Eliminar", "Borrar una mesa"]
---
+++

---

## Anotaciones de los controladores

| Anotación | Significado |
|-----------|------------|
| `@RestController` | Combina `@Controller` + `@ResponseBody`. Todos los métodos devuelven JSON |
| `@RequestMapping("/api/mesas")` | Prefijo base de todos los endpoints de esta clase |
| `@GetMapping` | Maneja peticiones GET |
| `@PostMapping` | Maneja peticiones POST |
| `@PutMapping` | Maneja peticiones PUT |
| `@PatchMapping` | Maneja peticiones PATCH |
| `@DeleteMapping` | Maneja peticiones DELETE |
| `@PathVariable` | Extrae valor de la URL: `/api/mesas/{id}` → `Long id` |
| `@RequestBody` | Deserializa el JSON del body en un objeto Java |
| `@RequestParam` | Extrae parámetros de la URL: `/buscar?apellidos=...` |

---

## `MesaController.java` — Análisis completo

```java
@RestController
@RequestMapping("/api/mesas")   // Todos los endpoints empiezan con /api/mesas
@RequiredArgsConstructor
public class MesaController {

    private final MesaService mesaService;

    @GetMapping
    public ResponseEntity<List<MesaResponse>> getAll() {
        return ResponseEntity.ok(mesaService.findAll());
        // ResponseEntity.ok(...) = HTTP 200 OK + body JSON
    }

    @GetMapping("/{id}")
    public ResponseEntity<MesaResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(mesaService.findById(id));
    }

    @GetMapping("/ubicacion/{ubicacion}")
    public ResponseEntity<List<MesaResponse>> getByUbicacion(@PathVariable UbicacionMesa ubicacion) {
        return ResponseEntity.ok(mesaService.findByUbicacion(ubicacion));
    }

    @PostMapping
    public ResponseEntity<MesaResponse> create(@RequestBody MesaRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)  // HTTP 201 Created (no 200)
                .body(mesaService.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MesaResponse> update(@PathVariable Long id, @RequestBody MesaRequest request) {
        return ResponseEntity.ok(mesaService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        mesaService.delete(id);
        return ResponseEntity.noContent().build();
        // HTTP 204 No Content: exitoso pero sin body
    }
}
```

---

## `@PathVariable` vs `@RequestParam`

+++comparison-table
---
headers:
  - "Tipo"
  - "URL de ejemplo"
  - { text: "Cuándo usarlo", highlight: true }
rows:
  - ["@PathVariable", "/api/mesas/5  →  id = 5", "Identificar un recurso específico"]
  - ["@RequestParam", "/api/meseros/buscar?apellidos=Ruiz", "Filtros opcionales o búsquedas"]
---
+++

---

## Códigos de respuesta HTTP

+++feature-list
---
items:
  - title: "200 OK"
    icon: "CheckCircleIcon"
    content: |
      Petición exitosa con cuerpo de respuesta. Se usa en GET, PUT, PATCH.
      `ResponseEntity.ok(data)`
  - title: "201 Created"
    icon: "PlusCircleIcon"
    content: |
      Recurso creado exitosamente. Se usa en POST.
      `ResponseEntity.status(HttpStatus.CREATED).body(data)`
  - title: "204 No Content"
    icon: "TrashIcon"
    content: |
      Exitoso pero sin cuerpo de respuesta. Se usa en DELETE.
      `ResponseEntity.noContent().build()`
  - title: "404 Not Found"
    icon: "AlertCircleIcon"
    content: |
      Recurso no encontrado. El GlobalExceptionHandler lo devuelve cuando el servicio lanza `NoSuchElementException`.
---
+++

---

## Tabla resumen de todos los endpoints

### Mesas — `/api/mesas`
| Método | URL | Body / Params | Respuesta |
|--------|-----|---------------|-----------|
| GET | `/api/mesas` | — | `List<MesaResponse>` |
| GET | `/api/mesas/{id}` | — | `MesaResponse` |
| GET | `/api/mesas/ubicacion/{ubicacion}` | — | `List<MesaResponse>` |
| POST | `/api/mesas` | `MesaRequest` | `MesaResponse` (201) |
| PUT | `/api/mesas/{id}` | `MesaRequest` | `MesaResponse` |
| DELETE | `/api/mesas/{id}` | — | (204) |

### Meseros — `/api/meseros`
| Método | URL | Body / Params | Respuesta |
|--------|-----|---------------|-----------|
| GET | `/api/meseros` | — | `List<MeseroResponse>` |
| GET | `/api/meseros/{id}` | — | `MeseroResponse` |
| GET | `/api/meseros/buscar?apellidos=` | Query param | `List<MeseroResponse>` |
| POST | `/api/meseros` | `MeseroRequest` | `MeseroResponse` (201) |
| PUT | `/api/meseros/{id}` | `MeseroRequest` | `MeseroResponse` |
| DELETE | `/api/meseros/{id}` | — | (204) |

### Pedidos — `/api/pedidos`
| Método | URL | Body / Params | Respuesta |
|--------|-----|---------------|-----------|
| GET | `/api/pedidos` | — | `List<PedidoResponse>` |
| GET | `/api/pedidos/{id}` | — | `PedidoResponse` |
| GET | `/api/pedidos/estado/{estado}` | — | `List<PedidoResponse>` |
| GET | `/api/pedidos/mesa/{mesaId}` | — | `List<PedidoResponse>` |
| POST | `/api/pedidos` | `PedidoRequest` | `PedidoResponse` (201) |
| PATCH | `/api/pedidos/{id}/estado/{estado}` | — | `PedidoResponse` |
| DELETE | `/api/pedidos/{id}` | — | (204) |
