---
title: "Semana 3: Spring Boot y Arquitectura por Capas"
description: "Guía completa sobre arquitectura por capas en Spring Boot y uso de Spring Initializr"
position: 3
---

+++hero-section
---
title: "Spring Boot y Arquitectura por Capas"
subtitle: "Aprende a crear aplicaciones RESTful con arquitectura profesional usando Spring Boot"
backgroundImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070"
overlayOpacity: 0.6
---
+++

+++admonition
---
type: info
title: "Resumen"
---
En esta semana aprenderás:
1. **Arquitectura por Capas**: Cómo organizar tu código en capas bien definidas (Controller, Service, Repository).
2. **Spring Boot**: El framework más popular para crear aplicaciones Java empresariales.
3. **Spring Initializr**: La herramienta oficial para generar proyectos Spring Boot de forma rápida y profesional.
4. **API RESTful**: Cómo implementar una API REST completa siguiendo las mejores prácticas.
+++

---

## 1. ¿Qué es la Arquitectura por Capas?

```video
---
src: "https://vimeo.com/1163866543?share=copy&fl=sv&fe=ci"
title: "Arquitectura por Capas"
---
```


+++admonition
---
type: info
title: "Definición"
---
La **arquitectura por capas** (Layered Architecture) es un patrón de diseño que organiza el código en capas horizontales, donde cada capa tiene una responsabilidad específica y bien definida. Cada capa solo puede comunicarse con la capa inmediatamente inferior.
+++

### 1.1 Beneficios de la Arquitectura por Capas

+++admonition
---
type: success
title: "Ventajas Clave"
---
*   **Separación de Responsabilidades**: Cada capa tiene un propósito claro y único.
*   **Mantenibilidad**: Es más fácil encontrar y corregir errores.
*   **Escalabilidad**: Puedes modificar una capa sin afectar las demás.
*   **Testabilidad**: Cada capa se puede probar de forma independiente.
*   **Reutilización**: El código de una capa puede ser reutilizado por diferentes partes de la aplicación.
*   **Trabajo en Equipo**: Diferentes desarrolladores pueden trabajar en diferentes capas simultáneamente.
+++

### 1.2 Capas Principales en Spring Boot

+++mermaid
graph TB
    Client[Cliente HTTP/REST]
    Controller[Capa de Presentación<br/>Controllers]
    Service[Capa de Lógica de Negocio<br/>Services]
    Repository[Capa de Acceso a Datos<br/>Repositories]
    DB[(Base de Datos)]
    
    Client -->|HTTP Request| Controller
    Controller -->|Llama| Service
    Service -->|Llama| Repository
    Repository -->|Query| DB
    DB -->|Datos| Repository
    Repository -->|Entidades| Service
    Service -->|DTOs| Controller
    Controller -->|HTTP Response| Client
    
    style Controller fill:#e1f5ff,stroke:#01579b
    style Service fill:#fff9c4,stroke:#f57f17
    style Repository fill:#f3e5f5,stroke:#4a148c
    style DB fill:#ffebee,stroke:#b71c1c
+++

---

## 2. Capas en Detalle

### 2.1 Capa de Presentación (Controllers)

+++admonition
---
type: info
title: "Responsabilidad"
---
Los **Controllers** son el punto de entrada de las peticiones HTTP. Su responsabilidad es:
*   Recibir las peticiones HTTP (GET, POST, PUT, DELETE).
*   Validar los datos de entrada básicos.
*   Llamar a los servicios correspondientes.
*   Devolver las respuestas HTTP con el código de estado apropiado.
+++

#### Características de los Controllers

| Característica | Descripción |
|----------------|-------------|
| **Anotación** | `@RestController` o `@Controller` |
| **Mapeo** | `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` |
| **Entrada** | Recibe DTOs (Data Transfer Objects) |
| **Salida** | Devuelve DTOs o ResponseEntity |
| **NO debe contener** | Lógica de negocio, acceso directo a base de datos |

#### Ejemplo de Controller

