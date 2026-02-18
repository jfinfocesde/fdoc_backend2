---
title: "Semana 5: Entidades y Relaciones"
description: "Guía maestra sobre Entidades JPA, Anotaciones y Relaciones en Spring Boot"
position: 5
---

+++hero-section
---
title: "Dominando Entidades y Relaciones"
subtitle: "Modelado de datos avanzado con JPA, Lombok y Hibernate en Spring Boot"
backgroundImage: "https://images.unsplash.com/photo-1453060113865-968cea1ad53a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
overlayOpacity: 0.6
---
+++

+++admonition
---
type: info
title: "Objetivos de la Semana"
---
En esta unidad dominarás el modelado de datos en Spring Boot:
1.  **Entidades JPA**: Mapeo ORM con anotaciones clave.
2.  **Lombok en Entidades**: Uso correcto de `@Data`, `@Getter`, `@Setter` y `@Builder`.
3.  **Relaciones Completas**: Implementación funcional de `@OneToOne`, `@OneToMany`, `@ManyToOne` y `@ManyToMany`.
4.  **Manejo de JSON**: Solución a la recursión infinita con `@JsonManagedReference`.
+++

---

## 1. ¿Qué es una Entidad?

+++admonition
---
type: info
title: "Definición"
---
Una **Entidad** en Spring Boot es una clase Java (POJO) que representa una tabla en la base de datos.
+++

### Ejemplo Básico con Lombok

Para evitar código repetitivo (Getters, Setters, Constructores), usamos **Lombok**.

+++admonition
---
type: warning
title: "Cuidado con @Data en Entidades"
---
No uses `@Data` en entidades con relaciones bidireccionales. `@Data` genera `toString()` y `hashCode()` recursivos que causan `StackOverflowError`.
**Mejor práctica**: Usa `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor` y `@Builder`.
+++

```java
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // Patrón Builder para crear objetos fácilmente
@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(unique = true, nullable = false)
    private String email;
}
```

---

## 2. Tipos de Relaciones (Con Ejemplos Completos)

A continuación, veremos cómo implementar cada tipo de relación usando las mejores prácticas.

### 2.1 Uno a Uno (@OneToOne)

**Escenario**: Un `Usuario` tiene un único `Perfil` (y viceversa).

#### Entidad Dueña (Usuario)
La entidad que tiene la columna de llave foránea (`perfil_id`).

```java
@Entity
@Getter @Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;

    @OneToOne(cascade = CascadeType.ALL) // Si guardo usuario, se guarda perfil
    @JoinColumn(name = "perfil_id", referencedColumnName = "id")
    private Perfil perfil;
}
```

#### Entidad Inversa (Perfil)
Si queremos que sea bidireccional (acceder al usuario desde el perfil).

```java
@Entity
@Getter @Setter
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String bio;

    @OneToOne(mappedBy = "perfil") // Nombre del atributo en Usuario
    private Usuario usuario; 
}
```

---

### 2.2 Uno a Muchos y Muchos a Uno (@OneToMany / @ManyToOne)

**Escenario**: Una `Categoria` tiene muchos `Productos`. Es la relación más común.

#### Lado "Muchos" (Producto) - El Dueño de la Relación
SIEMPRE lleva el `@ManyToOne` y el `@JoinColumn`.

```java
@Entity
@Getter @Setter
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY) // LAZY para rendimiento
    @JoinColumn(name = "categoria_id") // FK en la tabla productos
    @JsonBackReference // Evita recursión infinita al serializar
    private Categoria categoria;
}
```

#### Lado "Uno" (Categoria)
Lleva el `@OneToMany` y la lista.

```java
@Entity
@Getter @Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Permite serializar esta parte
    private List<Producto> productos = new ArrayList<>();
}
```

**Explicación de atributos clave**:
*   `mappedBy`: Indica que la relación ya está definida en el atributo `categoria` de la clase `Producto`.
*   `cascade = CascadeType.ALL`: Las operaciones (guardar, actualizar, borrar) en Categoría se propagan a sus Productos.
*   `orphanRemoval = true`: Si quitas un producto de la lista, se borra de la base de datos.

---

### 2.3 Muchos a Muchos (@ManyToMany)

**Escenario**: Un `Estudiante` se inscribe en muchos `Cursos`, y un `Curso` tiene muchos `Estudiantes`.
Requiere una **Tabla Intermedia**.

