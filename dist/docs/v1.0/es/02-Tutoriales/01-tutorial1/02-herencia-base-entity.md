---
title: "2. Herencia JPA con @MappedSuperclass"
position: 2
---

# Herencia JPA con `@MappedSuperclass`

## ¿Qué es la herencia en programación?

La **herencia** es uno de los pilares de la Programación Orientada a Objetos (POO).
Permite que una clase "hijo" tome todos los campos y comportamientos de una clase "padre".

Imagina que tienes tres formularios (Mesa, Mesero, Pedido). Todos comparten un encabezado común: `Número de registro` y `Fecha`. En lugar de imprimir ese encabezado en cada formulario, lo pones en una plantilla base y cada formulario la hereda.

En Java esto se hace con la palabra `extends`:

```java
public class Mesa extends BaseEntity { ... }
//     ↑ hijo          ↑ padre/plantilla
```

---

## El problema: código duplicado sin herencia

+++admonition
---
type: warning
title: "Violación del principio DRY"
---
Sin herencia tendrías que repetir los mismos campos en **cada entidad**. Esto viola el principio **DRY** (Don't Repeat Yourself). Si mañana quieres cambiar el nombre de `fechaRegistro`, tendrías que cambiarlo en todos los archivos.

```java
// En Mesa.java, Mesero.java, Pedido.java... ¡repetido 3 veces!
private Long id;
private LocalDateTime fechaRegistro;
private LocalDateTime fechaModificacion;
```
+++

---

## `@MappedSuperclass` — La solución

+++comparison-table
---
headers:
  - "Anotación"
  - "¿Crea tabla propia?"
  - { text: "¿Sus campos van a los hijos?", highlight: true }
rows:
  - ["@Entity", "true", "No (tiene su propia tabla)"]
  - ["@MappedSuperclass", "false", "true"]
---
+++

---

## El código de `BaseEntity.java`

```java
@MappedSuperclass                              // No crea tabla propia
@EntityListeners(AuditingEntityListener.class) // Activa la auditoría automática
@Getter                                        // Lombok genera getXxx()
@Setter                                        // Lombok genera setXxx()
public abstract class BaseEntity {             // abstract = no puedes instanciarla directamente

    @Id                                        // Este campo es la llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // IDENTITY = la BD asigna el id automáticamente (autoincremental de PostgreSQL)
    private Long id;

    @CreatedDate                               // Spring asigna este valor al hacer INSERT
    @Column(name = "fecha_registro",
            nullable = false,                  // No puede ser null en la BD
            updatable = false)                 // Una vez asignado, nunca cambia
    private LocalDateTime fechaRegistro;

    @LastModifiedDate                          // Spring actualiza este valor en cada UPDATE
    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;
}
```

+++admonition
---
type: info
title: "¿Por qué abstract?"
---
La palabra `abstract` en la clase significa que **no puedes crear un objeto BaseEntity directamente**:

```java
BaseEntity b = new BaseEntity(); // ❌ Error de compilación
Mesa m = new Mesa();             // ✅ Correcto
```

Esto tiene sentido porque BaseEntity es solo una plantilla, no representa nada concreto del restaurante.
+++

---

## Auditoría automática con Spring Data

### Paso 1: Habilitar auditoría en la clase principal
Agrega `@EnableJpaAuditing` en `DemoBasicApplication.java` para activar el sistema de auditoría.

```java
@SpringBootApplication
@EnableJpaAuditing  // ← Esta anotación activa todo
public class DemoBasicApplication { ... }
```

### Paso 2: Registrar el listener en BaseEntity
`@EntityListeners(AuditingEntityListener.class)` le dice a JPA que observe los eventos de esta entidad (INSERT, UPDATE).

### Paso 3: Anotar los campos de fecha
Spring detecta automáticamente cuándo actuar:
- **`@CreatedDate`**: se rellena en el primer `repository.save(entity)` (INSERT)
- **`@LastModifiedDate`**: se actualiza en cada `repository.save(entity)` posterior (UPDATE)

---

## ¿Qué tablas se generan?

`BaseEntity` **no genera ninguna tabla**. Sus campos aparecen directamente en las tablas de las entidades hijas:

### Tabla "mesas"

| id | numero_mesa | fecha_registro | fecha_modificacion |
|:--:|:-----------:|:--------------:|:------------------:|
| 1 | 5 | 2024-03-18 10:00:00 | 2024-03-18 10:05:00 |

> **Nota:** Los campos `id`, `fecha_registro` y `fecha_modificacion` son heredados de `BaseEntity`.
