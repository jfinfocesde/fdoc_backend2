---
title: "10. Flujo Completo de una Petición HTTP"
position: 10
---

# Flujo Completo de una Petición HTTP

## Caso de uso: Crear un pedido

Vamos a seguir paso a paso lo que ocurre cuando el cliente (Postman) hace:

```json
POST http://localhost:8080/api/pedidos
Content-Type: application/json

{
  "total": 85.50,
  "mesaId": 2,
  "meseroId": 1
}
```

---

## Los 8 pasos del flujo

### Tomcat recibe la petición
Spring Boot incluye **Apache Tomcat** que escucha en el puerto `8080`. Cuando llega una petición HTTP, Tomcat la procesa y la entrega a Spring MVC para que encuentre el controlador adecuado.

### Spring MVC enruta la petición
Spring MVC analiza el método HTTP (`POST`) y la URL (`/api/pedidos`) y encuentra el método correcto en `PedidoController.java`:

```java
@PostMapping
public ResponseEntity<PedidoResponse> create(@RequestBody PedidoRequest request) { ... }
```

### Jackson deserializa el JSON
**Jackson** convierte el JSON del body en un objeto `PedidoRequest` Java automáticamente gracias a `@RequestBody`. Este proceso se llama **deserialización**.

### El Controller llama al Service
El controller **no hace ninguna lógica de negocio**. Solo delega:

```java
return ResponseEntity.status(HttpStatus.CREATED)
        .body(pedidoService.save(request));
```

### El Service ejecuta la lógica de negocio
`@Transactional` abre una transacción. El servicio valida y busca las entidades relacionadas, crea el `Pedido` con estado `PENDIENTE` (regla de negocio) y lo guarda en la BD.

### El Service mapea la entidad al DTO de respuesta
Convierte la entidad `Pedido` (con sus relaciones `Mesa` y `Mesero`) en un `PedidoResponse` listo para enviar al cliente.

### Jackson serializa el DTO a JSON
El objeto `PedidoResponse` se convierte en JSON. Este proceso se llama **serialización** y ocurre gracias a `@RestController`.

### El cliente recibe la respuesta HTTP
```
HTTP/1.1 201 Created
Content-Type: application/json

{ ... JSON del pedido creado ... }
```

---

## Diagrama completo del flujo

+++mermaid
graph TD
    A["🖥️ Cliente (Postman)"] -->|"POST /api/pedidos"| B["🔌 Tomcat (puerto 8080)"]
    B -->|"Enruta la petición"| C["🌐 Spring MVC"]
    C -->|"Jackson deserializa JSON → PedidoRequest"| D["🌐 PedidoController"]
    D -->|"pedidoService.save(request)"| E["⚙️ PedidoService @Transactional"]
    E -->|"findById(mesaId)"| F["🗄️ MesaRepository"]
    F -->|"SELECT * FROM mesas"| G[("📦 PostgreSQL")]
    E -->|"findById(meseroId)"| H["🗄️ MeseroRepository"]
    H -->|"SELECT * FROM meseros"| G
    E -->|"save(pedido)"| I["🗄️ PedidoRepository"]
    I -->|"INSERT INTO pedidos"| G
    G -->|"Pedido guardado con id y fechas"| I
    I --> E
    E -->|"PedidoResponse (DTO)"| D
    D -->|"Jackson serializa → JSON"| A

    style E fill:#1e3a5f,stroke:#4a9eff,color:#fff
+++

---

## Resumen de responsabilidades por capa

+++comparison-table
---
headers:
  - "Capa"
  - { text: "Responsabilidad", highlight: true }
  - "No debe hacer"
rows:
  - ["Controller", "Recibir HTTP, delegar, devolver respuesta", "Lógica de negocio, acceder a BD"]
  - ["Service", "Validar, transformar, coordinar", "Acceder directamente a BD, manejar HTTP"]
  - ["Repository", "Consultas a BD", "Lógica de negocio, conocer HTTP"]
  - ["Entity", "Representar la tabla en BD", "Tener lógica de negocio compleja"]
  - ["DTO", "Transportar datos cliente ↔ servidor", "Tener lógica, anotaciones JPA"]
---
+++

---

## Resumen de todo lo aprendido

| Concepto | Anotación / Clase | Para qué sirve |
|----------|------------------|----------------|
| **Herencia JPA** | `@MappedSuperclass` | Compartir campos sin crear tabla |
| **Auditoría** | `@CreatedDate`, `@LastModifiedDate` | Fechas automáticas |
| **Composición** | `@Embeddable`, `@Embedded` | Agrupar campos sin tabla extra |
| **Enumeraciones** | `@Enumerated(EnumType.STRING)` | Valores fijos como texto en BD |
| **Relaciones** | `@ManyToOne`, `@JoinColumn` | Llaves foráneas entre tablas |
| **Repositorio** | `JpaRepository` | CRUD automático + consultas derivadas |
| **Servicio** | `@Service`, `@Transactional` | Lógica de negocio con transacciones |
| **DTO** | Clases Request/Response | Separar la API de la BD |
| **Controlador** | `@RestController` | Endpoints HTTP REST |
| **Inyección** | `@RequiredArgsConstructor` | Spring gestiona las dependencias |