#### Entidad 1 (Estudiante)

```java
@Entity
@Getter @Setter
public class Estudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "matriculas", // Nombre de la tabla intermedia
        joinColumns = @JoinColumn(name = "estudiante_id"),
        inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    private Set<Curso> cursos = new HashSet<>(); // Set es mejor que List para ManyToMany
}
```

#### Entidad 2 (Curso)

```java
@Entity
@Getter @Setter
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;

    @ManyToMany(mappedBy = "cursos") // Nombre de la lista en Estudiante
    private Set<Estudiante> estudiantes = new HashSet<>();
}
```

+++admonition
---
type: tip
title: "Consejo Pro: Set vs List"
---
En relaciones `@ManyToMany`, usa `Set` (ej: `HashSet`) en lugar de `List`. Hibernate maneja mejor la eliminación de registros en tablas intermedias con `Set` y evita problemas de "MultipleBagFetchException" si tienes varias relaciones eager.
+++

---

## 3. Manejo de JSON y Recursión Infinita

Al tener relaciones bidireccionales (A -> B y B -> A), Jackson (la librería JSON de Spring) entra en un bucle infinito.

### Solución: @JsonManagedReference y @JsonBackReference

1.  **@JsonManagedReference**: Va en el lado "Padre" (el que tiene la `List` o `Set`). Jackson serializará este lado.
2.  **@JsonBackReference**: Va en el lado "Hijo" (el que tiene la referencia simple). Jackson **ignorará** este lado al serializar.

**Ejemplo Práctico en Categoría/Producto**:

#### Clase Padre (Categoria)
```java
package com.ejemplo.tienda.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;

    // Lado PADRE: Usa @JsonManagedReference
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonManagedReference 
    private List<Producto> productos = new ArrayList<>();
}
```

#### Clase Hija (Producto)
```java
package com.ejemplo.tienda.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private Double precio;

    // Lado HIJO: Usa @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    @JsonBackReference 
    private Categoria categoria;
}
```

**Resultado JSON al consultar una Categoría (GET /api/categorias/1):**

```json
{
  "id": 1,
  "nombre": "Tecnología",
  "productos": [  // Gracias a @JsonManagedReference
    {
      "id": 10,
      "nombre": "Laptop"
      // "categoria": ... AQUÍ SE CORTA EL BUCLE gracias a @JsonBackReference
    },
    { "id": 11, "nombre": "Mouse" }
  ]
}
```

---

## 4. Anotaciones de Auditoría

Spring Data JPA puede llenar automáticamente fechas de creación y modificación.

1.  Agrega `@EnableJpaAuditing` en tu clase `Application`.
2.  Usa `@EntityListeners(AuditingEntityListener.class)` en tu entidad.

```java
@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter
public class Orden {
    @Id
    private Long id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    private LocalDateTime fechaUltimaModificacion;
}
```

---

## 5. Clase Base y @MappedSuperclass

Para evitar repetir campos comunes como `id`, `createdAt` y `updatedAt` en todas las entidades, usamos una clase base.

### ¿Qué es @MappedSuperclass?

Es una anotación que indica que una clase **NO** es una entidad (no tiene tabla propia), pero sus atributos serán heredados por las entidades que la extiendan.

#### Ejemplo: BaseEntity

Esta clase centraliza el ID y la auditoría. Todas tus entidades deberían extender de ella.

