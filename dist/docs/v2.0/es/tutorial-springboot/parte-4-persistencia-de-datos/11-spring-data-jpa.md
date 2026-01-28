---
title: "Sesión 11: Introducción a Spring Data JPA"
position: 1
author: "El Equipo de Spring Boot"
date: "2024-10-01"
---

# Sesión 11: Introducción a Spring Data JPA

Spring Data JPA tiene como objetivo reducir significativamente la cantidad de código repetitivo necesario para implementar la capa de acceso a datos.

## Configuración

1.  Añade `spring-boot-starter-data-jpa` a tu `pom.xml`.
2.  Añade un driver de base de datos, como H2 (para desarrollo) o PostgreSQL.
    ```xml
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```
3.  Configura la conexión a la base de datos en `application.properties`.

    ```properties
    spring.datasource.url=jdbc:h2:mem:testdb
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=password
    spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
    ```
    Para H2 en memoria, Spring Boot puede autoconfigurar esto por ti.