```java
@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    // GET /api/productos - Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodos() {
        List<ProductoDTO> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }
    
    // GET /api/productos/{id} - Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        ProductoDTO producto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(producto);
    }
    
    // POST /api/productos - Crear un nuevo producto
    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody @Valid ProductoDTO dto) {
        ProductoDTO nuevoProducto = productoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }
    
    // PUT /api/productos/{id} - Actualizar un producto
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(
            @PathVariable Long id, 
            @RequestBody @Valid ProductoDTO dto) {
        ProductoDTO actualizado = productoService.actualizar(id, dto);
        return ResponseEntity.ok(actualizado);
    }
    
    // DELETE /api/productos/{id} - Eliminar un producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 2.2 Capa de Lógica de Negocio (Services)

+++admonition
---
type: info
title: "Responsabilidad"
---
Los **Services** contienen la lógica de negocio de la aplicación. Su responsabilidad es:
*   Implementar las reglas de negocio.
*   Coordinar operaciones entre diferentes repositorios.
*   Realizar validaciones complejas.
*   Manejar transacciones.
*   Transformar entidades en DTOs y viceversa.
+++

#### Características de los Services

| Característica | Descripción |
|----------------|-------------|
| **Anotación** | `@Service` |
| **Transacciones** | `@Transactional` cuando sea necesario |
| **Entrada** | Recibe DTOs o parámetros simples |
| **Salida** | Devuelve DTOs |
| **Contiene** | Lógica de negocio, validaciones, transformaciones |

#### Ejemplo de Service

```java
@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<ProductoDTO> obtenerTodos() {
        List<Producto> productos = productoRepository.findAll();
        return productos.stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public ProductoDTO obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        return convertirADTO(producto);
    }
    
    @Transactional
    public ProductoDTO crear(ProductoDTO dto) {
        // Validación de negocio
        if (dto.getPrecio() <= 0) {
            throw new BusinessException("El precio debe ser mayor a 0");
        }
        
        // Verificar que la categoría existe
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        
        // Crear entidad
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setCategoria(categoria);
        
        // Guardar
        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }
    
    @Transactional
    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        
        // Actualizar campos
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        
        Producto actualizado = productoRepository.save(producto);
        return convertirADTO(actualizado);
    }
    
    @Transactional
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
    
    // Método privado para convertir entidad a DTO
    private ProductoDTO convertirADTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setCategoriaId(producto.getCategoria().getId());
        dto.setCategoriaNombre(producto.getCategoria().getNombre());
        return dto;
    }
}
```

### 2.3 Capa de Acceso a Datos (Repositories)

+++admonition
---
type: info
title: "Responsabilidad"
---
Los **Repositories** son la capa que interactúa directamente con la base de datos. Su responsabilidad es:
*   Realizar operaciones CRUD (Create, Read, Update, Delete).
*   Ejecutar consultas personalizadas.
*   Abstraer la tecnología de persistencia utilizada.
+++

#### Características de los Repositories

| Característica | Descripción |
|----------------|-------------|
| **Anotación** | `@Repository` (opcional con Spring Data JPA) |
| **Herencia** | Extiende `JpaRepository<Entity, ID>` |
| **Métodos** | CRUD automático + consultas personalizadas |
| **Entrada/Salida** | Trabaja con Entidades JPA |

#### Ejemplo de Repository

```java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // Métodos automáticos heredados de JpaRepository:
    // - save(Producto)
    // - findById(Long)
    // - findAll()
    // - deleteById(Long)
    // - existsById(Long)
    // - count()
    
    // Consultas personalizadas usando convención de nombres
    List<Producto> findByNombreContaining(String nombre);
    
    List<Producto> findByCategoriaId(Long categoriaId);
    
    List<Producto> findByPrecioBetween(Double min, Double max);
    
    // Consulta con @Query (JPQL)
    @Query("SELECT p FROM Producto p WHERE p.precio > :precio AND p.categoria.id = :categoriaId")
    List<Producto> buscarPorPrecioYCategoria(
            @Param("precio") Double precio, 
            @Param("categoriaId") Long categoriaId);
    
    // Consulta nativa SQL
    @Query(value = "SELECT * FROM productos WHERE stock > 0", nativeQuery = true)
    List<Producto> buscarProductosConStock();
}
```

### 2.4 Capa de Modelo (Entities y DTOs)

#### Entidades JPA

Las **Entidades** representan las tablas de la base de datos:

```java
@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @Column(nullable = false)
    private Double precio;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    // Getters y Setters
}
```

#### DTOs (Data Transfer Objects)

Los **DTOs** son objetos simples para transferir datos entre capas:

```java
public class ProductoDTO {
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;
    
    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private Double precio;
    
    @NotNull(message = "La categoría es obligatoria")
    private Long categoriaId;
    
    private String categoriaNombre;
    
