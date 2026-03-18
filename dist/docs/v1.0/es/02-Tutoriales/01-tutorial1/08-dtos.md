---
title: "8. Patrón DTO (Data Transfer Object)"
position: 8
---

# Patrón DTO (Data Transfer Object)

## ¿Qué es un DTO?

**DTO** significa **Data Transfer Object** (Objeto de Transferencia de Datos). Es una clase simple cuya única función es **transportar datos** entre capas: del cliente al servidor (Request) o del servidor al cliente (Response).

---

## ¿Por qué no enviar las entidades directamente?

### 1. Seguridad — No exponer campos internos
La entidad `Pedido` tiene campos internos como referencias `Mesa` y `Mesero` completas. Con un DTO decides exactamente qué campos envías y cuáles omites.

### 2. Problemas con FetchType.LAZY
Las entidades con `@ManyToOne(fetch = LAZY)` pueden causar `LazyInitializationException` si Jackson intenta serializar la relación fuera de una transacción activa. Los DTOs evitan este problema completamente.

### 3. Separación de responsabilidades
La entidad JPA es el contrato con la **base de datos**. El DTO es el contrato con el **cliente HTTP**. Cambiar uno no obliga a cambiar el otro.

### 4. Flexibilidad en el formato
El cliente puede necesitar un formato diferente. Por ejemplo, `InformacionPersonal` está en un objeto separado en la entidad, pero en el JSON del cliente es más cómodo verla "aplanada":

```json
// Estructura de la entidad (anidada):
{ "informacionPersonal": { "nombres": "Carlos", "apellidos": "Ruiz" } }

// DTO permite enviar (plana y limpia):
{ "nombres": "Carlos", "apellidos": "Ruiz" }
```

---

## DTOs de Entrada (`request/`)

Son los datos que el **cliente envía al servidor**.

### MesaRequest.java
```java
@Getter
@Setter
public class MesaRequest {
    private Integer numeroMesa;
    private UbicacionMesa ubicacion;
}

// Petición HTTP:
// POST /api/mesas
// { "numeroMesa": 5, "ubicacion": "TERRAZA" }
```

### MeseroRequest.java
```java
@Getter
@Setter
public class MeseroRequest {
    private String nombres;
    private String apellidos;
    private String telefono;
}

// Petición HTTP:
// POST /api/meseros
// { "nombres": "Carlos", "apellidos": "Ruiz López", "telefono": "3001234567" }

// El servicio convierte este DTO plano al objeto InformacionPersonal:
private InformacionPersonal toEmbeddable(MeseroRequest request) {
    return new InformacionPersonal(
            request.getNombres(),
            request.getApellidos(),
            request.getTelefono()
    );
}
```

### PedidoRequest.java
```java
@Getter
@Setter
public class PedidoRequest {
    private Double total;
    private Long mesaId;    // Id de la mesa (no el objeto completo)
    private Long meseroId;  // Id del mesero (no el objeto completo)
}

// Petición HTTP:
// POST /api/pedidos
// { "total": 85.50, "mesaId": 1, "meseroId": 2 }

// El servicio busca las entidades por sus ids:
// Mesa mesa = mesaService.findEntity(request.getMesaId());
// Mesero mesero = meseroService.findEntity(request.getMeseroId());
```

---

## DTOs de Salida (`response/`)

Son los datos que el **servidor envía al cliente**.

### MesaResponse.java
```java
@Getter
@Setter
@AllArgsConstructor  // Constructor con todos los campos (lo usa el mapper)
public class MesaResponse {
    private Long id;
    private Integer numeroMesa;
    private UbicacionMesa ubicacion;
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaModificacion;
}

// Respuesta JSON:
// { "id": 1, "numeroMesa": 5, "ubicacion": "TERRAZA",
//   "fechaRegistro": "2024-03-18T10:00:00", "fechaModificacion": "2024-03-18T10:05:00" }
```

### MeseroResponse.java
```java
@Getter @Setter @AllArgsConstructor
public class MeseroResponse {
    private Long id;
    private String nombres;      // ← aplanado: no hay subobjeto InformacionPersonal
    private String apellidos;
    private String telefono;
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaModificacion;
}
```

### PedidoResponse.java
```java
@Getter @Setter @AllArgsConstructor
public class PedidoResponse {
    private Long id;
    private Double total;
    private EstadoPedido estado;
    private MesaResponse mesa;       // ← objeto completo de la mesa
    private MeseroResponse mesero;   // ← objeto completo del mesero
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaModificacion;
}

// Respuesta JSON incluye objetos anidados:
// { "id": 1, "total": 85.50, "estado": "PENDIENTE",
//   "mesa": { "id": 2, "numeroMesa": 5, "ubicacion": "TERRAZA" },
//   "mesero": { "id": 1, "nombres": "Carlos", "apellidos": "Ruiz" } }
```

---

## Flujo de datos completo

+++mermaid
sequenceDiagram
    participant C as 🖥️ Cliente
    participant CT as 🌐 Controller
    participant S as ⚙️ Service
    participant R as 🗄️ Repository
    participant DB as 📦 Base de datos

    C->>CT: POST /api/pedidos (JSON body)
    CT->>S: PedidoRequest (DTO entrada)
    S->>R: findById(mesaId)
    R->>DB: SELECT * FROM mesas WHERE id=?
    DB-->>R: Mesa entity
    R-->>S: Mesa entity
    S->>R: save(Pedido entity)
    R->>DB: INSERT INTO pedidos...
    DB-->>R: Pedido guardado
    R-->>S: Pedido entity
    S-->>CT: PedidoResponse (DTO salida)
    CT-->>C: HTTP 201 + JSON response
+++
