---
title: "11. OpenAPI y Swagger UI"
position: 11
---

# OpenAPI y Swagger UI

## ¿Qué es OpenAPI?

**OpenAPI** (antes conocido como Swagger) es un estándar para **documentar APIs REST**. Define cómo describir los endpoints, los parámetros que reciben, los tipos de datos que devuelven y los posibles códigos de respuesta, en un formato legible tanto por humanos como por máquinas.

+++feature-list
---
items:
  - title: "Documentación viva"
    icon: "FileTextIcon"
    content: |
      Se genera automáticamente del código fuente. Nunca queda desactualizada porque refleja el código real del proyecto.
  - title: "Interfaz interactiva"
    icon: "PlayCircleIcon"
    content: |
      **Swagger UI** permite probar los endpoints directamente desde el navegador, sin necesidad de Postman ni herramientas externas.
  - title: "Contratos de API"
    icon: "ShieldIcon"
    content: |
      Otros equipos o apps pueden leer el JSON de OpenAPI para saber exactamente cómo usar tu API sin tener acceso al código fuente.
---
+++

---

## Configuración

### Dependencia en `pom.xml`

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.8.6</version>
</dependency>
```

+++admonition
---
type: info
title: "Configuración automática"
---
Con solo agregar esta dependencia, SpringDoc:
1. Escanea todos tus `@RestController` automáticamente
2. Genera el JSON de OpenAPI en `/api-docs`
3. Sirve la interfaz Swagger UI en `/swagger-ui.html`

No necesitas ninguna configuración adicional para empezar.
+++

### `application.properties`

```properties
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.tags-sorter=alpha
springdoc.swagger-ui.operations-sorter=alpha
```

---

## URLs disponibles

| URL | Descripción |
|-----|-------------|
| `http://localhost:8080/swagger-ui.html` | 🌐 Interfaz visual interactiva |
| `http://localhost:8080/api-docs` | 📄 Especificación OpenAPI en JSON |
| `http://localhost:8080/api-docs.yaml` | 📄 Especificación OpenAPI en YAML |

---

## Anotaciones en los Controladores

### @Tag
```java
// Agrupa los endpoints de este controlador en una sección llamada "Mesas"
@Tag(name = "Mesas", description = "Gestión de mesas del restaurante")
public class MesaController { ... }
```

### @Operation
```java
// Describe un endpoint individual con título y descripción
@Operation(
    summary = "Crear una nueva mesa",
    description = "Valida que el número de mesa no esté duplicado antes de crear"
)
@PostMapping
public ResponseEntity<MesaResponse> create(...) { ... }
```

### @ApiResponses
```java
// Documenta los posibles códigos de respuesta HTTP
@ApiResponses({
    @ApiResponse(responseCode = "201", description = "Mesa creada exitosamente"),
    @ApiResponse(responseCode = "400", description = "Número de mesa duplicado")
})
@PostMapping
public ResponseEntity<MesaResponse> create(...) { ... }
```

### @Parameter
```java
// Describe un parámetro de la URL o query
public ResponseEntity<MesaResponse> getById(
    @Parameter(description = "ID único de la mesa") @PathVariable Long id) { ... }
```

---

## Anotaciones en los DTOs

```java
@Schema(description = "Datos para crear o actualizar una mesa")
public class MesaRequest {

    @Schema(description = "Número identificador de la mesa", example = "5")
    private Integer numeroMesa;

    @Schema(
        description = "Categoría de ubicación de la mesa",
        example = "TERRAZA",
        allowableValues = {"TERRAZA", "SALON_PRINCIPAL", "VIP", "BAR"}
    )
    private UbicacionMesa ubicacion;
}
```

Swagger UI muestra automáticamente los ejemplos en el panel **"Try it out"**, facilitando las pruebas sin tener que escribir los valores manualmente.

---

## Cómo usar Swagger UI

### Inicia la aplicación
```bash
./mvnw spring-boot:run
```
Espera hasta ver `Started DemoBasicApplication` en la consola.

### Abre el navegador
Navega a `http://localhost:8080/swagger-ui.html`. Verás la interfaz con tres secciones (Tags): **Mesas**, **Meseros**, **Pedidos**.

### Explora los endpoints
Expande cualquier sección y haz clic en un método para ver sus detalles: parámetros, body esperado, respuestas posibles.

### Prueba un endpoint con "Try it out"
1. Haz clic en el endpoint que quieras probar (ej: `POST /api/mesas`)
2. Haz clic en el botón **"Try it out"**
3. Edita el JSON en el campo **Request body** (ya viene pre-rellenado con los ejemplos de `@Schema`)
4. Haz clic en **"Execute"**
5. Observa la respuesta en la sección **"Responses"**: código HTTP, headers y body JSON

### Revisa la especificación OpenAPI en JSON
Accede a `http://localhost:8080/api-docs` para ver la especificación completa en formato JSON. Puedes importar este archivo en Postman o cualquier otra herramienta compatible con OpenAPI.

---

## Resumen de anotaciones OpenAPI

+++comparison-table
---
headers:
  - "Anotación"
  - "Dónde se usa"
  - { text: "Para qué sirve", highlight: true }
rows:
  - ["@Tag", "Clase Controller", "Agrupa endpoints en una sección con nombre"]
  - ["@Operation", "Método del controller", "Describe el endpoint con título y descripción"]
  - ["@ApiResponse", "Método del controller", "Documenta un código de respuesta posible"]
  - ["@ApiResponses", "Método del controller", "Agrupa múltiples @ApiResponse"]
  - ["@Parameter", "Parámetro del método", "Describe un @PathVariable o @RequestParam"]
  - ["@Schema", "Clase o campo DTO", "Describe el modelo de datos con ejemplos"]
  - ["@Bean OpenAPI", "Clase @Configuration", "Configura el encabezado global de la API"]
---
+++
