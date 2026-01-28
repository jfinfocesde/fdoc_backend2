---
title: "Sesión 12: Entidades y Repositorios"
position: 2
author: "El Equipo de Spring Boot"
date: "2024-10-04"
---

# Sesión 12: Creando Entidades y Repositorios

## Entidades JPA

Una entidad es una clase Java que se mapea a una tabla en la base de datos. Se anota con `@Entity`.

```java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Customer {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;

    // Constructores, Getters y Setters...
}
```

## Repositorios Spring Data

Un repositorio es una interfaz que proporciona métodos para operaciones CRUD. Simplemente extiende una de las interfaces de Repositorio de Spring Data, como `JpaRepository`.

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Spring Data crea automáticamente la implementación de este método
    List<Customer> findByLastName(String lastName);
}
```

Spring Data JPA analizará el nombre del método `findByLastName` y creará automáticamente una consulta para buscar clientes por su apellido. ¡No necesitas escribir la implementación!