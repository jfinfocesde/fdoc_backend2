---
title: "4. Enumeraciones con @Enumerated"
position: 4
---

# Enumeraciones con `@Enumerated`

## ¿Qué es una enumeración (enum)?

Una **enumeración** es una lista de valores **fijos y predefinidos**. Se usa cuando un campo solo puede tener un conjunto limitado de opciones.

En nuestro restaurante:
- **Estado de un pedido**: `PENDIENTE`, `PREPARANDO`, `SERVIDO`, `PAGADO`
- **Ubicación de una mesa**: `TERRAZA`, `SALON_PRINCIPAL`, `VIP`, `BAR`

---

## ¿Por qué no usar un String directamente?

+++comparison-table
---
headers:
  - "Aspecto"
  - "String sin enum ❌"
  - { text: "Enum ✅", highlight: true }
rows:
  - ["Validación automática", "false", "true"]
  - ["Sugerencias del IDE", "false", "true"]
  - ["Errores de tipeo", "\"pendiante\" pasa sin aviso", "El compilador avisa"]
  - ["Valores posibles", "Cualquier texto", "Solo los valores definidos"]
  - ["Refactoring seguro", "false", "true"]
---
+++

---

## Los enums del proyecto

### EstadoPedido.java
```java
package com.example.demo_basic.model.enums;

public enum EstadoPedido {
    PENDIENTE,    // El pedido fue tomado pero aún no se envió a cocina
    PREPARANDO,   // La cocina está preparando el pedido
    SERVIDO,      // El pedido fue entregado en la mesa
    PAGADO        // El cliente pagó y el pedido está cerrado
}
```

### UbicacionMesa.java
```java
package com.example.demo_basic.model.enums;

public enum UbicacionMesa {
    TERRAZA,           // Mesas al aire libre
    SALON_PRINCIPAL,   // Salón interior principal
    VIP,               // Sala privada VIP
    BAR                // Área de bar
}
```

---

## `@Enumerated(EnumType.STRING)` — Cómo se guarda en la BD

+++comparison-table
---
headers:
  - "Estrategia"
  - "Qué guarda en BD"
  - { text: "¿Recomendado?", highlight: true }
rows:
  - ["Sin @Enumerated (ORDINAL)", "0, 1, 2, 3 (índice numérico)", "false"]
  - ["@Enumerated(EnumType.STRING)", "\"PENDIENTE\", \"PREPARANDO\"...", "true"]
---
+++

+++admonition
---
type: warning
title: "El peligro de EnumType.ORDINAL"
---
Si guardas el enum como número (ORDINAL) y mañana cambias el orden de los valores o insertas uno nuevo en el medio, **todos los datos existentes en la BD quedan con el significado incorrecto**. Esto es una corrupción de datos silenciosa y muy difícil de detectar.

**Siempre usa `EnumType.STRING`.**
+++

---

## Uso en las entidades

```java
// En Pedido.java
@Enumerated(EnumType.STRING)          // Guardar como texto, no como número
@Column(name = "estado",
        nullable = false,
        length = 20)                   // VARCHAR(20) es suficiente para los nombres
private EstadoPedido estado;

// En Mesa.java
@Enumerated(EnumType.STRING)
@Column(name = "ubicacion", nullable = false, length = 30)
private UbicacionMesa ubicacion;
```

---

## Cómo se ve en la base de datos

### Tabla "pedidos" (EnumType.STRING)

| id | total | estado |
|:--:|:-----:|:------:|
| 1 | 85.5 | PENDIENTE |
| 2 | 120.0 | PREPARANDO |
| 3 | 45.0 | PAGADO |

### Tabla "mesas"

| id | numero_mesa | ubicación |
|:--:|:-----------:|:---------:|
| 1 | 1 | SALON_PRINCIPAL |
| 2 | 5 | TERRAZA |
| 3 | 10 | VIP |

+++admonition
---
type: info
title: "Conversión automática en la API"
---
Cuando el cliente envía `{ "ubicacion": "TERRAZA" }`, Spring convierte automáticamente el texto al enum `UbicacionMesa.TERRAZA`. Al devolver la respuesta, Jackson lo convierte de vuelta a texto. El valor debe coincidir **exactamente** con el nombre del enum (respeta mayúsculas).
+++
