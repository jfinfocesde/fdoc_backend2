---
title: "Semana 8: Repositorios en Spring Boot"
description: "Guía completa y detallada sobre repositorios JPA en Spring Boot: qué son, cómo funcionan, métodos disponibles, consultas personalizadas y buenas prácticas."
position: 8
---




# 🗄️ Semana 8 — Repositorios en Spring Boot

## ¿Qué es un Repositorio?

Imagina que tu aplicación es una oficina y la base de datos es un archivo físico gigante
con cajones llenos de carpetas. Cada vez que necesitas buscar, guardar o borrar una
carpeta, no vas tú mismo al archivo — en cambio, le pides a un **archivista** que lo haga.

En Spring Boot, ese archivista se llama **Repositorio** (`Repository`).

Un repositorio es una interfaz de Java que actúa como **intermediaria entre tu código
y la base de datos**. Su trabajo es:

- **Buscar** registros (por id, por nombre, por cualquier campo)
- **Guardar** registros nuevos
- **Actualizar** registros existentes
- **Borrar** registros
- Ejecutar **consultas personalizadas**

Sin repositorios tendrías que escribir todo el SQL a mano y gestionar las conexiones a
la base de datos manualmente, lo cual es tedioso, propenso a errores y difícil de
mantener. Spring Boot hace todo eso por ti.

---

## La Jerarquía de Repositorios

Spring Data JPA ofrece varias interfaces que puedes usar como base para tu repositorio,
cada una con más funcionalidades que la anterior.

```bash
Repository<T, ID>                 ← Interfaz base vacía (casi no se usa directamente)
    └── CrudRepository<T, ID>     ← Operaciones CRUD básicas (save, findById, delete...)
            └── PagingAndSortingRepository<T, ID>  ← Añade paginación y ordenamiento
                    └── JpaRepository<T, ID>       ← La más completa, añade flush, bulk ops
```

### ¿Cuál usar?

En proyectos Spring Boot con JPA, casi siempre usarás **`JpaRepository`** porque:
- Incluye todo lo de las interfaces anteriores
- Agrega métodos específicos de JPA como `flush()`, `saveAndFlush()`, `deleteInBatch()`
- Es la opción estándar y más recomendada por la comunidad

---

## Creando tu Primer Repositorio

Supongamos que tenemos esta entidad:

```java
@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Producto extends BaseEntity {

    @Column(name = "nombre", nullable = false, length = 200)
    private String nombre;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "activo")
    private Boolean activo = true;
}
```

El repositorio correspondiente se crea así:

```java
// 1. Usamos @Repository para marcar este componente (buena práctica)
@Repository
// 2. Extendemos JpaRepository con dos parámetros de tipo:
//    - Producto: la entidad que maneja este repositorio
//    - Long:     el tipo del campo @Id en la entidad
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // De momento lo dejamos vacío.
    // JpaRepository ya nos da docenas de métodos listos.
}
```

> ⚠️ **Importante**: Un repositorio en Spring Boot es una **interfaz**, NO una clase.
> Spring genera la implementación concreta en tiempo de ejecución de forma automática.
> Tú nunca tienes que escribir el `implements`. Solo defines la interfaz.

---

## Métodos que JpaRepository ya te da GRATIS

Cuando extiendes `JpaRepository<Producto, Long>`, obtienes automáticamente todos estos
métodos sin tener que escribir ni una línea de código adicional:

### Guardar y Actualizar

```java
// Guarda una entidad nueva (INSERT) o actualiza una existente (UPDATE).
// Para diferenciar: si el objeto tiene id = null → INSERT; si tiene id → UPDATE
Producto save(Producto entity);

// Guarda y vacía la sesión de JPA inmediatamente (útil en operaciones batch)
Producto saveAndFlush(Producto entity);

// Guarda una lista de entidades en una sola operación
List<Producto> saveAll(Iterable<Producto> entities);
```

**Ejemplo de uso:**
```java
// Crear un producto nuevo
Producto nuevo = new Producto();
nuevo.setNombre("Laptop Gaming");
nuevo.setPrecio(2500.0);
nuevo.setStock(10);

Producto guardado = productoRepository.save(nuevo);
// guardado.getId() ya tiene el id asignado por la base de datos
System.out.println("ID asignado: " + guardado.getId());
```

