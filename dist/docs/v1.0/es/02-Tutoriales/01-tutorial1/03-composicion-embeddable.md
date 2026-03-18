---
title: "3. Composición con @Embeddable y @Embedded"
position: 3
---

# Composición con `@Embeddable` y `@Embedded`

## ¿Qué es la composición?

La **composición** es otra forma de reutilizar código. A diferencia de la herencia ("es un tipo de"), la composición significa **"tiene un"**:

- `Mesero` **tiene una** `InformacionPersonal` → Composición ✅
- `Mesa` **es un** `BaseEntity` → Herencia ✅

La composición te permite **agrupar campos relacionados** en una clase separada, manteniendo el código organizado sin crear tablas adicionales.

---

## Herencia vs Composición

+++comparison-table
---
headers:
  - "Aspecto"
  - { text: "Herencia (@MappedSuperclass)", highlight: false }
  - { text: "Composición (@Embeddable)", highlight: true }
rows:
  - ["Relación", "\"Es un tipo de\"", "\"Tiene un\""]
  - ["Ejemplo", "Mesa extends BaseEntity", "Mesero tiene InformacionPersonal"]
  - ["¿Crea tabla?", "false", "false"]
  - ["¿Dónde van los campos?", "En la tabla de cada hijo", "En la tabla de quien la use"]
  - ["Uso típico", "Campos comunes a todas las entidades", "Agrupar campos relacionados"]
---
+++

---

## `@Embeddable` — La clase que será "incrustada"

```java
@Embeddable        // Le dice a JPA: "esta clase puede ser incrustada dentro de otra entidad"
@Getter
@Setter
@NoArgsConstructor                     // Constructor vacío (requerido por JPA)
@AllArgsConstructor                    // Constructor con todos los campos
public class InformacionPersonal {

    @Column(name = "nombres", nullable = false, length = 100)
    private String nombres;

    @Column(name = "apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "telefono", length = 20)
    private String telefono;
}
```

+++admonition
---
type: info
title: "Puntos clave de @Embeddable"
---
- La clase **NO** tiene `@Entity`, por tanto **no genera tabla propia**
- La clase **NO** tiene campo `id`, no es una entidad independiente
- Sus campos se "incrustan" directamente en la tabla de quien la use
+++

---

## `@Embedded` — Donde se usa la clase embebible

```java
@Entity
@Table(name = "meseros")
public class Mesero extends BaseEntity {

    @Embedded   // Le dice a JPA: "los campos de InformacionPersonal van en esta misma tabla"
    private InformacionPersonal informacionPersonal;
}
```

La tabla `meseros` que genera este código:

### Tabla "meseros"

| id | fecha_registro | nombres | apellidos | telefono |
|:--:|:--------------:|:-------:|:---------:|:--------:|
| 1 | 2024-03-18 10:00:00 | Carlos | Ruiz | 3001234567 |

> **Nota:** Los campos `nombres`, `apellidos` y `telefono` provienen de `InformacionPersonal`.

+++admonition
---
type: note
title: "¡Sin tabla extra!"
---
Las columnas `nombres`, `apellidos` y `telefono` aparecen **directamente** en la tabla `meseros`, aunque están definidas en una clase separada.
+++

---

## ¿Por qué no usar herencia para información personal?

### ¿Podría Mesero heredar de InformacionPersonal?
La respuesta es conceptual: la herencia significa *"es un tipo de"*.
Un `Mesero` **no es un tipo de** `InformacionPersonal`.
Un `Mesero` **tiene** `InformacionPersonal`. Por eso usamos composición.

**Regla práctica:**
- **¿Es un tipo de?** → Herencia (`extends`)
- **¿Tiene un?** → Composición (`@Embedded`)

### ¿Cómo accedo a los datos del objeto embebido?
Desde el servicio, para leer o escribir los datos de `InformacionPersonal`:

```java
// Leer nombres del mesero
String nombres = mesero.getInformacionPersonal().getNombres();

// Asignar nueva información personal
mesero.setInformacionPersonal(new InformacionPersonal("Juan", "García", "3109876543"));
```

### ¿Puedo hacer consultas sobre campos embebidos?
Sí. Spring entiende y traduce automáticamente queries sobre campos embebidos:

```java
// En el repositorio, Spring genera el SQL correcto:
List<Mesero> findByInformacionPersonalApellidosContainingIgnoreCase(String apellidos);
// SQL generado: SELECT * FROM meseros WHERE apellidos ILIKE '%apellidos%'
```
