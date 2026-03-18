---
title: "6. Repositorios JPA"
position: 6
---

# Repositorios JPA

## ¿Qué es un repositorio?

Un **repositorio** es la capa del proyecto que se comunica directamente con la base de datos. Es el encargado de ejecutar las consultas (buscar, insertar, actualizar, borrar).

+++comparison-table
---
headers:
  - "Sin Spring Data JPA"
  - { text: "Con Spring Data JPA ✅", highlight: true }
rows:
  - ["Escribir SQL manual con JDBC", "Una línea de código"]
  - ["Gestionar conexiones manualmente", "Spring gestiona todo"]
  - ["Mapear ResultSet a objetos", "Mapeo automático"]
  - ["Manejar excepciones de JDBC", "Excepciones de Spring claras"]
---
+++

---

## `JpaRepository<T, ID>` — La interfaz mágica

Los repositorios del proyecto extienden `JpaRepository`:

```java
@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
//                                                    ↑     ↑
//                                              La entidad  El tipo del id
}
```

`JpaRepository` ya trae **docenas de métodos implementados** listos para usar:

| Método | SQL que ejecuta | Descripción |
|--------|----------------|-------------|
| `findAll()` | `SELECT * FROM mesas` | Traer todos los registros |
| `findById(id)` | `SELECT * FROM mesas WHERE id = ?` | Buscar por id |
| `save(entity)` | `INSERT` o `UPDATE` | Guardar o actualizar |
| `deleteById(id)` | `DELETE FROM mesas WHERE id = ?` | Eliminar por id |
| `existsById(id)` | `SELECT COUNT(*) WHERE id = ?` | ¿Existe? |
| `count()` | `SELECT COUNT(*) FROM mesas` | Contar registros |

+++admonition
---
type: info
title: "¿Por qué una interfaz y no una clase?"
---
Spring Data JPA genera una implementación concreta de la interfaz en tiempo de ejecución, usando reflexión de Java. Tú nunca tienes que escribir el `implements`. Solo defines la interfaz y Spring hace el resto.
+++

---

## Los repositorios del proyecto

### MesaRepository.java
```java
@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {

    // Consulta derivada por ubicación
    List<Mesa> findByUbicacion(UbicacionMesa ubicacion);
    // SQL: SELECT * FROM mesas WHERE ubicacion = ?

    // Consulta de existencia por número de mesa
    boolean existsByNumeroMesa(Integer numeroMesa);
    // SQL: SELECT COUNT(*) > 0 FROM mesas WHERE numero_mesa = ?
}
```

### MeseroRepository.java
```java
@Repository
public interface MeseroRepository extends JpaRepository<Mesero, Long> {

    // Consulta sobre un campo del objeto @Embedded (InformacionPersonal)
    List<Mesero> findByInformacionPersonalApellidosContainingIgnoreCase(String apellidos);
    // SQL: SELECT * FROM meseros WHERE apellidos ILIKE '%apellidos%'
}
```

### PedidoRepository.java
```java
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByEstado(EstadoPedido estado);
    // SQL: SELECT * FROM pedidos WHERE estado = ?

    List<Pedido> findByMesaId(Long mesaId);
    // SQL: SELECT * FROM pedidos WHERE mesa_id = ?

    List<Pedido> findByMeseroId(Long meseroId);
    // SQL: SELECT * FROM pedidos WHERE mesero_id = ?
}
```

---

## Consultas derivadas — El "idioma" de Spring Data

Spring Data lee el nombre del método y genera el SQL automáticamente.

### Prefijos disponibles
| Prefijo | Acción SQL |
|---------|-----------|
| `findBy...` | `SELECT ... WHERE` |
| `existsBy...` | `SELECT COUNT(*) > 0 WHERE` |
| `deleteBy...` | `DELETE WHERE` |
| `countBy...` | `SELECT COUNT(*) WHERE` |

### Condiciones disponibles
| Sufijo | SQL generado |
|--------|-------------|
| `Equals` (por defecto) | `= ?` |
| `Containing` | `LIKE '%?%'` |
| `ContainingIgnoreCase` | `ILIKE '%?%'` |
| `StartingWith` | `LIKE '?%'` |
| `EndingWith` | `LIKE '%?'` |
| `IgnoreCase` | `UPPER(col) = UPPER(?)` |
| `GreaterThan` | `> ?` |
| `LessThan` | `< ?` |
| `Between` | `BETWEEN ? AND ?` |
| `True` / `False` | `= true` / `= false` |
| `IsNull` | `IS NULL` |
| `In` | `IN (?, ?, ?)` |
| `OrderBy...Asc/Desc` | `ORDER BY ... ASC/DESC` |

### Ejemplo combinado
```java
// Buscar pedidos PENDIENTES de una mesa específica, ordenados por fecha
List<Pedido> findByEstadoAndMesaIdOrderByFechaRegistroDesc(
    EstadoPedido estado, Long mesaId
);
// SQL: SELECT * FROM pedidos
//      WHERE estado = ? AND mesa_id = ?
//      ORDER BY fecha_registro DESC
```

---

## ¿Es `@Repository` obligatorio?

+++admonition
---
type: note
title: "@Repository en interfaces JpaRepository"
---
No es estrictamente obligatorio en interfaces que extienden `JpaRepository`, porque Spring ya las detecta automáticamente. Sin embargo es una buena práctica porque:

1. Hace el código más **legible** (queda claro que es un repositorio)
2. Permite a Spring traducir excepciones de JDBC a excepciones de Spring más claras (`DataAccessException`)
+++