---

### Buscar

```java
// Busca por id. Devuelve Optional para evitar NullPointerException
Optional<Producto> findById(Long id);

// Busca todos los registros. ¡Cuidado en tablas grandes!
List<Producto> findAll();

// Busca todos, ordenados por un campo
List<Producto> findAll(Sort sort);

// Busca todos en una lista de ids
List<Producto> findAllById(Iterable<Long> ids);

// ¿Existe un registro con ese id?
boolean existsById(Long id);

// Número total de registros en la tabla
long count();
```

**Ejemplo de uso:**
```java
// Forma 1: verificar si existe antes de usar
if (productoRepository.existsById(5L)) {
    Optional<Producto> optional = productoRepository.findById(5L);
    Producto p = optional.get();
    System.out.println(p.getNombre());
}

// Forma 2 (más idiomática con Optional):
Producto p = productoRepository.findById(5L)
        .orElseThrow(() -> new NoSuchElementException("Producto no encontrado con id: 5"));

// Traer todos ordenados por nombre de A a Z
List<Producto> ordenados = productoRepository.findAll(Sort.by("nombre").ascending());
```

---

### Eliminar

```java
// Elimina la entidad con ese id
void deleteById(Long id);

// Elimina el objeto que le pasas
void delete(Producto entity);

// Elimina todos los registros con esos ids
void deleteAllById(Iterable<Long> ids);

// Elimina absolutamente todo (¡úsalo con cuidado!)
void deleteAll();
```

**Ejemplo de uso:**
```java
// Borrar por id
productoRepository.deleteById(3L);

// Borrar un objeto que ya tenemos
Producto p = productoRepository.findById(3L).orElseThrow(...);
productoRepository.delete(p);
```

---

## Paginación — Manejar Grandes Cantidades de Datos

¿Qué pasa si tienes 100.000 productos? No puedes traer todos con `findAll()` de una vez,
eso consumiría demasiada memoria y sería muy lento. La solución es la **paginación**.

```java
// Crea una petición de página: página 0 (la primera), 10 elementos por página
Pageable pageable = PageRequest.of(0, 10);

// Devuelve un objeto Page con los datos de la primera página
Page<Producto> pagina = productoRepository.findAll(pageable);

// Page tiene metadata muy útil:
System.out.println("Productos en esta página: " + pagina.getContent().size()); // 10
System.out.println("Total de páginas:         " + pagina.getTotalPages());     // 10000
System.out.println("Total de productos:       " + pagina.getTotalElements());  // 100000
System.out.println("¿Es la primera página?   " + pagina.isFirst());           // true
System.out.println("¿Hay más páginas?        " + pagina.hasNext());            // true
```

Paginación con ordenamiento:
```java
// Página 2 (0-indexed, es decir la tercera), 5 elementos, ordenados por precio descendente
Pageable paginaOrd = PageRequest.of(2, 5, Sort.by("precio").descending());
Page<Producto> resultados = productoRepository.findAll(paginaOrd);
```

---

## Consultas Derivadas — El Superpoder de Spring Data

Esta es la característica más impresionante de Spring Data JPA. Puedes crear consultas
SQL simplemente **nombrando el método de una forma especial**. Spring lee el nombre,
lo interpreta y genera el SQL automáticamente.

### Regla general del nombre

```
findBy + [campo] + [condición]
```

Por ejemplo:
```java
findByNombre(String nombre)
// Spring genera: SELECT * FROM productos WHERE nombre = ?
```

### Tabla completa de palabras clave

