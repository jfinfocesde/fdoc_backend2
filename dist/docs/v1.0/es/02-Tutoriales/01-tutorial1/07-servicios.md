---
title: "7. Capa de Servicio"
position: 7
---

# Capa de Servicio

## ¿Qué es un servicio?

La **capa de servicio** contiene la **lógica de negocio** de la aplicación. Es el intermediario entre el Controller y el Repository.

+++admonition
---
type: info
title: "Analogía del restaurante"
---
- El **mesero** (Controller) toma el pedido del cliente y lo entrega
- El **encargado** (Service) verifica si hay mesa disponible, valida el pedido, lo registra
- El **sistema de cocina** (Repository) guarda la orden en la base de datos

El servicio es donde viven las **reglas de negocio**, como:
- "No puede haber dos mesas con el mismo número"
- "Un pedido nuevo siempre empieza en estado PENDIENTE"
- "Para borrar un mesero, primero verifica que existe"
+++

---

## Anotaciones clave

+++feature-list
---
items:
  - title: "@Service"
    icon: "SettingsIcon"
    content: |
      Marca la clase como un componente de servicio de Spring. Spring lo detecta automáticamente y lo gestiona como un **bean** (objeto administrado por el contenedor).
  - title: "@RequiredArgsConstructor (Lombok)"
    icon: "KeyIcon"
    content: |
      Genera un constructor con todos los campos `final`. Spring usa este constructor para inyectar las dependencias automáticamente — esto se llama **Inyección de Dependencias**.
  - title: "@Transactional"
    icon: "ShieldIcon"
    content: |
      Envuelve el método en una **transacción de base de datos**. Si algo falla a la mitad (error de red, excepción), todos los cambios se revierten automáticamente (rollback). Es como el "deshacer" de la base de datos.
---
+++

---

## `MesaService.java` — Análisis completo

```java
@Service
@RequiredArgsConstructor
public class MesaService {

    private final MesaRepository mesaRepository; // Spring inyecta esto automáticamente

    // ── SOLO LECTURA (sin @Transactional, más eficiente) ──────────────────

    public List<MesaResponse> findAll() {
        return mesaRepository.findAll()
                .stream()
                .map(this::toResponse)    // Convierte cada Mesa → MesaResponse
                .toList();
    }

    public MesaResponse findById(Long id) {
        return toResponse(findEntity(id)); // findEntity lanza excepción si no existe
    }

    // ── ESCRITURA (con @Transactional para garantizar atomicidad) ──────────

    @Transactional
    public MesaResponse save(MesaRequest request) {
        // Regla de negocio: no duplicar números de mesa
        if (mesaRepository.existsByNumeroMesa(request.getNumeroMesa())) {
            throw new IllegalArgumentException(
                    "Ya existe una mesa con el número: " + request.getNumeroMesa());
        }
        Mesa mesa = new Mesa();
        mesa.setNumeroMesa(request.getNumeroMesa());
        mesa.setUbicacion(request.getUbicacion());
        return toResponse(mesaRepository.save(mesa));
    }

    @Transactional
    public MesaResponse update(Long id, MesaRequest request) {
        Mesa mesa = findEntity(id);
        mesa.setNumeroMesa(request.getNumeroMesa());
        mesa.setUbicacion(request.getUbicacion());
        return toResponse(mesaRepository.save(mesa));
    }

    @Transactional
    public void delete(Long id) {
        findEntity(id);                    // Valida que existe antes de borrar
        mesaRepository.deleteById(id);
    }

    // ── MÉTODOS INTERNOS ───────────────────────────────────────────────────

    public Mesa findEntity(Long id) {
        return mesaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Mesa no encontrada con id: " + id));
    }

    public MesaResponse toResponse(Mesa mesa) {
        return new MesaResponse(
                mesa.getId(),
                mesa.getNumeroMesa(),
                mesa.getUbicacion(),
                mesa.getFechaRegistro(),
                mesa.getFechaModificacion()
        );
    }
}
```

---

## ¿Qué es la Inyección de Dependencias?

+++comparison-table
---
headers:
  - "Sin DI ❌"
  - { text: "Con DI (Spring) ✅", highlight: true }
rows:
  - ["new MesaRepository() — crea el objeto a mano", "Spring lo crea y lo inyecta solo"]
  - ["Acoplamiento fuerte entre clases", "Bajo acoplamiento"]
  - ["Difícil de testear (no puedes usar mocks)", "Fácil de testear con mocks"]
  - ["Tú gestionas el ciclo de vida", "Spring gestiona el singleton automáticamente"]
---
+++

---

## `PedidoService.java` — Reutilización de servicios

```java
@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final MesaService mesaService;      // Reutiliza servicios existentes
    private final MeseroService meseroService;  // (en vez de duplicar lógica)

    @Transactional
    public PedidoResponse save(PedidoRequest request) {
        // Busca y valida que la Mesa y el Mesero existen
        Mesa mesa = mesaService.findEntity(request.getMesaId());
        Mesero mesero = meseroService.findEntity(request.getMeseroId());

        Pedido pedido = new Pedido();
        pedido.setTotal(request.getTotal());
        pedido.setEstado(EstadoPedido.PENDIENTE); // ← Regla: siempre empieza PENDIENTE
        pedido.setMesa(mesa);
        pedido.setMesero(mesero);

        return toResponse(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponse cambiarEstado(Long id, EstadoPedido nuevoEstado) {
        Pedido pedido = findEntity(id);
        pedido.setEstado(nuevoEstado);
        return toResponse(pedidoRepository.save(pedido));
    }
}
```

+++admonition
---
type: note
title: "Reutilización de servicios"
---
`PedidoService` inyecta `MesaService` y `MeseroService` para reutilizar su lógica de búsqueda y mapeo. Esto evita duplicar código y mantiene un único punto de verdad para cada operación.
+++