    // Getters y Setters
}
```

---

## 3. Estructura de Proyecto Spring Boot

+++file-tree
---
highlight:
  - "src/main/java/com/ejemplo/proyecto/controller"
  - "src/main/java/com/ejemplo/proyecto/service"
  - "src/main/java/com/ejemplo/proyecto/repository"
annotations:
  "src/main/java/com/ejemplo/proyecto/controller": "Capa de Presentación"
  "src/main/java/com/ejemplo/proyecto/service": "Capa de Lógica de Negocio"
  "src/main/java/com/ejemplo/proyecto/repository": "Capa de Acceso a Datos"
  "src/main/java/com/ejemplo/proyecto/model": "Entidades y DTOs"
---
proyecto-spring-boot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── ejemplo/
│   │   │           └── proyecto/
│   │   │               ├── ProyectoApplication.java
│   │   │               ├── controller/
│   │   │               │   ├── ProductoController.java
│   │   │               │   └── CategoriaController.java
│   │   │               ├── service/
│   │   │               │   ├── ProductoService.java
│   │   │               │   └── CategoriaService.java
│   │   │               ├── repository/
│   │   │               │   ├── ProductoRepository.java
│   │   │               │   └── CategoriaRepository.java
│   │   │               ├── model/
│   │   │               │   ├── entity/
│   │   │               │   │   ├── Producto.java
│   │   │               │   │   └── Categoria.java
│   │   │               │   └── dto/
│   │   │               │       ├── ProductoDTO.java
│   │   │               │       └── CategoriaDTO.java
│   │   │               ├── exception/
│   │   │               │   ├── ResourceNotFoundException.java
│   │   │               │   ├── BusinessException.java
│   │   │               │   └── GlobalExceptionHandler.java
│   │   │               └── config/
│   │   │                   └── DatabaseConfig.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
│   └── test/
│       └── java/
│           └── com/
│               └── ejemplo/
│                   └── proyecto/
│                       ├── controller/
│                       ├── service/
│                       └── repository/
├── pom.xml
└── README.md
+++

---

## 4. Spring Initializr: Creando tu Proyecto

```video
---
src: "https://vimeo.com/1164097339?share=copy&fl=sv&fe=ci"
title: "Spring Initializr"
---
```

+++admonition
---
type: success
title: "¿Qué es Spring Initializr?"
---
**Spring Initializr** (https://start.spring.io/) es una herramienta web oficial de Spring que te permite generar la estructura base de un proyecto Spring Boot en segundos. Es la forma más rápida y profesional de iniciar un nuevo proyecto.
+++

### 4.1 Accediendo a Spring Initializr

### 1. Abrir el Navegador
Navega a [https://start.spring.io/](https://start.spring.io/)

### 2. Visualizar la Interfaz
Verás un formulario con múltiples opciones de configuración para tu proyecto.

### 4.2 Configuración del Proyecto

+++admonition
---
type: info
title: "Opciones Principales"
---
Spring Initializr te permite configurar los siguientes aspectos de tu proyecto:
+++

#### 4.2.1 Project Metadata

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Project** | Herramienta de construcción | Maven o Gradle |
| **Language** | Lenguaje de programación | Java, Kotlin, Groovy |
| **Spring Boot** | Versión de Spring Boot | 3.2.0 (última estable) |
| **Group** | Identificador del grupo (dominio inverso) | `com.ejemplo` |
| **Artifact** | Nombre del proyecto | `tienda-api` |
| **Name** | Nombre de la aplicación | `TiendaAPI` |
| **Description** | Descripción del proyecto | `API REST para tienda online` |
| **Package name** | Paquete base | `com.ejemplo.tienda` |
| **Packaging** | Tipo de empaquetado | Jar o War |
| **Java** | Versión de Java | 17, 21 |

#### 4.2.2 Dependencias Esenciales

+++admonition
---
type: tip
title: "Dependencias Recomendadas para API REST"
---
Para crear una API RESTful completa, selecciona las siguientes dependencias:
+++

**Dependencias Web:**
*   **Spring Web**: Para crear APIs REST con Spring MVC
*   **Spring Boot DevTools**: Reinicio automático durante desarrollo

**Dependencias de Base de Datos:**
*   **Spring Data JPA**: Para acceso a datos con JPA/Hibernate
*   **PostgreSQL Driver** o **MySQL Driver** o **H2 Database**: Driver de tu base de datos

**Dependencias de Validación:**
*   **Validation**: Para validar datos con anotaciones

**Dependencias Adicionales Útiles:**
*   **Lombok**: Reduce código boilerplate (getters, setters, constructores)
*   **Spring Boot Actuator**: Monitoreo y métricas de la aplicación

### 4.3 Paso a Paso: Crear un Proyecto

### 1. Configurar Project Metadata
En Spring Initializr, completa los campos:
- **Project**: Maven
- **Language**: Java
- **Spring Boot**: 3.2.0 (o la última versión estable)
- **Group**: `com.ejemplo`
- **Artifact**: `tienda-api`
- **Name**: `TiendaAPI`
- **Package name**: `com.ejemplo.tienda`
- **Packaging**: Jar
- **Java**: 17

### 2. Agregar Dependencias
Haz clic en "ADD DEPENDENCIES" y busca/selecciona:
- Spring Web
- Spring Data JPA
- PostgreSQL Driver (o tu base de datos preferida)
- Validation
- Lombok
- Spring Boot DevTools

### 3. Generar el Proyecto
Haz clic en el botón **GENERATE** (o presiona Ctrl+Enter). Se descargará un archivo ZIP con tu proyecto.

### 4. Descomprimir e Importar
- Descomprime el archivo ZIP en tu carpeta de proyectos
- Abre tu IDE favorito (IntelliJ IDEA, Eclipse, VS Code)
- Importa el proyecto como proyecto Maven

### 5. Configurar Base de Datos
Edita el archivo `src/main/resources/application.properties`:
```properties
# Configuración de PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/tienda_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña

