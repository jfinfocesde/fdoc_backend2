---
title: "Semana 14: Documentación Profesional con OpenAPI, Scalar y Postman"
description: "Guía maestra: Diccionario de anotaciones, configuración global y visualización premium con Scalar."
position: 14
---

# 📑 Guía Maestra de Documentación de APIs

Bienvenidos a la **Semana 14**. En esta sesión aprenderás a configurar la documentación global de tu proyecto, dominar todas las anotaciones de OpenAPI y desplegar la interfaz moderna de **Scalar**.

---

## 📘 PARTE 1: Configuración Global y OpenAPI 3

### 1.1. Dependencia Core
**Archivo:** `pom.xml`

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-api</artifactId>
    <version>2.8.5</version>
</dependency>
```

### 1.2. Clase de Configuración Global
**Archivo:** `src/main/java/com/tu/proyecto/config/OpenApiConfig.java`

Permite personalizar el encabezado de la documentación.

```java
@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("API de Sistema de Ventas Cesde")
                .version("1.0.0")
                .description("Documentación técnica de servicios REST."));
    }
}
```

---

## 📖 PARTE 2: Diccionario de Anotaciones OpenAPI

Para documentar como un profesional, debes conocer estas anotaciones que se importan de `io.swagger.v3.oas.annotations.*`.

### 2.1. Nivel Clase (Controller)
*   **`@Tag`**: Define el nombre y descripción del grupo. Se usa para organizar los endpoints en "secciones" (ej: Clientes, Productos).
    *   *Uso:* `@Tag(name = "Ventas", description = "Gestión de facturas")`

### 2.2. Nivel Método (Endpoint)
*   **`@Operation`**: La más importante. Define el **summary** (título corto) y la **description** (explicación larga).
*   **`@ApiResponses` / `@ApiResponse`**: Documenta los posibles resultados (200 OK, 404 Not Found, etc.). Permite explicar qué significa cada error.
*   **`@Parameter`**: Describe los parámetros que van en la URL (Path Variables o Query Params). Permite poner ejemplos y marcar si son obligatorios.
*   **`@RequestBody`**: Describe el objeto JSON que el cliente debe enviar.
*   **`@Hidden`**: Oculta un endpoint específico de la documentación (útil para rutas internas o de prueba).

### 2.3. Nivel Modelo (DTO / Entity)
*   **`@Schema`**: Describe cada campo de tu clase.
    *   `description`: Qué es el campo.
    *   `example`: Un valor de ejemplo real.
    *   `requiredMode`: Indica si el campo es obligatorio.
    *   `accessMode`: Define si es de solo lectura (`READ_ONLY`) o solo escritura.

### 2.4. Seguridad
*   **`@SecurityRequirement`**: Indica que un endpoint específico requiere autenticación (ej: un token JWT).

---

## 🛠️ PARTE 3: Ejemplo de Implementación Completa

**Archivo:** `src/main/java/com/tu/proyecto/controller/ProductoController.java`

```java
@Tag(name = "Productos", description = "Operaciones de inventario")
@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Operation(summary = "Obtener producto por ID", description = "Busca un producto único en la base de datos.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
        @ApiResponse(responseCode = "404", description = "ID no encontrado")
    })
    @GetMapping("/{id}")
    public ProductoDTO buscar(
        @Parameter(description = "ID numérico de la base de datos", example = "5") 
        @PathVariable Long id
    ) { ... }

    @Operation(summary = "Registrar nuevo producto")
    @PostMapping
    public ProductoDTO crear(@RequestBody ProductoDTO dto) { ... }
}
```

---

## 🎨 PARTE 4: Tutorial de Scalar (Interfaz Premium)

### 4.1. Instalación y Configuración
**Archivo:** `pom.xml` y `application.properties`

```xml
<dependency>
    <groupId>com.scalar.maven</groupId>
    <artifactId>scalar-webmvc</artifactId>
    <version>0.6.32</version>
</dependency>
```

```properties
scalar.enabled=true
scalar.path=/docs
scalar.theme=deepSpace
```

---

## 🚀 PARTE 5: Endpoints del Sistema

| Recurso | URL | Uso |
| :--- | :--- | :--- |
| **Scalar UI** | `/docs` | Interfaz moderna e interactiva. |
| **Swagger UI** | `/swagger-ui/index.html` | Interfaz clásica. |
| **OpenAPI JSON** | `/v3/api-docs` | Para importar en Postman. |

---

## 🛡️ Seguridad (Spring Security)
Permitir acceso público:
```java
.requestMatchers("/v3/api-docs/**", "/docs/**", "/swagger-ui/**").permitAll()
```