| Palabra clave | Ejemplo de método | SQL generado |
|:---|:---|:---|
| `findBy...` | `findByActivo(Boolean activo)` | `WHERE activo = ?` |
| `existsBy...` | `existsByNombre(String nombre)` | `SELECT COUNT(*) > 0 WHERE nombre = ?` |
| `countBy...` | `countByActivo(Boolean activo)` | `SELECT COUNT(*) WHERE activo = ?` |
| `deleteBy...` | `deleteByActivo(Boolean activo)` | `DELETE WHERE activo = ?` |
| `And` | `findByNombreAndActivo(String n, Boolean a)` | `WHERE nombre = ? AND activo = ?` |
| `Or` | `findByNombreOrPrecio(String n, Double p)` | `WHERE nombre = ? OR precio = ?` |
| `Between` | `findByPrecioBetween(Double min, Double max)` | `WHERE precio BETWEEN ? AND ?` |
| `LessThan` | `findByPrecioLessThan(Double precio)` | `WHERE precio < ?` |
| `LessThanEqual` | `findByPrecioLessThanEqual(Double precio)` | `WHERE precio <= ?` |
| `GreaterThan` | `findByPrecioGreaterThan(Double precio)` | `WHERE precio > ?` |
| `GreaterThanEqual` | `findByPrecioGreaterThanEqual(Double precio)` | `WHERE precio >= ?` |
| `IsNull` | `findByPrecioIsNull()` | `WHERE precio IS NULL` |
| `IsNotNull` | `findByPrecioIsNotNull()` | `WHERE precio IS NOT NULL` |
| `Like` | `findByNombreLike(String patron)` | `WHERE nombre LIKE ?` |
| `NotLike` | `findByNombreNotLike(String patron)` | `WHERE nombre NOT LIKE ?` |
| `Containing` | `findByNombreContaining(String texto)` | `WHERE nombre LIKE '%texto%'` |
| `StartingWith` | `findByNombreStartingWith(String texto)` | `WHERE nombre LIKE 'texto%'` |
| `EndingWith` | `findByNombreEndingWith(String texto)` | `WHERE nombre LIKE '%texto'` |
| `IgnoreCase` | `findByNombreIgnoreCase(String nombre)` | `WHERE UPPER(nombre) = UPPER(?)` |
| `ContainingIgnoreCase` | `findByNombreContainingIgnoreCase(String texto)` | `WHERE nombre ILIKE '%texto%'` |
| `In` | `findByStockIn(List<Integer> stocks)` | `WHERE stock IN (?, ?, ?)` |
| `NotIn` | `findByStockNotIn(List<Integer> stocks)` | `WHERE stock NOT IN (?, ?, ?)` |
| `True` | `findByActivoTrue()` | `WHERE activo = true` |
| `False` | `findByActivoFalse()` | `WHERE activo = false` |
| `OrderBy...Asc` | `findByActivoTrueOrderByNombreAsc()` | `WHERE activo = true ORDER BY nombre ASC` |
| `OrderBy...Desc` | `findByActivoTrueOrderByPrecioDesc()` | `WHERE activo = true ORDER BY precio DESC` |

### Ejemplo completo de un repositorio con consultas derivadas

```java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // ── Consultas simples ────────────────────────────────────────────────────
    List<Producto> findByActivoTrue();
    Optional<Producto> findByNombre(String nombre);
    Optional<Producto> findByNombreIgnoreCase(String nombre);
    List<Producto> findByNombreContainingIgnoreCase(String texto);

    // ── Consultas numéricas ──────────────────────────────────────────────────
    List<Producto> findByPrecioLessThan(Double precio);
    List<Producto> findByPrecioBetween(Double minimo, Double maximo);
    List<Producto> findByStockGreaterThan(Integer cantidad);

    // ── Consultas combinadas ──────────────────────────────────────────────────
    List<Producto> findByActivoTrueAndPrecioBetweenOrderByPrecioAsc(Double minimo, Double maximo);

    // ── Consultas de existencia y conteo ─────────────────────────────────────
    boolean existsByNombreIgnoreCase(String nombre);
    long countByActivoTrue();

    // ── Consultas con paginación ─────────────────────────────────────────────
    Page<Producto> findByActivoTrue(Pageable pageable);
    Page<Producto> findByNombreContainingIgnoreCase(String texto, Pageable pageable);
}
```

---

## Consultas Personalizadas con `@Query`

Las consultas derivadas son muy poderosas, pero a veces necesitas escribir una consulta
más compleja que no se puede expresar solo con el nombre del método. Para eso existe
la anotación `@Query`.