# Configuración de JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Puerto del servidor
server.port=8080
```

### 6. Ejecutar la Aplicación
Ejecuta la clase principal `TiendaApiApplication.java` o usa Maven:
```bash
./mvnw spring-boot:run
```

### 4.4 Estructura Generada

Después de generar el proyecto, tendrás la siguiente estructura:

+++file-tree
---
highlight:
  - "src/main/java/com/ejemplo/tienda/TiendaApiApplication.java"
  - "src/main/resources/application.properties"
annotations:
  "src/main/java/com/ejemplo/tienda/TiendaApiApplication.java": "Clase principal"
  "src/main/resources/application.properties": "Configuración"
---
tienda-api/
  ├─ src/
  │   ├─ main/
  │   │   ├─ java/com/ejemplo/tienda/
  │   │   │   └─ TiendaApiApplication.java    (Clase principal)
  │   │   └─ resources/
  │   │       ├─ application.properties        (Configuración)
  │   │       ├─ static/
  │   │       └─ templates/
  │   └─ test/
  │       └─ java/com/ejemplo/tienda/
  │           └─ TiendaApiApplicationTests.java
  ├─ pom.xml
  ├─ mvnw
  ├─ mvnw.cmd
  └─ .gitignore
+++

**Archivos importantes:**
- `TiendaApiApplication.java`: Clase principal de Spring Boot con el método `main()`
- `application.properties`: Archivo de configuración (base de datos, puerto, etc.)
- `pom.xml`: Dependencias Maven del proyecto

---

## 5. Implementación Completa: Ejemplo Práctico

### 5.1 Escenario: API de Productos

Vamos a implementar una API REST completa para gestionar productos, siguiendo la arquitectura por capas.

+++timeline
### Paso 1: Crear Entidades | Modelo de Datos
Definir las entidades JPA que representan las tablas de la base de datos.

---

### Paso 2: Crear Repositorios | Acceso a Datos
Crear interfaces Repository para interactuar con la base de datos.

---

### Paso 3: Crear DTOs | Transferencia de Datos
Definir objetos DTO para transferir datos entre capas.

---

### Paso 4: Crear Servicios | Lógica de Negocio
Implementar la lógica de negocio en la capa de servicios.

---

### Paso 5: Crear Controllers | API REST
Exponer endpoints REST en los controllers.

---

### Paso 6: Manejo de Excepciones | Error Handling
Implementar manejo global de excepciones.
+++

#### 5.1.1 Entidad Producto

```java
package com.ejemplo.tienda.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @Column(nullable = false)
    private Double precio;
    
    @Column(nullable = false)
    private Integer stock;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}
```

#### 5.1.2 DTO Producto

```java
package com.ejemplo.tienda.model.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductoDTO {
    
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;
    
    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private Double precio;
    
    @NotNull(message = "El stock es obligatorio")
    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;
    
    @NotNull(message = "La categoría es obligatoria")
    private Long categoriaId;
    
    private String categoriaNombre;
}
```

#### 5.1.3 Repository

```java
package com.ejemplo.tienda.repository;

import com.ejemplo.tienda.model.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    
    List<Producto> findByCategoriaId(Long categoriaId);
    
    List<Producto> findByPrecioBetween(Double min, Double max);
    
    List<Producto> findByStockGreaterThan(Integer stock);
}
```

#### 5.1.4 Service

```java
package com.ejemplo.tienda.service;

