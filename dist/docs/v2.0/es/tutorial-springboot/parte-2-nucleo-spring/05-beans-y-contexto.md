---
title: "Sesión 5: Spring Beans y ApplicationContext"
position: 2
author: "El Equipo de Spring Boot"
date: "2024-09-13"
---

# Sesión 5: Spring Beans y el ApplicationContext

## ¿Qué es un Spring Bean?

En Spring, los objetos que forman la columna vertebral de tu aplicación y son gestionados por el contenedor de Spring se conocen como "beans".

Un bean es simplemente una instancia de un objeto que es creada, ensamblada y gestionada por el contenedor de Spring IoC. Estos beans, y las dependencias entre ellos, se reflejan en los metadatos de configuración que utiliza un contenedor.

## El ApplicationContext

El `ApplicationContext` es la interfaz central que proporciona la configuración de la aplicación. Es el contenedor de Spring que contiene y gestiona todos los beans. Cuando tu aplicación Spring Boot arranca, crea una instancia de `ApplicationContext`. Puedes pensar en él como un registro de todos los componentes de tu aplicación.

## Anotaciones de Estereotipo

En lugar de definir beans manualmente en XML, Spring Boot utiliza el escaneo del classpath para encontrar clases anotadas con "anotaciones de estereotipo" especiales y registrarlas como beans en el `ApplicationContext`.

+++grid
---
columns: 2
---
### `@Component`
Este es un estereotipo genérico para cualquier componente gestionado por Spring. Es la base para otras anotaciones más específicas.

---
### `@Service`
Indica que una clase anotada es un "Servicio", típicamente utilizado en la capa de servicio para la lógica de negocio.

---
### `@Repository`
Indica que una clase anotada es un "Repositorio", típicamente utilizado en la capa de persistencia para el acceso a datos. También habilita la función de traducción de excepciones de Spring.

---
### `@Controller` / `@RestController`
Estas anotaciones marcan una clase como un controlador web, utilizado en la capa de presentación para manejar las peticiones HTTP entrantes.
+++

