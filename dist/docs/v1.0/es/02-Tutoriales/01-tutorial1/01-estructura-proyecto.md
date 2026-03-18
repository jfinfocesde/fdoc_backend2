---
title: "1. Estructura del Proyecto"
position: 1
---

# Estructura del Proyecto

## ¿Por qué organizamos el código en paquetes?

Imagina una cocina de restaurante donde todo está mezclado: ingredientes, platos sucios, recetas, facturas. Sería un caos. En programación pasa lo mismo: si todo el código está junto, es difícil encontrar, entender y modificar cosas.

Los **paquetes** en Java son como las "secciones" o "cajones" de un proyecto. Cada paquete agrupa clases que tienen una responsabilidad similar.

---

## Estructura completa del proyecto

+++file-tree
---
highlight:
  - "src/main/java/com/example/demo_basic/DemoBasicApplication.java"
  - "src/main/resources/application.properties"
annotations:
  "pom.xml": "Configuración de Maven (dependencias)"
  "src/main/resources/application.properties": "Configuración de la app (BD, JPA)"
  "src/main/java/com/example/demo_basic/DemoBasicApplication.java": "Punto de entrada"
  "src/main/java/com/example/demo_basic/model/entity": "Entidades JPA (tablas)"
  "src/main/java/com/example/demo_basic/model/embeddable": "Objetos embebibles"
  "src/main/java/com/example/demo_basic/model/enums": "Enumeraciones (valores fijos)"
  "src/main/java/com/example/demo_basic/repository": "Acceso a la base de datos"
  "src/main/java/com/example/demo_basic/service": "Lógica de negocio"
  "src/main/java/com/example/demo_basic/dto": "Objetos de transferencia de datos"
  "src/main/java/com/example/demo_basic/controller": "Endpoints HTTP (API REST)"
---
demo_basic/
├── pom.xml
├── docs/
└── src/
    └── main/
        ├── resources/
        │   └── application.properties
        └── java/com/example/demo_basic/
            ├── DemoBasicApplication.java
            ├── model/
            │   ├── entity/
            │   │   ├── BaseEntity.java
            │   │   ├── Mesa.java
            │   │   ├── Mesero.java
            │   │   └── Pedido.java
            │   ├── embeddable/
            │   │   └── InformacionPersonal.java
            │   └── enums/
            │       ├── EstadoPedido.java
            │       └── UbicacionMesa.java
            ├── repository/
            │   ├── MesaRepository.java
            │   ├── MeseroRepository.java
            │   └── PedidoRepository.java
            ├── service/
            │   ├── MesaService.java
            │   ├── MeseroService.java
            │   └── PedidoService.java
            ├── dto/
            │   ├── request/
            │   │   ├── MesaRequest.java
            │   │   ├── MeseroRequest.java
            │   │   └── PedidoRequest.java
            │   └── response/
            │       ├── MesaResponse.java
            │       ├── MeseroResponse.java
            │       └── PedidoResponse.java
            └── controller/
                ├── MesaController.java
                ├── MeseroController.java
                └── PedidoController.java
+++

---

## Responsabilidad de cada capa

+++feature-list
---
items:
  - title: "model/entity — Las entidades"
    icon: "DatabaseIcon"
    content: |
      Son clases Java que representan una **tabla en la base de datos**. Cada objeto es una **fila** en esa tabla.

      Ejemplo: `Clase Mesa` → tabla `mesas`; `objeto mesa` → fila `{ id=1, numero_mesa=5, ubicacion='TERRAZA' }`
  - title: "repository — Los repositorios"
    icon: "SearchIcon"
    content: |
      Son **interfaces** que le dicen a Spring cómo buscar, guardar y borrar datos. Spring genera el SQL automáticamente.
  - title: "service — Los servicios"
    icon: "SettingsIcon"
    content: |
      Contienen la **lógica de negocio**: validaciones, transformaciones, reglas. Actúan como intermediarios entre el controller y el repository.
  - title: "dto — Los DTOs"
    icon: "ArrowRightLeftIcon"
    content: |
      Son clases "mensajero" que solo transportan datos entre el cliente y el servidor. No tienen lógica ni anotaciones JPA.
  - title: "controller — Los controladores"
    icon: "GlobeIcon"
    content: |
      Definen los **endpoints** de la API REST. Reciben peticiones HTTP, llaman al servicio y devuelven la respuesta.
---
+++

---

## El archivo `DemoBasicApplication.java`

```java
@SpringBootApplication    // Le dice a Spring que esta es la clase principal
@EnableJpaAuditing        // Activa el sistema de fechas automáticas (@CreatedDate, @LastModifiedDate)
public class DemoBasicApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoBasicApplication.class, args); // Arranca la aplicación
    }
}
```

+++admonition
---
type: info
title: "¿Qué hace @SpringBootApplication?"
---
Esta anotación detecta automáticamente todos los componentes del proyecto (controllers, services, repositories) sin que tengas que registrarlos manualmente. Equivale a tres anotaciones combinadas: `@Configuration`, `@EnableAutoConfiguration` y `@ComponentScan`.
+++

---

## El archivo `application.properties`

```properties
# Nombre de la aplicación
spring.application.name=demo_basic

# Conexión a PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/restaurante_db
spring.datasource.username=postgres
spring.datasource.password=postgres

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update   # Crea/actualiza tablas automáticamente
spring.jpa.show-sql=true               # Muestra el SQL generado en consola
spring.jpa.properties.hibernate.format_sql=true  # SQL legible con sangría
```

+++admonition
---
type: warning
title: "ddl-auto=update en producción"
---
En producción se usa `ddl-auto=none` y se gestionan los cambios con herramientas como **Flyway** o **Liquibase** para tener control total sobre el esquema de la base de datos. El valor `update` es solo para desarrollo.
+++