Con `@Query` puedes escribir:
1. **JPQL** (Java Persistence Query Language): Similar a SQL pero usando los nombres de
   las **clases y atributos Java**, no los nombres de tablas y columnas.
2. **SQL Nativo**: SQL estándar dirigido directamente a la base de datos.

### JPQL — Recomendado

```java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // ... (Métodos derivados anteriores omitidos por brevedad en la explicación, 
    // pero siguen estando en la misma interfaz) ...

    // ── Consultas personalizadas con JPQL ────────────────────────────────────

    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))")
    List<Producto> buscarPorTexto(@Param("texto") String texto);

    @Query("SELECT p FROM Producto p WHERE p.activo = true AND p.precio BETWEEN :min AND :max")
    List<Producto> findActivosEnRango(@Param("min") Double minimo, @Param("max") Double maximo);

    @Query("SELECT p FROM Producto p JOIN p.categoria c WHERE c.nombre = :nombreCategoria")
    List<Producto> findByCategoriaNameJpql(@Param("nombreCategoria") String nombre);

    @Query("SELECT p FROM Producto p WHERE p.activo = true AND p.precio < :precio")
    Page<Producto> findActivosBaratos(@Param("precio") Double precio, Pageable pageable);
}
```

### SQL Nativo — Para casos especiales

```java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // ... (Métodos anteriores) ...

    // nativeQuery = true → Spring no traduce, envía el SQL tal cual a PostgreSQL
    @Query(value = "SELECT * FROM productos WHERE nombre ILIKE '%' || :texto || '%'",
           nativeQuery = true)
    List<Producto> buscarNativo(@Param("texto") String texto);

    // SQL nativo con paginación requiere declarar también el countQuery
    @Query(
        value = "SELECT * FROM productos WHERE activo = true",
        countQuery = "SELECT COUNT(*) FROM productos WHERE activo = true",
        nativeQuery = true
    )
    Page<Producto> findActivosNativo(Pageable pageable);
}
```

> 💡 **¿Cuándo usar SQL nativo?** Solo cuando JPQL no puede expresar lo que necesitas,
> por ejemplo, para usar funciones específicas de PostgreSQL (`ILIKE`, `generate_series`,
> funciones de ventana como `ROW_NUMBER()`, etc.).

---

## Operaciones de Modificación con `@Modifying`

Por defecto, todas las consultas `@Query` son de **solo lectura** (SELECT).
Si quieres ejecutar un `UPDATE` o `DELETE` directamente desde el repositorio,
debes agregar `@Modifying`.

```java
### Métodos de Modificación Masiva

```java
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // ... (Métodos anteriores) ...

    @Modifying
    @Transactional
    @Query("UPDATE Producto p SET p.activo = false WHERE p.id = :id")
    int desactivarProducto(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("UPDATE Producto p SET p.precio = p.precio * :factor WHERE p.categoria.id = :categoriaId")
    int actualizarPreciosPorCategoria(@Param("categoriaId") Long id, @Param("factor") Double factor);

    @Modifying
    @Transactional
    @Query("DELETE FROM Producto p WHERE p.activo = false")
    int eliminarProductosInactivos();
}
```

> ⚠️ **Por qué `@Transactional` junto a `@Modifying`?**
> Las operaciones de escritura (`UPDATE`, `DELETE`) siempre necesitan ejecutarse dentro
> de una transacción. Si el método del servicio que llama al repositorio ya tiene
> `@Transactional`, puede que no sea necesario repetirlo aquí. Pero incluirlo como
> medida de seguridad es una buena práctica.

---

## Cómo se Usa el Repositorio — Inyección en el Servicio

El repositorio nunca se usa directamente en el controlador. Se inyecta en el **servicio**:

```java
@Service
@RequiredArgsConstructor  // Lombok genera el constructor con el campo final
public class ProductoService {

    // Spring detecta que ProductoService necesita un ProductoRepository
    // y lo inyecta automáticamente. Esto se llama Inyección de Dependencias.
    private final ProductoRepository productoRepository;

    // ── Métodos de lectura (SIN @Transactional, más eficientes) ──────────────

    public List<ProductoResponse> findAll() {
        return productoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductoResponse findById(Long id) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado: " + id));
        return toResponse(p);
    }

