---
title: "Semana 7: Persistencia Avanzada y Optimización"
description: "Profundización en modelado de datos, estrategias de carga, cascada y glosario de anotaciones JPA."
position: 7
---




+++hero-section
---
title: "Persistencia Avanzada con JPA"
subtitle: "Optimizando el modelo de datos y dominando las anotaciones de Spring Boot"
backgroundImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop"
overlayOpacity: 0.7
---
+++

+++admonition
---
type: info
title: "Objetivos de la Semana"
---
En esta unidad complementaria profundizaremos en el ecosistema de JPA:
1.  **Estrategias de Carga**: Diferencias entre `EAGER` y `LAZY`.
2.  **Tipos de Cascada**: Gestión del ciclo de vida de entidades relacionadas.
3.  **Modelado Elegante**: Uso de `@Embeddable` y `@Enumerated`.
4.  **Glosario Maestro**: Referencia rápida de anotaciones con ejemplos reales.
+++

---

## 1. Estrategias de Carga (FetchType)

El `FetchType` determina cuándo se cargan los datos de una relación desde la base de datos.

### 1.1 FetchType.LAZY (Carga Perezosa)
Los datos relacionados **no** se cargan hasta que se accede explícitamente a ellos (ej. al llamar al getter).
*   **Ventaja**: Ahorra memoria y mejora el rendimiento inicial.
*   **Uso recomendado**: Casi siempre en `@OneToMany` y `@ManyToMany`.

### 1.2 FetchType.EAGER (Carga Ansiosa)
Los datos relacionados se cargan inmediatamente junto con la entidad principal.
*   **Desventaja**: Puede causar el problema de **N+1 consultas** si no se maneja con cuidado.
*   **Uso predeterminado**: En `@ManyToOne` y `@OneToOne`.

+++admonition
---
type: warning
title: "El Problema de N+1 Consultas"
---
Ocurre cuando JPA ejecuta una consulta para obtener una lista de entidades (la consulta "1") y luego, por cada una de esas entidades, ejecuta una consulta adicional para obtener sus relaciones (las consultas "N"). 

**Ejemplo**: Si tienes 10 `Productos` y cada uno tiene una `Categoria` configurada como `EAGER`, JPA hará:
1. `SELECT * FROM producto` (1 consulta).
2. `SELECT * FROM categoria WHERE id = ?` (10 consultas, una por cada producto).

**Resultado**: 11 consultas para un proceso simple. Para evitarlo, usa `FetchType.LAZY` o consultas con `JOIN FETCH`.
+++

---

## 2. Tipos de Cascada (CascadeType)

La cascada define qué operaciones se propagan del "Padre" al "Hijo".

| Tipo | Efecto |
| :--- | :--- |
| `PERSIST` | Al guardar el padre, se guardan los hijos nuevos. |
| `MERGE` | Al actualizar el padre, se actualizan los hijos. |
| `REMOVE` | Al borrar el padre, se borran todos sus hijos. |
| `ALL` | Incluye todas las anteriores + `REFRESH` y `DETACH`. |

#### ¿Qué es `orphanRemoval = true`?

Mientras que `CascadeType.REMOVE` se encarga de borrar a los hijos cuando el **padre es borrado**, `orphanRemoval = true` se encarga de borrar a un hijo cuando este **deja de pertenecer** a la relación del padre (se convierte en un "huérfano").

*   **Escenario**: Tienes una `Factura` con una lista de `Items`.
*   **Comportamiento**: Si haces `factura.getItems().remove(item1)`, con `orphanRemoval = true`, JPA borrará automáticamente el `item1` de la base de datos al guardar la factura. Sin esto, el `item1` quedaría en la tabla con un `factura_id` nulo (o causaría un error de integridad).

```java
@OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
private List<ItemPedido> items = new ArrayList<>();
```

---

## 3. Modelado Avanzado

### 3.1 Clases Embeddables (@Embeddable)
Sirven para agrupar campos comunes en una clase separada pero que se guardan en la **misma tabla** de la entidad principal.

```java
@Embeddable
@Getter @Setter
public class Direccion {
    private String calle;
    private String ciudad;
    private String zipCode;
}

@Entity
public class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Embedded
    private Direccion direccion; // Se guarda en la tabla 'cliente'
}
```

