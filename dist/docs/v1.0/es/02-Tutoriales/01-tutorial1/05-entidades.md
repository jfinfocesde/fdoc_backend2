---
title: "5. Entidades JPA: Mesa, Mesero y Pedido"
position: 5
---

# Entidades JPA: Mesa, Mesero y Pedido

## ¿Qué es una entidad JPA?

Una **entidad** es una clase Java que representa una **tabla en la base de datos**. JPA convierte automáticamente la clase en tabla, los campos en columnas y los objetos en filas.

Para que JPA reconozca una clase como entidad, debe llevar la anotación `@Entity`.

---

## Entidades del proyecto

### Mesa.java
```java
@Entity                    // Esta clase es una tabla en la BD
@Table(name = "mesas")     // El nombre exacto de la tabla será "mesas"
@Getter                    // Lombok: genera todos los getters
@Setter                    // Lombok: genera todos los setters
@NoArgsConstructor         // Lombok: genera constructor vacío (JPA lo requiere)
@AllArgsConstructor        // Lombok: genera constructor con todos los campos
public class Mesa extends BaseEntity {
//                 ↑ Hereda: id, fechaRegistro, fechaModificacion

    @Column(name = "numero_mesa", nullable = false, unique = true)
    //                                               ↑ No puede haber dos mesas con el mismo número
    private Integer numeroMesa;

    @Enumerated(EnumType.STRING)           // Guarda "TERRAZA" en vez de 0
    @Column(name = "ubicacion", nullable = false, length = 30)
    private UbicacionMesa ubicacion;
}
```

### Mesero.java
```java
@Entity
@Table(name = "meseros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mesero extends BaseEntity {
//                    ↑ Hereda: id, fechaRegistro, fechaModificacion

    @Embedded   // Los campos de InformacionPersonal se "incrustan" aquí
    private InformacionPersonal informacionPersonal;
    // Esto agrega las columnas: nombres, apellidos, telefono
}
```

### Pedido.java
```java
@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido extends BaseEntity {

    @Column(name = "total", nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 20)
    private EstadoPedido estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id", nullable = false)
    private Mesa mesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesero_id", nullable = false)
    private Mesero mesero;
}
```

---

## Relación `@ManyToOne` explicada

### ¿Qué significa Many-To-One?
Piensa en la relación entre Pedidos y Mesas:
- **Una Mesa** puede tener **muchos Pedidos** (a lo largo del día)
- **Un Pedido** pertenece a **una sola Mesa**

Esto es una relación "Muchos a Uno" visto desde el lado del Pedido: **Muchos** Pedidos → **Una** Mesa.

### ¿Qué hace @JoinColumn?
```java
@JoinColumn(name = "mesa_id", nullable = false)
```
- `name = "mesa_id"`: JPA crea una columna llamada `mesa_id` en la tabla `pedidos`
- Esta columna almacena el `id` de la mesa correspondiente (llave foránea / FK)
- `nullable = false`: todo pedido DEBE tener una mesa asignada

### ¿Qué es FetchType.LAZY?
Por defecto (`EAGER`), cuando cargas un Pedido, JPA también carga el Mesero y la Mesa completos. Con 1000 pedidos, eso son 3000 consultas adicionales.

Con `LAZY`, JPA **no carga la Mesa ni el Mesero** hasta que los necesitas explícitamente:
```java
Pedido p = pedidoRepository.findById(1L);
// Aquí Mesa y Mesero NO están cargados aún

String ubicacion = p.getMesa().getUbicacion(); // ← AQUÍ sí se carga la Mesa
```
Esto mejora el rendimiento considerablemente.

---

## Tablas generadas en PostgreSQL

### Tabla "mesas" (SQL)
```sql
CREATE TABLE mesas (
    id                 BIGSERIAL PRIMARY KEY,
    fecha_registro     TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP,
    numero_mesa        INTEGER NOT NULL UNIQUE,
    ubicacion          VARCHAR(30) NOT NULL
);
```

### Tabla "meseros" (SQL)
```sql
CREATE TABLE meseros (
    id                 BIGSERIAL PRIMARY KEY,
    fecha_registro     TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP,
    nombres            VARCHAR(100) NOT NULL,   -- de InformacionPersonal
    apellidos          VARCHAR(100) NOT NULL,   -- de InformacionPersonal
    telefono           VARCHAR(20)              -- de InformacionPersonal
);
```

### Tabla "pedidos" (SQL)
```sql
CREATE TABLE pedidos (
    id                 BIGSERIAL PRIMARY KEY,
    fecha_registro     TIMESTAMP NOT NULL,
    fecha_modificacion TIMESTAMP,
    total              DOUBLE PRECISION NOT NULL,
    estado             VARCHAR(20) NOT NULL,
    mesa_id            BIGINT NOT NULL REFERENCES mesas(id),    -- FK
    mesero_id          BIGINT NOT NULL REFERENCES meseros(id)   -- FK
);
```

---

## Diagrama de relaciones

+++mermaid
erDiagram
    MESEROS {
        bigint id PK
        timestamp fecha_registro
        timestamp fecha_modificacion
        varchar nombres
        varchar apellidos
        varchar telefono
    }
    MESAS {
        bigint id PK
        timestamp fecha_registro
        timestamp fecha_modificacion
        integer numero_mesa
        varchar ubicacion
    }
    PEDIDOS {
        bigint id PK
        timestamp fecha_registro
        timestamp fecha_modificacion
        double total
        varchar estado
        bigint mesa_id FK
        bigint mesero_id FK
    }
    MESAS ||--o{ PEDIDOS : "tiene"
    MESEROS ||--o{ PEDIDOS : "atiende"
+++

---

## Anotaciones JPA más comunes

| Anotación | Significado |
|-----------|------------|
| `@Entity` | La clase es una tabla |
| `@Table(name="...")` | Nombre personalizado de la tabla |
| `@Column(...)` | Configuración de una columna |
| `@Id` | Llave primaria |
| `@GeneratedValue` | Id auto-generado por la BD |
| `@ManyToOne` | Relación muchos a uno |
| `@JoinColumn` | Define el nombre de la columna FK |
| `@Enumerated` | Cómo guardar un enum |
| `@Embedded` | Incrustar otro objeto en esta tabla |