    public List<ProductoResponse> buscar(String texto) {
        return productoRepository.findByNombreContainingIgnoreCase(texto)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public Page<ProductoResponse> findAllPaginado(int pagina, int tamanio) {
        Pageable pageable = PageRequest.of(pagina, tamanio, Sort.by("nombre").ascending());
        return productoRepository.findAll(pageable)
                .map(this::toResponse); // Page tiene su propio map()
    }

    // ── Métodos de escritura (CON @Transactional) ─────────────────────────────

    @Transactional
    public ProductoResponse save(ProductoRequest request) {
        // Validar que no exista un producto con el mismo nombre
        if (productoRepository.existsByNombreIgnoreCase(request.getNombre())) {
            throw new IllegalArgumentException("Ya existe un producto con ese nombre");
        }
        Producto p = new Producto();
        p.setNombre(request.getNombre());
        p.setPrecio(request.getPrecio());
        p.setStock(request.getStock());
        return toResponse(productoRepository.save(p));
    }

    @Transactional
    public ProductoResponse update(Long id, ProductoRequest request) {
        Producto p = productoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado: " + id));
        p.setNombre(request.getNombre());
        p.setPrecio(request.getPrecio());
        p.setStock(request.getStock());
        return toResponse(productoRepository.save(p));
        // Al hacer save() sobre una entidad con id existente, JPA hace UPDATE, no INSERT
    }

    @Transactional
    public void delete(Long id) {
        // Verificamos que exista antes de borrar (para dar un error claro si no existe)
        if (!productoRepository.existsById(id)) {
            throw new NoSuchElementException("Producto no encontrado: " + id);
        }
        productoRepository.deleteById(id);
    }

    // ── Método interno de mapeo entidad → DTO ─────────────────────────────────

    private ProductoResponse toResponse(Producto p) {
        return new ProductoResponse(
                p.getId(),
                p.getNombre(),
                p.getPrecio(),
                p.getStock(),
                p.getActivo(),
                p.getFechaRegistro()
        );
    }
}
```

---

## El Ciclo de Vida Completo: ¿Qué pasa cuando llamas a `save()`?

Entender este ciclo es fundamental para evitar bugs:

```bash
Llamas a:  productoRepository.save(producto)
                        │
                        ▼
            ┌───────────────────────┐
            │  ¿producto.getId()    │
            │     es null?          │
            └──────────┬────────────┘
                       │
            ┌──────────┴──────────────┐
           SÍ (id = null)            NO (id tiene valor)
            │                         │
            ▼                         ▼
     JPA hace INSERT            JPA hace UPDATE
     y asigna el id             (actualiza todos
     automáticamente            los campos)
            │                         │
            └──────────┬──────────────┘
                       │
                       ▼
            Devuelve la entidad
            con todos los campos
            actualizados (incluyendo
            fechaRegistro si usas auditoría)
```

---

## Buenas Prácticas con Repositorios

### ✅ Siempre usa `Optional` correctamente

```java
// ❌ Malo: get() sin verificar puede lanzar NoSuchElementException
Producto p = repository.findById(id).get();

// ✅ Bueno: maneja el caso en que no existe
Producto p = repository.findById(id)
        .orElseThrow(() -> new NoSuchElementException("No encontrado: " + id));

// ✅ También válido: con valor por defecto
Producto p = repository.findById(id).orElse(null);

// ✅ Verificar existencia antes de actuar
boolean existe = repository.existsByNombreIgnoreCase(nombre);
```

### ✅ No expongas el repositorio en el controlador

```java
// ❌ Malo: el controlador accede al repo directamente. Viola la separación de capas.
@RestController
public class ProductoController {
    private final ProductoRepository repo; // ← MAL
}

// ✅ Bueno: el controlador solo conoce el servicio
@RestController
public class ProductoController {
    private final ProductoService service; // ← BIEN
}
```

### ✅ Prefiere `LAZY` sobre `EAGER` en relaciones

```java
// ❌ Puede causar N+1 queries y carga datos que no necesitas
@ManyToOne(fetch = FetchType.EAGER)
private Categoria categoria;

// ✅ Carga la relación solo cuando es necesaria
@ManyToOne(fetch = FetchType.LAZY)
private Categoria categoria;
```

### ✅ Named Queries vs `@Query` — ¿Cuándo usar cada una?

| Situación | Solución recomendada |
|:---|:---|
| Consulta simple (1-2 condiciones) | Consulta derivada (`findByNombreAndActivo(...)`) |
| Consulta moderada (JOIN, LIKE, ORDER BY) | `@Query` con JPQL |
| Función específica de PostgreSQL | `@Query(nativeQuery = true)` |
| UPDATE o DELETE masivo | `@Modifying + @Query` |

---

## Repositorios con Múltiples Entidades — Ejemplo Real

En un proyecto real tendrías muchos repositorios, uno por entidad:

```java
// Cada entidad tiene su propio repositorio
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNombreIgnoreCase(String nombre);
    boolean existsByNombreIgnoreCase(String nombre);
}

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Cliente> findByActivoTrue();
}

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByClienteId(Long clienteId);
    List<Pedido> findByEstado(EstadoPedido estado);
    List<Pedido> findByClienteIdOrderByFechaRegistroDesc(Long clienteId);

    @Query("SELECT p FROM Pedido p WHERE p.fechaRegistro BETWEEN :desde :hasta")
    List<Pedido> findEntreFechas(
            @Param("desde") LocalDateTime desde,
            @Param("hasta") LocalDateTime hasta);

    long countByEstado(EstadoPedido estado);
}
```

---

## Resumen Visual — Todo lo que sabe hacer un Repositorio

```bash
ProductoRepository
│
├── 📥 GUARDAR
│   ├── save(producto)               → INSERT o UPDATE
│   ├── saveAll(lista)               → Múltiples INSERT/UPDATE
│   └── saveAndFlush(producto)       → INSERT/UPDATE inmediato
│
├── 🔍 BUSCAR
│   ├── findById(id)                 → WHERE id = ?
│   ├── findAll()                    → SELECT * FROM ...
│   ├── findAll(Sort)                → SELECT ... ORDER BY ...
│   ├── findAll(Pageable)            → SELECT ... LIMIT ? OFFSET ?
│   ├── findByNombre(nombre)         → WHERE nombre = ?
│   ├── findByPrecioBetween(a,b)     → WHERE precio BETWEEN ? AND ?
│   └── [cualquier consulta derivada o @Query]
│
├── ✅ VERIFICAR
│   ├── existsById(id)               → ¿Existe por id?
│   ├── existsByNombre(nombre)       → ¿Existe por nombre?
│   └── count()                      → Total de registros
│
└── 🗑️ ELIMINAR
    ├── deleteById(id)               → DELETE WHERE id = ?
    ├── delete(producto)             → DELETE WHERE id = [id del objeto]
    └── deleteAll()                  → DELETE FROM ... (¡cuidado!)