```java
package com.example.inventario.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@EqualsAndHashCode
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

Así, tus entidades quedan mucho más limpias:

```java
@Entity
public class Producto extends BaseEntity {
    private String nombre;
    private Double precio;
    // Ya tiene ID, createdAt y updatedAt automáticamente
}
```

---

## 6. Resumen: Buenas Prácticas

+++admonition
---
type: success
title: "Guía Rápida"
---
*   **Lombok**: Usa `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor` y `@Builder`. **EVITA `@Data`** en entidades con relaciones.
*   **Lazy Loading**: Configura `@ManyToOne(fetch = FetchType.LAZY)` para no traer toda la base de datos en una consulta.
*   **Cascada**: Usa `CascadeType.ALL` solo si la entidad padre controla totalmente el ciclo de vida del hijo (ej: Factura -> Líneas de Factura).
*   **Colecciones**: Inicializa siempre las listas/sets: `private List<Item> items = new ArrayList<>();`.
*   **DTOs**: Para APIs profesionales, usa DTOs en lugar de retornar Entidades directamente. Esto soluciona el problema del JSON de raíz y oculta datos sensibles.
+++

---

## 6. Referencia de Anotaciones

A continuación, una lista completa de las anotaciones más utilizadas en Entidades.

### Anotaciones de JPA (Jakarta Persistence)

| Anotación | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **`@Entity`** | Marca una clase como una entidad JPA para que sea mapeada a una tabla. | `@Entity` |
| **`@Table`** | Define el nombre de la tabla en la base de datos (opcional si coincide con la clase). | `@Table(name = "usuarios")` |
| **`@Id`** | Marca el campo que será la clave primaria (Primary Key). | `@Id` |
| **`@GeneratedValue`** | Define la estrategia de generación de la clave primaria (Identity, Sequence, UUID, etc.). | `@GeneratedValue(strategy = GenerationType.IDENTITY)` |
| **`@Column`** | Configura detalles de la columna (nombre, longitud, nulo, único, etc.). | `@Column(nullable = false, unique = true)` |
| **`@Transient`** | Indica que un campo **NO** debe guardarse en la base de datos. | `@Transient` |
| **`@Lob`** | Para guardar objetos grandes (Large Objects) como textos largos o binarios. | `@Lob` |
| **`@Enumerated`** | Mapea un Enum. `EnumType.STRING` guarda el texto, `EnumType.ORDINAL` guarda el índice. | `@Enumerated(EnumType.STRING)` |
| **`@OneToOne`** | Define una relación uno a uno. | `@OneToOne(cascade = CascadeType.ALL)` |
| **`@OneToMany`** | Define una relación uno a muchos. Generalmente va en una lista. | `@OneToMany(mappedBy = "padre")` |
| **`@ManyToOne`** | Define una relación muchos a uno. Va con `@JoinColumn`. | `@ManyToOne(fetch = FetchType.LAZY)` |
| **`@ManyToMany`** | Define una relación muchos a muchos. | `@ManyToMany` |
| **`@JoinColumn`** | Especifica la columna que actúa como llave foránea (Foreign Key). | `@JoinColumn(name = "usuario_id")` |
| **`@JoinTable`** | Configura la tabla intermedia en una relación `@ManyToMany`. | `@JoinTable(name = "estudiante_curso")` |
| **`@EntityListeners`** | Especifica clases listener para eventos del ciclo de vida (ej: auditoría). | `@EntityListeners(AuditingEntityListener.class)` |

### Anotaciones de Lombok

| Anotación | Descripción | Notas Importantes |
| :--- | :--- | :--- |
| **`@Getter`** | Genera métodos `getNombreCampo()` para todos los campos. | Seguro para usar en entidades. |
| **`@Setter`** | Genera métodos `setNombreCampo()` para todos los campos. | Seguro para usar en entidades. |
| **`@NoArgsConstructor`** | Genera un constructor vacío (obligatorio para Hibernate/JPA). | **Obligatorio** en entidades JPA. |
| **`@AllArgsConstructor`** | Genera un constructor con todos los argumentos. | Útil para tests o builders. |
| **`@Builder`** | Implementa el patrón Builder (`Usuario.builder().nombre("...").build()`). | Facilita la creación de objetos. |
| **`@Data`** | Combina `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`. | **PELIGROSO** en entidades con relaciones bidireccionales (loop infinito en `toString`). |
| **`@ToString`** | Genera el método `toString()`. | Usar `exclude` para relaciones Lazy (`@ToString.Exclude`). |
| **`@EqualsAndHashCode`** | Genera `equals()` y `hashCode()`. | Precaución en entidades, mejor usar solo el ID. |

### Anotaciones de JSON (Jackson)

| Anotación | Descripción |
| :--- | :--- |
| **`@JsonManagedReference`** | Va en el lado "Padre" (Lista). Permite serializar. |
| **`@JsonBackReference`** | Va en el lado "Hijo". Evita serializar para romper el bucle infinito. |
| **`@JsonIgnore`** | Ignora completamente un campo al convertir a JSON. |
| **`@JsonProperty`** | Cambia el nombre del campo en el JSON resultante. |
