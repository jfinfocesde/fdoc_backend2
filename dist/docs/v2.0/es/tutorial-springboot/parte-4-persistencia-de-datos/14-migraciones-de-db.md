---
title: "Sesión 14: Migraciones de Base de Datos"
position: 4
author: "El Equipo de Spring Boot"
date: "2024-10-10"
---

# Sesión 14: Migraciones de Base de Datos con Flyway

A medida que tu aplicación evoluciona, el esquema de tu base de datos cambiará. Gestionar estos cambios manualmente es propenso a errores. Herramientas como Flyway o Liquibase te ayudan a versionar tu base de datos.

## Usando Flyway

1.  Añade la dependencia de Flyway a tu `pom.xml`.
2.  Crea archivos de migración SQL en `src/main/resources/db/migration`.
3.  Desactiva la generación de DDL de Hibernate: `spring.jpa.hibernate.ddl-auto=validate`.

### Ejemplo de Línea de Tiempo de Migraciones

Esta línea de tiempo ilustra cómo las migraciones versionan tu base de datos a lo largo del tiempo.

+++timeline
### V1__Create_customer_table.sql | 2024-10-10
Se crea el esquema inicial con la tabla `customer`.

---

### V2__Add_email_to_customer.sql | 2024-10-12
Se añade una nueva columna `email` a la tabla `customer` para almacenar los correos de los usuarios.

---

### V3__Add_orders_table.sql | 2024-10-15
Se introduce una nueva tabla `orders` para rastrear las compras de los clientes.
+++