```

---

## Glosario de Términos Clave

| Término | Definición |
|:---|:---|
| **Repositorio** | Interfaz que actúa como intermediario entre el código y la base de datos |
| **JpaRepository** | La interfaz más completa de Spring Data JPA, incluye CRUD + paginación + más |
| **Consulta derivada** | SQL generado automáticamente a partir del nombre del método |
| **JPQL** | Lenguaje de consultas de JPA que usa nombres de clases Java, no de tablas |
| **SQL Nativo** | SQL estándar directamente para la base de datos |
| **`@Query`** | Anotación para declarar consultas JPQL o SQL nativas en el repositorio |
| **`@Modifying`** | Necesaria para queries que modifican datos (UPDATE/DELETE) |
| **`Optional<T>`** | Contenedor que puede tener un valor o estar vacío. Evita `NullPointerException` |
| **Paginación** | Dividir grandes resultados en páginas manejables |
| **`Pageable`** | Objeto que describe qué página y cuántos elementos quieres |
| **`Page<T>`** | Resultado paginado que incluye los datos y metadatos (total, páginas, etc.) |
| **Inyección de Dependencias** | Spring crea y proporciona los objetos que una clase necesita |
| **`@Transactional`** | Envuelve el método en una transacción de BD. Si falla, hace rollback |
