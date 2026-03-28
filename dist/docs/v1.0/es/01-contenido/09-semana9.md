---
title: "Semana 9: Servicios en Spring Boot"
description: "Guía detallada sobre la creación de servicios, inyección de dependencias con @Autowired y el manejo de lógica de negocio y errores."
position: 9
---

# 🛠️ Semana 9 — Servicios en Spring Boot

En el desarrollo con Spring Boot, los **Servicios** son las piezas de software encargadas de procesar la información y ejecutar las reglas que definen cómo funciona nuestra aplicación. A continuación, detallamos los tres pilares fundamentales para construirlos correctamente.

---

## 1. La Anotación `@Service`

Para que una clase de Java sea reconocida como un "Servicio" por el ecosistema de Spring, debemos marcarla con la anotación **`@Service`**.

### ¿Qué hace realmente `@Service`?
*   **Registro Automático**: Al marcar una clase con `@Service`, le indicamos a Spring que debe crear una instancia única (un *Bean*) de esa clase al iniciar la aplicación.
*   **Component Scanning**: Spring "escanea" nuestro proyecto buscando estas anotaciones para organizar todas las piezas del rompecabezas.
*   **Significado Semántico**: Aunque técnicamente funciona igual que `@Component`, usar `@Service` le dice a otros desarrolladores (y a herramientas de monitoreo) que esta clase contiene la **Lógica de Negocio**.

```java
@Service
public class MiServicio {
    // Spring gestionará esta clase automáticamente
}
```

---

## 2. Inyección de Dependencias con `@Autowired`

Un servicio no suele trabajar solo; generalmente necesita comunicarse con un Repositorio para guardar o buscar datos. Para "conectar" estas piezas sin crear objetos manualmente, usamos **`@Autowired`**.

### ¿Cómo funciona?
*   **Inyección de Campo**: Es la forma más directa. Colocas la anotación justo encima de la variable que necesitas.
*   **Resolución**: Spring busca en su contenedor una clase que coincida (por ejemplo, un Repositorio) y la "inyecta" (la asigna) automáticamente.
*   **Desacoplamiento**: Tú no necesitas saber *cómo* se crea el Repositorio, solo pides que te lo entreguen listo para usar.

```java
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository; // Spring lo conecta por ti

    public void guardar(Usuario u) {
        usuarioRepository.save(u);
    }
}
```

---

## 3. Lógica de Negocio y Manejo de Errores

Este es el propósito principal del Servicio. Aquí es donde decides **qué se puede hacer y qué no** en tu aplicación.

### Lógica de Negocio
Se refiere a las reglas específicas de tu problema. Por ejemplo:
*   "No se puede crear un usuario si el correo ya existe".
*   "Un producto no puede tener precio negativo".
*   "Solo los usuarios VIP pueden aplicar este descuento".

### Manejo de Errores
El servicio debe ser capaz de detectar situaciones inválidas y detener el proceso antes de que afecte a la base de datos. La forma estándar de hacerlo en Java/Spring es lanzando **Excepciones**.

#### Ejemplo Detallado:
Imagina un servicio para registrar suscripciones:

```java
@Service
public class SuscripcionService {

    @Autowired
    private SuscripcionRepository repository;

    public void registrarSuscripcion(String email, double monto) {
        
        // ── 1. Lógica de Negocio (Validaciones) ───────────────────────────────
        
        // Regla A: El usuario no puede estar ya suscrito
        if (repository.existsByEmail(email)) {
            // Manejo de Error: Lanzamos una excepción para detener todo
            throw new RuntimeException("Error: El correo ya tiene una suscripción activa.");
        }

        // Regla B: El pago mínimo es de $10
        if (monto < 10) {
            throw new RuntimeException("Error: El monto mínimo para suscribirse es 10.");
        }

        // ── 2. Acción Final (Si todo es correcto) ─────────────────────────────
        
        Suscripcion s = new Suscripcion();
        s.setEmail(email);
        s.setPrecio(monto);
        
        repository.save(s);
        System.out.println("Suscripción creada exitosamente para: " + email);
    }
}
```

### ¿Por qué lanzar excepciones?
Al lanzar un `RuntimeException` (o una excepción personalizada), el método se detiene inmediatamente. Esto evita que lleguen datos corruptos a la base de datos y permite que la capa superior (el Controlador) sepa que algo salió mal y pueda informar al usuario final.