import com.ejemplo.tienda.exception.ResourceNotFoundException;
import com.ejemplo.tienda.model.dto.ProductoDTO;
import com.ejemplo.tienda.model.entity.Categoria;
import com.ejemplo.tienda.model.entity.Producto;
import com.ejemplo.tienda.repository.CategoriaRepository;
import com.ejemplo.tienda.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoService {
    
    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    
    @Transactional(readOnly = true)
    public List<ProductoDTO> obtenerTodos() {
        return productoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ProductoDTO obtenerPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        return convertirADTO(producto);
    }
    
    @Transactional
    public ProductoDTO crear(ProductoDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
        
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        producto.setCategoria(categoria);
        
        Producto guardado = productoRepository.save(producto);
        return convertirADTO(guardado);
    }
    
    @Transactional
    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        
        if (!producto.getCategoria().getId().equals(dto.getCategoriaId())) {
            Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        }
        
        Producto actualizado = productoRepository.save(producto);
        return convertirADTO(actualizado);
    }
    
    @Transactional
    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }
    
    private ProductoDTO convertirADTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        dto.setCategoriaId(producto.getCategoria().getId());
        dto.setCategoriaNombre(producto.getCategoria().getNombre());
        return dto;
    }
}
```

#### 5.1.5 Controller

```java
package com.ejemplo.tienda.controller;

import com.ejemplo.tienda.model.dto.ProductoDTO;
import com.ejemplo.tienda.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {
    
    private final ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodos() {
        List<ProductoDTO> productos = productoService.obtenerTodos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id) {
        ProductoDTO producto = productoService.obtenerPorId(id);
        return ResponseEntity.ok(producto);
    }
    
    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody @Valid ProductoDTO dto) {
        ProductoDTO nuevoProducto = productoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(
            @PathVariable Long id, 
            @RequestBody @Valid ProductoDTO dto) {
        ProductoDTO actualizado = productoService.actualizar(id, dto);
        return ResponseEntity.ok(actualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### 5.1.6 Manejo Global de Excepciones

```java
package com.ejemplo.tienda.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Error interno del servidor",
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

---

## 6. Flujo de una Petición HTTP

+++mermaid
sequenceDiagram
    participant C as Cliente
    participant Ctrl as Controller
    participant Svc as Service
    participant Repo as Repository
    participant DB as Base de Datos
    
    C->>Ctrl: POST /api/productos<br/>{nombre, precio, ...}
    activate Ctrl
    Ctrl->>Ctrl: Validar DTO
    Ctrl->>Svc: crear(ProductoDTO)
    activate Svc
    Svc->>Svc: Validar lógica de negocio
    Svc->>Repo: findById(categoriaId)
    activate Repo
    Repo->>DB: SELECT * FROM categorias WHERE id=?
    DB-->>Repo: Categoria
    Repo-->>Svc: Categoria
    deactivate Repo
    Svc->>Svc: Crear entidad Producto
    Svc->>Repo: save(Producto)
    activate Repo
    Repo->>DB: INSERT INTO productos...
    DB-->>Repo: Producto guardado
    Repo-->>Svc: Producto
    deactivate Repo
    Svc->>Svc: Convertir a DTO
    Svc-->>Ctrl: ProductoDTO
    deactivate Svc
    Ctrl-->>C: 201 Created<br/>ProductoDTO
    deactivate Ctrl
+++

---

## 7. Mejores Prácticas

+++admonition
---
type: tip
title: "Consejos Profesionales"
---
1. **Separación de Responsabilidades**: Nunca pongas lógica de negocio en los controllers ni acceso a datos en los services.
2. **Usa DTOs**: No expongas tus entidades JPA directamente en la API.
3. **Validación en Múltiples Capas**: Validación básica en controllers, validación de negocio en services.
4. **Transacciones**: Usa `@Transactional` en métodos de servicio que modifican datos.
5. **Manejo de Excepciones**: Implementa un `@RestControllerAdvice` para manejo global.
6. **Nombres Descriptivos**: Usa nombres claros para clases, métodos y variables.
7. **Documentación**: Documenta tu API con Swagger/OpenAPI.
8. **Testing**: Escribe tests unitarios para services y tests de integración para controllers.
+++

---

## 8. Recursos Adicionales

+++admonition
---
type: success
title: "Enlaces Útiles"
---
*   [Spring Initializr](https://start.spring.io/) - Generador de proyectos Spring Boot
*   [Spring Boot Documentation](https://spring.io/projects/spring-boot) - Documentación oficial
*   [Spring Data JPA](https://spring.io/projects/spring-data-jpa) - Guía de Spring Data JPA
*   [Baeldung Spring Tutorials](https://www.baeldung.com/spring-tutorial) - Tutoriales completos
*   [Spring Boot REST API Best Practices](https://www.baeldung.com/rest-with-spring-series) - Mejores prácticas
+++
