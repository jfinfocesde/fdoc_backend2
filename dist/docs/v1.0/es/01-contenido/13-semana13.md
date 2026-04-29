---
title: "Semana 13: DTOs (Data Transfer Objects) en Spring Boot"
description: "Tutorial detallado sobre el uso de DTOs para separar la capa de persistencia de la capa de presentación, mejorando la seguridad y flexibilidad de la API."
position: 13
---

# 📦 DTOs: Objetos de Transferencia de Datos

¡Bienvenidos a la **Semana 13**! En el desarrollo de APIs profesionales, casi nunca devolvemos las **Entidades** de la base de datos directamente al cliente. En su lugar, usamos **DTOs**.

---

## 1. ¿Qué es un DTO?

**DTO** significa *Data Transfer Object* (Objeto de Transferencia de Datos). Es una clase simple (POJO) que se utiliza exclusivamente para transportar datos entre el cliente (Frontend/Postman) y el servidor (Backend).

### La Analogía del Paquete
Imagina que una **Entidad** es una persona con toda su información privada (ID, contraseña, dirección, saldo bancario). Un **DTO** es como un carnet de identidad: solo muestra los datos que son necesarios para que otros lo identifiquen, ocultando lo privado.

---

## 2. ¿Por qué usar DTOs? (Los 4 Pilares)

1.  **Seguridad**: Evitas exponer campos sensibles como contraseñas, tokens o IDs internos.
2.  **Rendimiento**: Envías solo los datos que el cliente necesita. Si tu entidad tiene 50 campos pero el cliente solo necesita 3, el DTO ahorra ancho de banda.
3.  **Flexibilidad**: Puedes cambiar la estructura de tu base de datos sin romper el contrato con el Frontend.
4.  **Desacoplamiento**: Evitas errores de recursividad (bucles infinitos) cuando tienes relaciones `@OneToMany` o `@ManyToMany`.

---

## 3. Ejemplo Práctico: De Entidad a DTO

Supongamos que tenemos una entidad `Usuario`.

### La Entidad (Base de Datos)
```java
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String email;
    private String password; // ⚠️ ¡NUNCA enviar esto al cliente!
    private LocalDateTime fechaRegistro;
}
```

### El DTO de Respuesta (Lo que ve el cliente)
```java
public class UsuarioResponseDTO {
    private String nombre;
    private String email;
    // El ID y el Password NO están aquí.
}
```

---

## 4. Tipos de DTOs

En un proyecto real, solemos tener dos tipos principales:

1.  **RequestDTO**: Para los datos que **recibimos** (ej: Crear un usuario).
2.  **ResponseDTO**: Para los datos que **enviamos** (ej: Listar usuarios).

---

## 5. ¿Cómo transformar (mapear) los datos?

Existen dos formas de convertir una Entidad en un DTO:

### A. Mapeo Manual (Recomendado para aprender)
Se hace dentro del **Service**.

```java
public UsuarioResponseDTO convertirADTO(Usuario usuario) {
    UsuarioResponseDTO dto = new UsuarioResponseDTO();
    dto.setNombre(usuario.getNombre());
    dto.setEmail(usuario.getEmail());
    return dto;
}
```

### B. Usando Librerías (ModelMapper o MapStruct)
Son herramientas que hacen el trabajo sucio por ti automáticamente. (Se verá en niveles avanzados).

---

## 6. Arquitectura: ¿Dónde van los DTOs?

El flujo de información en Spring Boot con DTOs se ve así:

1.  **Cliente** envía un **RequestDTO** al **Controller**.
2.  **Controller** pasa el DTO al **Service**.
3.  **Service** convierte el DTO en **Entidad** y lo guarda en el **Repository**.
4.  **Repository** devuelve la **Entidad** al **Service**.
5.  **Service** convierte la **Entidad** en un **ResponseDTO**.
6.  **Controller** devuelve el **ResponseDTO** al **Cliente**.

---

## 7. Ejemplo de un Servicio usando DTOs

```java
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioResponseDTO crearUsuario(UsuarioRequestDTO request) {
        // 1. Convertir DTO a Entidad
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setPassword(request.getPassword()); // Aquí sí la usamos para guardar
        
        // 2. Guardar en BD
        Usuario guardado = usuarioRepository.save(usuario);
        
        // 3. Convertir Entidad guardada a ResponseDTO
        UsuarioResponseDTO response = new UsuarioResponseDTO();
        response.setNombre(guardado.getNombre());
        response.setEmail(guardado.getEmail());
        
        return response;
    }
}
```

---

## 8. Resumen de Ventajas para Estudiantes

| Característica | Con Entidades Directas | Con DTOs |
| :--- | :--- | :--- |
| **Seguridad** | Riesgo de filtrar passwords. | Totalmente controlado. |
| **JSON** | Puede ser muy pesado y desordenado. | Limpio y específico. |
| **Relaciones** | Peligro de bucles infinitos. | Relaciones simplificadas. |
| **Mantenimiento** | Difícil de cambiar la BD. | Fácil, el DTO es un escudo. |

---

## 9. Desafío de la Semana

1.  Toma una de tus entidades del proyecto actual (ej: `Producto` o `Mascota`).
2.  Crea una clase llamada `ProductoDTO` que solo contenga el `nombre` y el `precio`.
3.  Modifica el método `listarTodos` de tu servicio para que devuelva una lista de `ProductoDTO` en lugar de la entidad original.
4.  ¡Observa en Postman cómo el JSON ahora es mucho más limpio!

> **Pro-Tip**: En Java 17+, puedes usar `record` para crear DTOs de forma súper rápida:
> `public record UsuarioDTO(String nombre, String email) { }`
