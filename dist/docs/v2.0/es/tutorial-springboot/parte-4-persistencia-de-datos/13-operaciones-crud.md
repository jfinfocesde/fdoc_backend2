---
title: "Sesión 13: Operaciones CRUD"
position: 3
author: "El Equipo de Spring Boot"
date: "2024-10-07"
---

# Sesión 13: Realizando Operaciones CRUD

Una vez que tienes tu entidad y repositorio, puedes inyectar el repositorio en otros componentes (como un servicio o un controlador) para interactuar con la base de datos.

La interfaz `JpaRepository` ya proporciona métodos CRUD estándar:
- `save()`: Guarda o actualiza una entidad.
- `findById()`: Busca una entidad por su ID.
- `findAll()`: Devuelve todas las entidades.
- `deleteById()`: Elimina una entidad por su ID.

## Ejemplo de Uso en un Servicio

```java
@Service
public class CustomerService {

    private final CustomerRepository repository;

    @Autowired
    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer createCustomer(String firstName, String lastName) {
        Customer newCustomer = new Customer(firstName, lastName);
        return repository.save(newCustomer);
    }

    public Optional<Customer> getCustomer(Long id) {
        return repository.findById(id);
    }

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }
}
```