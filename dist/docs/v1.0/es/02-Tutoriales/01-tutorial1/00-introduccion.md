---
title: "Introducción: Spring Boot y JPA"
position: 0
---

# Introducción: ¿Qué es Spring Boot y JPA?

## ¿Qué vamos a construir?

Este proyecto es el **backend** de un sistema para gestionar pedidos en un restaurante.
Un backend es la parte del software que se ejecuta en el servidor y que recibe peticiones
HTTP, procesa la lógica de negocio, guarda y recupera datos, y devuelve respuestas JSON.

### 📦 Código fuente en GitHub

```bash
git clone https://github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica.git
```

🔗 **[Ver repositorio en GitHub](https://github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica)**

---

## ¿Qué es Spring Boot?

**Spring Boot** es un framework de Java que facilita la creación de aplicaciones web y APIs REST.
Spring Boot resuelve la complejidad de configuración con el principio de **"convención sobre configuración"**:
tiene valores predeterminados inteligentes para que puedas enfocarte en escribir tu lógica de negocio.

+++feature-list
---
items:
  - title: "Servidor web integrado"
    icon: "ServerIcon"
    content: |
      Incluye Apache Tomcat integrado. No necesitas instalarlo ni configurarlo por separado.
  - title: "Autoconfiguración"
    icon: "SettingsIcon"
    content: |
      Detecta automáticamente las clases que escribes (controllers, services, repositories) y las conecta entre sí.
  - title: "Gestión de base de datos"
    icon: "DatabaseIcon"
    content: |
      Gestiona las conexiones a la base de datos y traduce consultas Java a SQL automáticamente.
  - title: "Conversión automática JSON"
    icon: "ArrowRightLeftIcon"
    content: |
      Convierte automáticamente los objetos Java a JSON y viceversa usando la librería Jackson.
---
+++

---

## ¿Qué es JPA e Hibernate?

### JPA (Java Persistence API)
**JPA** es una especificación (un conjunto de reglas) de Java que define **cómo mapear objetos Java a tablas de una base de datos relacional**.

Sin JPA tendrías que escribir SQL manualmente:
```sql
INSERT INTO mesas (numero_mesa, ubicacion) VALUES (5, 'TERRAZA');
```

Con JPA simplemente haces:
```java
mesaRepository.save(mesa); // Spring genera el SQL por ti
```

### Hibernate
**Hibernate** es la implementación más popular de JPA. Spring Boot lo usa internamente.
Cuando hablamos de JPA, Hibernate es quien realmente ejecuta el trabajo tras bastidores.
Tú escribes código Java limpio y Hibernate genera el SQL correspondiente.

### ¿Por qué usar JPA en vez de SQL directo?
- **Menos código**: No escribes SQL repetitivo para operaciones CRUD básicas.
- **Portabilidad**: El mismo código funciona con PostgreSQL, MySQL, Oracle, etc.
- **Seguridad**: Evita inyecciones SQL automáticamente con los parámetros preparados.
- **Mantenibilidad**: Los cambios en el modelo Java se reflejan en la BD automáticamente.

---

## ¿Qué es PostgreSQL?

**PostgreSQL** es el sistema de base de datos relacional que usamos en este proyecto.
Los datos del restaurante (mesas, meseros, pedidos) se guardan en tablas dentro de PostgreSQL.

+++admonition
---
type: note
title: "Requisitos previos"
---
Antes de ejecutar el proyecto asegúrate de tener:
- PostgreSQL instalado y corriendo en `localhost:5432`
- Crear la base de datos manualmente ejecutando en psql:

```sql
CREATE DATABASE restaurante_db;
```
+++

---

## Tecnologías del proyecto

+++comparison-table
---
headers:
  - "Tecnología"
  - { text: "Versión / Estado", highlight: true }
  - "Rol en el proyecto"
rows:
  - ["Java", "21", "Lenguaje de programación"]
  - ["Spring Boot", "4.x", "Framework de la aplicación"]
  - ["Spring Data JPA", "incluido", "Abstracción de la base de datos"]
  - ["Hibernate", "incluido", "Implementación de JPA"]
  - ["PostgreSQL", "cualquiera", "Base de datos relacional"]
  - ["Lombok", "incluido", "Reduce código repetitivo"]
---
+++

---

## ¿Qué es Lombok?

**Lombok** es una librería que genera código Java automáticamente en tiempo de compilación.
Evita que tengas que escribir getters, setters, constructores y más.

### Código SIN Lombok
```java
// Sin Lombok tendrías que escribir todo esto manualmente:
public String getNombres() { return nombres; }
public void setNombres(String nombres) { this.nombres = nombres; }
public String getApellidos() { return apellidos; }
public void setApellidos(String apellidos) { this.apellidos = apellidos; }
public InformacionPersonal() { }
public InformacionPersonal(String nombres, String apellidos) {
    this.nombres = nombres;
    this.apellidos = apellidos;
}
```

### Código CON Lombok
```java
// Con Lombok solo necesitas estas anotaciones en la clase:
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InformacionPersonal {
    private String nombres;
    private String apellidos;
}
// Lombok genera todo lo anterior automáticamente al compilar
```

| Anotación | Qué genera |
|-----------|-----------|
| `@Getter` | Métodos `getXxx()` para todos los campos |
| `@Setter` | Métodos `setXxx()` para todos los campos |
| `@NoArgsConstructor` | Constructor sin parámetros |
| `@AllArgsConstructor` | Constructor con todos los parámetros |
| `@RequiredArgsConstructor` | Constructor para campos `final` (usado en servicios) |

---

## Flujo general de la aplicación

+++mermaid
graph TD
    A["🖥️ Cliente (Postman / Frontend)"] -->|"HTTP Request (JSON)"| B["🌐 Controller"]
    B -->|"Llama al servicio"| C["⚙️ Service"]
    C -->|"Consulta / Guarda"| D["🗄️ Repository"]
    D -->|"SQL"| E[("📦 Base de datos\nPostgreSQL")]

    B:::layer
    C:::layer
    D:::layer

    classDef layer fill:#1e3a5f,stroke:#4a9eff,color:#fff,rx:6
+++

+++admonition
---
type: info
title: "Próximo paso"
---
En el archivo `10-flujo-completo.md` verás este flujo en detalle con un ejemplo real,
siguiendo paso a paso la creación de un pedido desde Postman hasta la base de datos.
+++