### 3.2 Enumeraciones (@Enumerated)
Las enumeraciones permiten definir un conjunto fijo de constantes. En JPA, es crucial decidir cómo se guardarán estos valores en la base de datos.

#### Estrategias Disponibles:

1.  **EnumType.ORDINAL (Predeterminado)**:
    *   Guarda el número de índice (0, 1, 2...).
    *   **Pros**: Ocupa muy poco espacio en disco (un simple entero).
    *   **Contras**: **Frágil**. Si cambias el orden de los enums en el código, los datos antiguos en la DB cobrarán un significado diferente. **No recomendado** para proyectos que evolucionan.

2.  **EnumType.STRING**:
    *   Guarda el nombre del enum como texto (ej: "PENDIENTE").
    *   **Pros**: **Robusto** y legible. Si agregas nuevos valores o cambias el orden, los registros existentes no se ven afectados.
    *   **Contras**: Ocupa un poco más de espacio que un entero. **Altamente recomendado**.

#### Ejemplo Completo:

```java
// 1. Definimos el Enum
public enum Prioridad {
    BAJA, MEDIA, ALTA, CRITICA
}

// 2. Lo usamos en la Entidad
@Entity
public class Tarea {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;

    @Enumerated(EnumType.STRING) // Guardará "MEDIA", "ALTA", etc.
    @Column(length = 20) // Es buena práctica limitar el largo del String
    private Prioridad prioridad;
    
    @Enumerated(EnumType.ORDINAL) // Guardará 0, 1, 2...
    private EstadoTarea estado; 
}
```

---

## 4. Glosario Maestro de Anotaciones

A continuación, una guía exhaustiva de las anotaciones que todo desarrollador Backend debe dominar.

### 4.1 Persistencia (Jakarta Persistence)

#### `@Column`
Configura el mapeo detallado de un atributo.
```java
@Column(name = "full_name", length = 150, nullable = false, unique = true)
private String nombreCompleto;
```

#### `@Transient`
Ignora el campo para la base de datos (útil para campos calculados).
```java
@Transient
public Double getPrecioConIva() { return precio * 1.19; }
```

#### `@Lob`
Para textos muy largos (CLOB) o archivos binarios (BLOB).
```java
@Lob
private String biografiaExtensa;
```

### 4.2 Relaciones

#### `@JoinColumn`
Define la columna que guarda la llave foránea (FK).
```java
@ManyToOne
@JoinColumn(name = "fk_sucursal")
private Sucursal sucursal;
```

#### `@JoinTable`
Define la tabla intermedia en una relación muchos a muchos.
```java
@ManyToMany
@JoinTable(
    name = "rel_actor_pelicula",
    joinColumns = @JoinColumn(name = "actor_id"),
    inverseJoinColumns = @JoinColumn(name = "pelicula_id")
)
private Set<Pelicula> peliculas;
```

### 4.3 Lombok (Productividad)

#### `@Builder`
Permite crear objetos con un diseño fluido y legible.
```java
Producto p = Producto.builder()
                .nombre("Monitor")
                .precio(250.0)
                .build();
```

#### `@Getter` / `@Setter`
Generan los métodos de acceso automáticamente a nivel de clase o campo.

#### `@NoArgsConstructor` / `@AllArgsConstructor`
Generan constructores vacíos y con todos los argumentos respectivamente.

### 4.4 Jackson (JSON)

#### `@JsonIgnore` / `@JsonIgnoreProperties`
Evitan que campos sensibles o pesados se envíen en la respuesta API.
```java
@JsonIgnore
private String password;
```

#### `@JsonProperty`
Cambia el nombre de la llave en el JSON.
```java
@JsonProperty("fecha_registro")
private LocalDateTime createdAt;
```

---

## 5. Caso Práctico: Relación Muchos a Muchos con Atributos

A veces, la tabla intermedia necesita campos extra (ej: en una matrícula, la fecha de inscripción). En este caso, **no** usamos `@ManyToMany`, sino dos relaciones `@ManyToOne` hacia una **Entidad Asociativa**.

```java
@Entity
public class Inscripcion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Estudiante estudiante;

    @ManyToOne
    private Curso curso;

    private LocalDateTime fechaInscripcion; // Campo extra
    private Double notaFinal;               // Campo extra
}
```
